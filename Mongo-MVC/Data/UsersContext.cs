using Microsoft.EntityFrameworkCore;

namespace MongoTest.Data
{
    public class UsersContext : DbContext
    {
        public UsersContext(DbContextOptions<UsersContext> options)
            : base(options)
        {
        }

        public DbSet<MongoTest.Models.Users> Users { get; set; } = default!;
    }
}