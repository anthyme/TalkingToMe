using App.TalkCreation.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using App.TalkCreation.Data;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using App.TalkCreation.Data.DataFetch;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using App.HeathChecks;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace App
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<QuizzServiceFetch>();
            services.AddScoped<QuizzServicePost>();
            services.AddScoped<TalksServiceFetch>();
            services.AddScoped<TalksServicePost>();
            services.AddScoped<QuestionServiceFetch>();
            services.AddScoped<UserServiceFetch>();
            services.AddScoped<HealthCheckOption>();

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
