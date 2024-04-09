using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Server.Core.Entities;

namespace Server.Data
{
    public class DataContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration["DbConnectionString"]);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeRole>().HasKey(er => new { er.RoleId, er.EmployeeId });
        }
        public DataContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
    }
}
