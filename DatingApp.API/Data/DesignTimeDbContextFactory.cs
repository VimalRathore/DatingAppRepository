using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace DatingApp.API.Data
{
   public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DataContext>
{
    public DataContext CreateDbContext(string[] args)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();
        var builder = new DbContextOptionsBuilder<DataContext>();
        //var connectionString = configuration.GetConnectionString("DefaultConnection");
        var connection = @"Server=.\;Database=DatingApp;Trusted_Connection=True;MultipleActiveResultSets=true";
        builder.UseSqlServer(connection);
        return new DataContext(builder.Options);
    }
}
}