using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace YourProjectNamespace.Data.Configurations
{
    public class TagFilterConfiguration : IEntityTypeConfiguration<TagFilter>
    {
        public void Configure(EntityTypeBuilder<TagFilter> builder)
        {
            builder.HasKey(tf => tf.Id);

            builder.Property(tf => tf.MapId).IsRequired();
            builder.Property(tf => tf.TagId).IsRequired();
            builder.Property(a => a.MaptoTagId).IsRequired();
            builder.Property(tf => tf.Auth0Id).IsRequired();
            builder.Property(tf => tf.CreatedAt).IsRequired();
            builder.Property(a => a.MapToUserId).IsRequired();
            

            builder.HasOne(uf => uf.MapToUsers)
                   .WithMany()
                   .HasForeignKey(uf => uf.MapToUserId)  // Changed from Id
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(cc => cc.MapToTags)
                   .WithMany()
                   .HasForeignKey(cc => cc.MaptoTagId)  // Changed from Id
                   .OnDelete(DeleteBehavior.Cascade);
            

            

            builder.ToTable("TagFilters");
        }
    }
}
