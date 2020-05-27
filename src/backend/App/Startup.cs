using App.TalkCreation.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using App.TalkCreation.Data;
using App.TalkCreation.Data.DataPost;
using App.TalkCreation.Data.DataFetch;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using App.HeathChecks;
using System.Linq;
using Microsoft.AspNetCore.Http;
using App.TalkAnswer.Hubs;
using App.TalkAnswer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using App.TokenValidation;
using System;
using Microsoft.ApplicationInsights.AspNetCore.Extensions;

namespace App
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public async Task<Dictionary<string, X509Certificate2>> FetchGoogleCertificates()
        {
            using (var http = new HttpClient())
            {
                var response = await http.GetAsync("https://www.googleapis.com/oauth2/v1/certs");

                var dictionary = await response.Content.ReadAsAsync<Dictionary<string, string>>();
                return dictionary.ToDictionary(x => x.Key, x => new X509Certificate2(Encoding.UTF8.GetBytes(x.Value)));
            }
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<QuizzServiceFetch>();
            services.AddScoped<QuizzServicePost>();
            services.AddScoped<TalksServiceFetch>();
            services.AddScoped<TalksServicePost>();
            services.AddScoped<QuestionServiceFetch>();
            services.AddScoped<UserServiceFetch>();
            services.AddScoped<UserServicePost>();
            services.AddScoped<HealthCheckOption>();
            services.AddScoped<UserServices>();
            services.AddScoped<JwtTokenValidation>();

            services.AddCors(o => o.AddPolicy("ReactPolicy", builder =>
            {
                builder.WithOrigins("http://localhost:3000")
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials();
            }));

            services.AddHealthChecks()
                .AddDbContextCheck<TalkContext>()
                .AddCheck<TalkHealthCheck>("TalksGet")
                .AddCheck<QuizzHealthCheck>("QuizzGet");
            services.AddHealthChecksUI();

            services.AddDbContext<TalkContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DBString")));

            services.AddControllers();

            services.AddSignalR();

            services.AddApplicationInsightsTelemetry(
                   new ApplicationInsightsServiceOptions
                   {
                       RequestCollectionOptions = { TrackExceptions = true },
                       EnableRequestTrackingTelemetryModule = true,
                   });

            services.AddControllersWithViews()
            .AddNewtonsoftJson(options =>
              options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
 );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, HealthCheckOption healthCheckOptions, ILogger<Startup> logger, TalkContext dataContext)
        {
            app.UseDeveloperExceptionPage();
            if (env.IsDevelopment())
            {
                logger.LogInformation("In Development environment");
                app.UseCors("ReactPolicy");
            }

            app.UseSignalR(routes =>
            {
                routes.MapHub<TalkAnswerHub>("/TalkAnswerHub");
            });

            dataContext.Database.Migrate();

            app.UseHealthChecks("/HealthCheck", healthCheckOptions.returnOptions());

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseHealthChecksUI();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
