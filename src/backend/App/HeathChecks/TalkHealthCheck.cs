using System;
using System.Threading;
using System.Threading.Tasks;
using App.TalkCreation.Data.DataFetch;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace App.HeathChecks
{
    public class TalkHealthCheck : IHealthCheck
    {
        private readonly TalksServiceFetch _talkService;
        public TalkHealthCheck(TalksServiceFetch talkService)
        {
            _talkService = talkService;
        }

        public object ApplicationEvent { get; private set; }

        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            try
            {
                await _talkService.getTalkAndQuizzes(1);
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
