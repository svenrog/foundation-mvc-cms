using Microsoft.Extensions.Hosting;
using System;

namespace Skeidar.Web.Infrastructure.Services
{
    public class EnvironmentSettings : IEnvironmentSettings
    {
        private const string _netCoreEnvironmentName = "ASPNETCORE_ENVIRONMENT";
        private static string _netCoreEnvironment => Environment.GetEnvironmentVariable(_netCoreEnvironmentName);

        public bool IsDevelopment => _netCoreEnvironment == Environments.Development;
        public string CurrentEnvironment => _netCoreEnvironment;
    }
}
