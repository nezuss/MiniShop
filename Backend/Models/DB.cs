using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class DB : DbContext
    {
        public DB(DbContextOptions<DB> options) : base(options) {}
        public DbSet<Item> Items { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
