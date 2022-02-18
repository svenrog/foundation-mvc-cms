using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using Skeidar.Web.Infrastructure.Services;

namespace Foundation
{
    public class Program
    {
        private static string _environment;

        public static void Main(string[] args)
        {
            var settings = new EnvironmentSettings();
            _environment = settings.CurrentEnvironment;

            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .CreateLogger();            

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureCmsDefaults()
                .ConfigureAppConfiguration(app =>
                {
                    app.AddJsonFile("appsettings.json");
                    app.AddJsonFile($"appsettings.{_environment}.json", true);
                })
                .UseSerilog()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
