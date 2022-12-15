using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Triperis.Models;

namespace Triperis.Data
{
    public class AppDbContext : IdentityDbContext<AppUser, IdentityRole<int>, int>
    {
        //private readonly RoleManager<AppUser> _roleManager;
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Car> Cars { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Reaction> Reactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AppUser>()
                .HasMany(u => u.Cars)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId);

            modelBuilder.Entity<Car>()
                .HasMany(c => c.Comments)
                .WithOne(c => c.Car)
                .HasForeignKey(c => c.CarId);

            modelBuilder.Entity<Car>()
                .HasMany(c => c.Images)
                .WithOne(c => c.Car)
                .HasForeignKey(c => c.CarId);

            modelBuilder.Entity<AppUser>()
                .HasMany(u => u.Comments)
                .WithOne(c => c.User);

            modelBuilder.Entity<AppUser>()
                .HasMany(u => u.Reactions)
                .WithOne(r => r.User);

            modelBuilder.Entity<Comment>()
                .HasMany(c => c.Reactions)
                .WithOne(r => r.Comment)
                .HasForeignKey(r => r.CommentId);

            //Seed
            modelBuilder.Entity<IdentityRole<int>>()
                .HasData(
                    new IdentityRole<int> { Id = 1, Name = "Admin", NormalizedName = "Admin" },
                    new IdentityRole<int> { Id = 2, Name = "User", NormalizedName = "User" }
                );

            var hasher = new PasswordHasher<AppUser>();
            modelBuilder.Entity<AppUser>()
                .HasData(
                    new AppUser
                    {
                        Id = 1,
                        UserName = "adminas",
                        Email = "admin@a.com",
                        CanCreateListings = true,
                        PhoneNumber = "+37054338654",
                        CanComment = true,
                        PasswordHash = hasher.HashPassword(null, "adminas")
                    },
                    new AppUser
                    {
                        Id = 2,
                        UserName = "pardavejas",
                        Email = "seller@a.com",
                        CanCreateListings = true,
                        PhoneNumber = "+37054338657",
                        CanComment = true,
                        PasswordHash = hasher.HashPassword(null, "pardavejas")
                    }
                );

            modelBuilder.Entity<IdentityUserRole<int>>()
                .HasData(
                    new IdentityUserRole<int>
                    {
                        RoleId = 1,
                        UserId = 1
                    },
                    new IdentityUserRole<int>
                    {
                        RoleId = 2,
                        UserId = 2
                    }
                );
        }
    }
    //https://stackoverflow.com/questions/19902756/asp-net-identity-dbcontext-confusion

}
