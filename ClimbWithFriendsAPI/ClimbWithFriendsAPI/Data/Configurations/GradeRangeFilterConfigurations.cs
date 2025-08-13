using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClimbWithFriendsAPI.Data.Configurations
{
    public class GradeRangeFilterConfiguration : IEntityTypeConfiguration<GradeRangeFilter>
    {
        public void Configure(EntityTypeBuilder<GradeRangeFilter> builder)
        {
            builder.HasKey(gf => gf.Id);

            builder.Property(gf => gf.MapId).IsRequired();
            builder.Property(gf => gf.Auth0Id).IsRequired();
            builder.Property(gf => gf.FromGrade).IsRequired();
            builder.Property(gf => gf.ToGrade).IsRequired();
            builder.Property(gf => gf.Type).IsRequired();
            builder.Property(gf => gf.CreatedAt).IsRequired();
            builder.Property(u => u.MapToUserId).IsRequired();


            builder.HasOne(gf => gf.Maps)
                   .WithMany()
                   .HasForeignKey(gf => gf.MapId)  // Changed from Id
                   .OnDelete(DeleteBehavior.Cascade);

         builder.HasOne(u => u.MapToUser)
                   .WithMany()
                   .HasForeignKey(t => t.MapToUserId)  // Changed from Id
                   .OnDelete(DeleteBehavior.Cascade);
            

            //need to add maptouser dependency

            builder.ToTable("GradeRangeFilters");
        }
    }
}


