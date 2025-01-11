using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace YourProjectNamespace.Data.Configurations
{
    public class UserFilterConfiguration : IEntityTypeConfiguration<UserFilter>
    {
        public void Configure(EntityTypeBuilder<UserFilter> builder)
        {
            builder.HasKey(uf => uf.Id);

            builder.Property(uf => uf.MapId).IsRequired();
            builder.Property(a => a.MapToUserId).IsRequired();
            builder.Property(uf => uf.Auth0Id).IsRequired();
            builder.Property(uf => uf.UserId).IsRequired();
            builder.Property(uf => uf.Auth0IdToFilter).IsRequired();
            builder.Property(uf => uf.CreatedAt).IsRequired();
        


            builder.HasOne(uf => uf.MapToUsers)
                   .WithMany()
                   .HasForeignKey(uf => uf.MapToUserId)  // Changed from Id
                   .OnDelete(DeleteBehavior.Cascade);
            
            builder.HasOne(cc => cc.Users)
                   .WithMany()
                   .HasForeignKey(cc => cc.UserId)  // Changed from UserId
                   .OnDelete(DeleteBehavior.Cascade);

            

            builder.ToTable("UserFilters");
        }
    }
}
