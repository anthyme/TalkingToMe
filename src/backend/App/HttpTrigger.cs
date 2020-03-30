using System.Threading.Tasks;
using App.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Owin.Security.Provider;

namespace App.Controllers
{
    public class HttpTrigger
    {
        private readonly BaseContext _context;
        public HttpTrigger(BaseContext context)
        {
            _context = context;
        }

        [FunctionName("GetPosts")]
        public async Task<IActionResult> Get(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "posts")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            // Code that returns posts - you can see this code by going
            // to the full sample linked at the bottom
            return new OkResult();
        }
    }
}
