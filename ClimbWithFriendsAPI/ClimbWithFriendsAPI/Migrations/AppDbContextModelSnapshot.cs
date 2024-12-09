﻿// <auto-generated />
using System.Collections.Generic;
using ClimbWithFriendsAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ClimbWithFriendsAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresExtension(modelBuilder, "postgis");
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ClimbWithFriendsAPI.Data.Climb", b =>
                {
                    b.Property<int>("ClimbId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ClimbId"));

                    b.Property<string>("ClimbName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("ClimbType")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<Point>("Coordinates")
                        .IsRequired()
                        .HasColumnType("geometry");

                    b.Property<string>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("character varying(1000)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.Property<int>("Pitches")
                        .HasColumnType("integer");

                    b.Property<string>("Rating")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("UpdatedAt")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("character varying(500)");

                    b.HasKey("ClimbId");

                    b.ToTable("Climbs");

                    b.HasData(
                        new
                        {
                            ClimbId = 1,
                            ClimbName = "El Capitan",
                            ClimbType = "Trad,Big Wall",
                            Coordinates = (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-119.638 37.733)"),
                            CreatedAt = "2024-12-10T22:10:51.6835040Z",
                            Description = "One of the most iconic climbs in the world.",
                            Location = "Yosemite National Park",
                            Pitches = 30,
                            Rating = "5.12d",
                            UpdatedAt = "2024-12-10T22:10:51.6835070Z",
                            Url = "https://www.example.com/el-capitan"
                        },
                        new
                        {
                            ClimbId = 2,
                            ClimbName = "The Nose",
                            ClimbType = "Trad,Big Wall",
                            Coordinates = (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-119.638 37.733)"),
                            CreatedAt = "2024-12-10T22:10:51.6835090Z",
                            Description = "A legendary climb with a rich history.",
                            Location = "Yosemite National Park",
                            Pitches = 31,
                            Rating = "5.14a",
                            UpdatedAt = "2024-12-10T22:10:51.6835090Z",
                            Url = "https://www.example.com/the-nose"
                        },
                        new
                        {
                            ClimbId = 3,
                            ClimbName = "Moonlight Buttress",
                            ClimbType = "Trad",
                            Coordinates = (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-113.026 37.274)"),
                            CreatedAt = "2024-12-10T22:10:51.6835190Z",
                            Description = "A stunning climb up a sandstone wall.",
                            Location = "Zion National Park",
                            Pitches = 9,
                            Rating = "5.12d",
                            UpdatedAt = "2024-12-10T22:10:51.6835190Z",
                            Url = "https://www.example.com/moonlight-buttress"
                        });
                });

            modelBuilder.Entity("ClimbWithFriendsAPI.Data.Feature", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClimbId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ClimbName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<List<string>>("ClimberNames")
                        .IsRequired()
                        .HasColumnType("text[]");

                    b.Property<string>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Grade")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal>("Latitude")
                        .HasColumnType("numeric");

                    b.Property<decimal>("Longitude")
                        .HasColumnType("numeric");

                    b.Property<string>("UpdatedAt")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Features");
                });

            modelBuilder.Entity("ClimbWithFriendsAPI.Data.Map", b =>
                {
                    b.Property<int>("MapId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("MapId"));

                    b.Property<string>("CreatedAt")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("character varying(500)");

                    b.Property<string>("MapName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("UpdatedAt")
                        .HasColumnType("text");

                    b.HasKey("MapId");

                    b.ToTable("Maps");

                    b.HasData(
                        new
                        {
                            MapId = 101,
                            CreatedAt = "2024-11-01T09:00:00Z",
                            Description = "A curated collection of intermediate summit climbs offering breathtaking views.",
                            MapName = "Summit Challenge A",
                            UpdatedAt = "2024-11-10T09:00:00Z"
                        },
                        new
                        {
                            MapId = 102,
                            CreatedAt = "2024-11-02T10:00:00Z",
                            Description = "An alpine-themed collection featuring climbs through rugged peaks and icy paths.",
                            MapName = "Alpine Adventure B",
                            UpdatedAt = "2024-11-11T10:00:00Z"
                        },
                        new
                        {
                            MapId = 103,
                            CreatedAt = "2024-11-03T11:00:00Z",
                            Description = "A selection of climbs showcasing stunning canyon walls and deep gorges.",
                            MapName = "Canyon Climbs C",
                            UpdatedAt = "2024-11-12T11:00:00Z"
                        },
                        new
                        {
                            MapId = 104,
                            CreatedAt = "2024-11-04T12:00:00Z",
                            Description = "Climbs in arid desert landscapes, including iconic sandstone formations.",
                            MapName = "Desert Heights D",
                            UpdatedAt = "2024-11-13T12:00:00Z"
                        },
                        new
                        {
                            MapId = 105,
                            CreatedAt = "2024-11-05T13:00:00Z",
                            Description = "A collection of snow-covered climbs, ideal for experienced adventurers.",
                            MapName = "Winter Ascents E",
                            UpdatedAt = "2024-11-14T13:00:00Z"
                        });
                });

            modelBuilder.Entity("ClimbWithFriendsAPI.Data.MapToTag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AssociatedAt")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("MapId")
                        .HasColumnType("integer");

                    b.Property<int>("TagId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("MapId");

                    b.ToTable("MapToTags", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AssociatedAt = "2024-12-01T10:00:00Z",
                            MapId = 101,
                            TagId = 101
                        },
                        new
                        {
                            Id = 2,
                            AssociatedAt = "2024-12-02T11:00:00Z",
                            MapId = 102,
                            TagId = 102
                        },
                        new
                        {
                            Id = 3,
                            AssociatedAt = "2024-12-03T12:00:00Z",
                            MapId = 103,
                            TagId = 103
                        },
                        new
                        {
                            Id = 4,
                            AssociatedAt = "2024-12-02T12:00:00Z",
                            MapId = 104,
                            TagId = 104
                        },
                        new
                        {
                            Id = 5,
                            AssociatedAt = "2024-12-03T14:00:00Z",
                            MapId = 101,
                            TagId = 102
                        },
                        new
                        {
                            Id = 6,
                            AssociatedAt = "2024-12-04T15:00:00Z",
                            MapId = 105,
                            TagId = 105
                        });
                });

            modelBuilder.Entity("ClimbWithFriendsAPI.Data.MapToUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AssociatedAt")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("MapId")
                        .HasColumnType("integer");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("MapId");

                    b.ToTable("MapToUsers");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            AssociatedAt = "2024-12-01T10:00:00Z",
                            MapId = 101,
                            UserId = "google-oauth2|100195696035167038572"
                        },
                        new
                        {
                            Id = 2,
                            AssociatedAt = "2024-12-02T11:00:00Z",
                            MapId = 102,
                            UserId = "google-oauth2|100195696035167038572"
                        },
                        new
                        {
                            Id = 3,
                            AssociatedAt = "2024-12-03T12:00:00Z",
                            MapId = 103,
                            UserId = "google-oauth2|100195696035167038572"
                        },
                        new
                        {
                            Id = 4,
                            AssociatedAt = "2024-12-02T12:00:00Z",
                            MapId = 104,
                            UserId = "google-oauth2|112911737438637748824"
                        },
                        new
                        {
                            Id = 5,
                            AssociatedAt = "2024-12-03T14:00:00Z",
                            MapId = 101,
                            UserId = "google-oauth2|112911737438637748824"
                        },
                        new
                        {
                            Id = 6,
                            AssociatedAt = "2024-12-04T15:00:00Z",
                            MapId = 105,
                            UserId = "google-oauth2|112911737438637748824"
                        });
                });

            modelBuilder.Entity("ClimbWithFriendsAPI.Data.Tag", b =>
                {
                    b.Property<int>("TagId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("TagId"));

                    b.Property<string>("CreatedAt")
                        .HasColumnType("text");

                    b.Property<string>("TagName")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<string>("UpdatedAt")
                        .HasColumnType("text");

                    b.HasKey("TagId");

                    b.ToTable("Tags");

                    b.HasData(
                        new
                        {
                            TagId = 101,
                            CreatedAt = "2024-11-01T09:00:00Z",
                            TagName = "woop",
                            UpdatedAt = "2024-11-10T09:00:00Z"
                        },
                        new
                        {
                            TagId = 102,
                            CreatedAt = "2024-11-02T10:00:00Z",
                            TagName = "hype",
                            UpdatedAt = "2024-11-11T10:00:00Z"
                        },
                        new
                        {
                            TagId = 103,
                            CreatedAt = "2024-11-03T11:00:00Z",
                            TagName = "blue",
                            UpdatedAt = "2024-11-12T11:00:00Z"
                        },
                        new
                        {
                            TagId = 104,
                            CreatedAt = "2024-11-04T12:00:00Z",
                            TagName = "great",
                            UpdatedAt = "2024-11-13T12:00:00Z"
                        },
                        new
                        {
                            TagId = 105,
                            CreatedAt = "2024-11-05T13:00:00Z",
                            TagName = "amazing",
                            UpdatedAt = "2024-11-14T13:00:00Z"
                        });
                });

            modelBuilder.Entity("ClimbWithFriendsAPI.Data.MapToTag", b =>
                {
                    b.HasOne("ClimbWithFriendsAPI.Data.Map", "Map")
                        .WithMany()
                        .HasForeignKey("MapId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Map");
                });

            modelBuilder.Entity("ClimbWithFriendsAPI.Data.MapToUser", b =>
                {
                    b.HasOne("ClimbWithFriendsAPI.Data.Map", "Map")
                        .WithMany()
                        .HasForeignKey("MapId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Map");
                });
#pragma warning restore 612, 618
        }
    }
}
