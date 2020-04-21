using App.TalkCreation.Context;
using App.TalkCreation.Data;
using App.TalkCreation.Data.DataFetch;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

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
