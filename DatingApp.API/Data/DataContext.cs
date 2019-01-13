using Microsoft.EntityFrameworkCore;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options){ }
        public DbSet<Value> Values { get; set; } 
        public DbSet<User> Users { get; set; } 
        public DbSet<Photo> Photos { get; set; } 
        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     optionsBuilder.UseSqlite("Data Source=DatingApp.db");
        // }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     optionsBuilder.UseSqlServer(@"Server=.\;Database=DatingApp;Trusted_Connection=True;MultipleActiveResultSets=true");
        // }
    }
}