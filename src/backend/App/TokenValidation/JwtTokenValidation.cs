using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace App.TokenValidation
{
    [AttributeUsage(AttributeTargets.Class)]
    public class JwtTokenValidation: Attribute, Microsoft.AspNetCore.Mvc.Filters.IAuthorizationFilter
    {
        public JwtTokenValidation()
        {
        }

        public async Task<Dictionary<string, X509Certificate2>> FetchGoogleCertificates()
        {
            using (var http = new HttpClient())
            {
                var response = await http.GetAsync("https://www.googleapis.com/oauth2/v1/certs");

                var dictionary = await response.Content.ReadAsAsync<Dictionary<string, string>>();
                return dictionary.ToDictionary(x => x.Key, x => new X509Certificate2(Encoding.UTF8.GetBytes(x.Value)));
            }
        }

        private string CLIENT_ID = "326711242697-pj0ob8eu4autok3fs93vnnt0juace2d2.apps.googleusercontent.com";
        public async Task<bool> ValidateToken(string idToken)
        {
            try
            {
                var certificates = await FetchGoogleCertificates();

                TokenValidationParameters tvp = new TokenValidationParameters()
                {
                    ValidateActor = false, // check if profile ID is valid

                    ValidateAudience = true, // check the client ID, changes depending on remote or local
                    ValidAudience = CLIENT_ID,

                    ValidateIssuer = true, // check token came from Google
                    ValidIssuers = new List<string> { "accounts.google.com", "https://accounts.google.com" },

                    ValidateIssuerSigningKey = true,
                    RequireSignedTokens = true,
                    IssuerSigningKeys = certificates.Values.Select(x => new X509SecurityKey(x)),
                    IssuerSigningKeyResolver = (token, securityToken, kid, validationParameters) =>
                    {
                        return certificates
                        .Where(x => x.Key.ToUpper() == kid.ToUpper())
                        .Select(x => new X509SecurityKey(x.Value));
                    }, // Check though google certificates if the signin key is valid
                    ValidateLifetime = true,
                    RequireExpirationTime = true,
                    ClockSkew = TimeSpan.FromHours(13)
                };

                JwtSecurityTokenHandler jsth = new JwtSecurityTokenHandler();
                SecurityToken validatedToken;
                ClaimsPrincipal cp = jsth.ValidateToken(idToken, tvp, out validatedToken);
                return true;

            }
            catch (Exception e)
            {
                Console.WriteLine("failed authentication");
                return false;
            }
        }

        public void OnAuthorization(AuthorizationFilterContext filterContext)
        {
            if (filterContext != null)
            {
                Microsoft.Extensions.Primitives.StringValues authTokens;
                filterContext.HttpContext.Request.Headers.TryGetValue("AuthorizationToken", out authTokens);
                string _token = authTokens;
                if (_token != null)
                {
                    var authToken = _token;
                    if (authToken != null)
                    {
                        var task = Task.Run(async () => await ValidateToken(authToken));
                        if (task.Result)
                        {
                            //filterContext.HttpContext.Response.Headers.Add("authToken", authToken);
                            filterContext.HttpContext.Response.Headers.Add("AuthStatus", "Authorized");

                            filterContext.HttpContext.Response.Headers.Add("storeAccessiblity", "Authorized");

                            return;
                        }
                        else
                        {
                            //filterContext.HttpContext.Response.Headers.Add("authToken", "authToken");
                            filterContext.HttpContext.Response.Headers.Add("AuthStatus", "NotAuthorized");
                            filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                            filterContext.HttpContext.Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "Not Authorized";
                            filterContext.Result = new Microsoft.AspNetCore.Mvc.JsonResult("NotAuthorized")
                            {
                                Value = new
                                {
                                    Status = "Error",
                                    Message = "Invalid Token"
                                },
                            };
                        }

                    }

                }
                else
                {
                    filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.ExpectationFailed;
                    filterContext.HttpContext.Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "Please Provide authToken";
                    filterContext.Result = new Microsoft.AspNetCore.Mvc.JsonResult("Please Provide authToken")
                    {
                        Value = new
                        {
                            Status = "Error",
                            Message = "Please Provide authToken"
                        },
                    };
                }
            }
        }
    }
}

