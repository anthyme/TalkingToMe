using System;
using System.Threading;
using System.Threading.Tasks;
using App.TalkCreation.Data.DataFetch;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace App.HeathChecks
{
    public class QuizzHealthCheck : IHealthCheck
    {
        private readonly QuizzServiceFetch _quizzService;
        public QuizzHealthCheck(QuizzServiceFetch quizzService)
        {
            _quizzService = quizzService;
        }

        public object ApplicationEvent { get; private set; }

        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            try
            {
                await _quizzService.returnQuizzById(1);
                return HealthCheckResult.Healthy();
            }
            catch (Exception exception)
            {
                return HealthCheckResult.Unhealthy("Description", exception);
                throw;
            }
        }
    }
}
