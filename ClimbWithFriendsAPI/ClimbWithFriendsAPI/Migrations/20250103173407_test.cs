using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ClimbWithFriendsAPI.Migrations
{
    /// <inheritdoc />
    public partial class test : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:postgis", ",,");

            migrationBuilder.CreateTable(
                name: "Climbs",
                columns: table => new
                {
                    ClimbId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClimbName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Location = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Coordinates = table.Column<Point>(type: "geometry", nullable: false),
                    Url = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    ClimbType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Rating = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Pitches = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<string>(type: "text", nullable: false),
                    UpdatedAt = table.Column<string>(type: "text", nullable: false),
                    AvgStars = table.Column<double>(type: "double precision", nullable: false),
                    AreaLatitude = table.Column<double>(type: "double precision", nullable: false),
                    AreaLongitude = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Climbs", x => x.ClimbId);
                });

            migrationBuilder.CreateTable(
                name: "Features",
                columns: table => new
                {
                    FeatureId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TagId = table.Column<int>(type: "integer", nullable: false),
                    MapId = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<string>(type: "text", nullable: false),
                    UpdatedAt = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Features", x => x.FeatureId);
                });

            migrationBuilder.CreateTable(
                name: "Maps",
                columns: table => new
                {
                    MapId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MapName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    CreatedAt = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maps", x => x.MapId);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    TagId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TagName = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    CreatedAt = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.TagId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Auth0ID = table.Column<string>(type: "text", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "GradeRangeFilters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MapId = table.Column<int>(type: "integer", nullable: false),
                    Auth0Id = table.Column<string>(type: "text", nullable: false),
                    FromGrade = table.Column<string>(type: "text", nullable: false),
                    ToGrade = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GradeRangeFilters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GradeRangeFilters_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "MapId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MapToFeatureToClimbs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MapId = table.Column<int>(type: "integer", nullable: false),
                    ClimbId = table.Column<int>(type: "integer", nullable: false),
                    FeatureId = table.Column<int>(type: "integer", nullable: false),
                    AssociatedAt = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapToFeatureToClimbs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MapToFeatureToClimbs_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "MapId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MapToUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MapId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    AssociatedAt = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapToUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MapToUsers_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "MapId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClimbToTags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClimbId = table.Column<int>(type: "integer", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false),
                    AssociatedAt = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClimbToTags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClimbToTags_Climbs_ClimbId",
                        column: x => x.ClimbId,
                        principalTable: "Climbs",
                        principalColumn: "ClimbId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClimbToTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "TagId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MapToTags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MapId = table.Column<int>(type: "integer", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false),
                    AssociatedAt = table.Column<string>(type: "text", nullable: false),
                    MapId1 = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapToTags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MapToTags_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "MapId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MapToTags_Maps_MapId1",
                        column: x => x.MapId1,
                        principalTable: "Maps",
                        principalColumn: "MapId");
                    table.ForeignKey(
                        name: "FK_MapToTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "TagId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MapToUserToClimbs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ClimbId = table.Column<int>(type: "integer", nullable: false),
                    MapId = table.Column<int>(type: "integer", nullable: false),
                    Auth0ID = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    AssociatedAt = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapToUserToClimbs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MapToUserToClimbs_Climbs_ClimbId",
                        column: x => x.ClimbId,
                        principalTable: "Climbs",
                        principalColumn: "ClimbId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MapToUserToClimbs_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "MapId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MapToUserToClimbs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClimbChats",
                columns: table => new
                {
                    ClimbChatId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MapId = table.Column<int>(type: "integer", nullable: false),
                    ClimbId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    MapToFeatureToClimbId = table.Column<int>(type: "integer", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClimbChats", x => x.ClimbChatId);
                    table.ForeignKey(
                        name: "FK_ClimbChats_Climbs_ClimbId",
                        column: x => x.ClimbId,
                        principalTable: "Climbs",
                        principalColumn: "ClimbId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClimbChats_MapToFeatureToClimbs_MapToFeatureToClimbId",
                        column: x => x.MapToFeatureToClimbId,
                        principalTable: "MapToFeatureToClimbs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClimbChats_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "MapId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClimbChats_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserFilters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MapId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Auth0Id = table.Column<string>(type: "text", nullable: false),
                    MapToUserId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFilters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserFilters_MapToUsers_MapToUserId",
                        column: x => x.MapToUserId,
                        principalTable: "MapToUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserFilters_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TagFilters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TagId = table.Column<int>(type: "integer", nullable: false),
                    MapId = table.Column<int>(type: "integer", nullable: false),
                    Auth0Id = table.Column<string>(type: "text", nullable: false),
                    MaptoTagId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagFilters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TagFilters_MapToTags_MaptoTagId",
                        column: x => x.MaptoTagId,
                        principalTable: "MapToTags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Attempts",
                columns: table => new
                {
                    AttemptId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MapId = table.Column<int>(type: "integer", nullable: false),
                    ClimbId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    MapToUserToClimbId = table.Column<int>(type: "integer", nullable: false),
                    Attempts = table.Column<string>(type: "text", nullable: false),
                    Difficulty = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attempts", x => x.AttemptId);
                    table.ForeignKey(
                        name: "FK_Attempts_Climbs_ClimbId",
                        column: x => x.ClimbId,
                        principalTable: "Climbs",
                        principalColumn: "ClimbId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Attempts_MapToUserToClimbs_MapToUserToClimbId",
                        column: x => x.MapToUserToClimbId,
                        principalTable: "MapToUserToClimbs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Attempts_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "MapId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Attempts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Ticks",
                columns: table => new
                {
                    TickId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MapId = table.Column<int>(type: "integer", nullable: false),
                    ClimbId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    MapToUserToClimbId = table.Column<int>(type: "integer", nullable: false),
                    Attempts = table.Column<string>(type: "text", nullable: false),
                    Difficulty = table.Column<string>(type: "text", nullable: false),
                    Notes = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<string>(type: "text", nullable: true),
                    UpdatedAt = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ticks", x => x.TickId);
                    table.ForeignKey(
                        name: "FK_Ticks_Climbs_ClimbId",
                        column: x => x.ClimbId,
                        principalTable: "Climbs",
                        principalColumn: "ClimbId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ticks_MapToUserToClimbs_MapToUserToClimbId",
                        column: x => x.MapToUserToClimbId,
                        principalTable: "MapToUserToClimbs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ticks_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "MapId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ticks_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Climbs",
                columns: new[] { "ClimbId", "AreaLatitude", "AreaLongitude", "AvgStars", "ClimbName", "ClimbType", "Coordinates", "CreatedAt", "Location", "Pitches", "Rating", "UpdatedAt", "Url" },
                values: new object[,]
                {
                    { 1, 0.0, 0.0, 0.0, "Horse Fly", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2025-01-03T17:34:06.7057358Z", "Roadside Boulder > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V5", "2025-01-03T17:34:06.7061041Z", "https://www.mountainproject.com/route/106806098/horse-fly" },
                    { 2, 0.0, 0.0, 0.0, "Kelly's Fly", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2025-01-03T17:34:06.7063016Z", "Roadside Boulder > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V7", "2025-01-03T17:34:06.7063024Z", "https://www.mountainproject.com/route/106806101/kellys-fly" },
                    { 3, 0.0, 0.0, 0.0, "Top Out Cop Out", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2025-01-03T17:34:06.7063151Z", "Anchor Rock > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2025-01-03T17:34:06.7063151Z", "https://www.mountainproject.com/route/106806115/top-out-cop-out" },
                    { 4, 0.0, 0.0, 0.0, "ODB Left", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2025-01-03T17:34:06.7063211Z", "Anchor Rock > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V3", "2025-01-03T17:34:06.7063212Z", "https://www.mountainproject.com/route/106806120/odb-left" },
                    { 5, 0.0, 0.0, 0.0, "Excelsior", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2025-01-03T17:34:06.7063267Z", "Anchor Rock > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V4", "2025-01-03T17:34:06.7063267Z", "https://www.mountainproject.com/route/106806108/excelsior" },
                    { 6, 0.0, 0.0, 0.0, "3 Glazers", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2025-01-03T17:34:06.7063329Z", "3 Glazers Boulder > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V5", "2025-01-03T17:34:06.7063329Z", "https://www.mountainproject.com/route/106806130/3-glazers" },
                    { 7, 0.0, 0.0, 0.0, "Olympic New", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2025-01-03T17:34:06.7063386Z", "The Olympic Boulder > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V4", "2025-01-03T17:34:06.7063386Z", "https://www.mountainproject.com/route/106806143/olympic-new" },
                    { 8, 0.0, 0.0, 0.0, "Olympic New Sit", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2025-01-03T17:34:06.7063480Z", "The Olympic Boulder > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V7", "2025-01-03T17:34:06.7063480Z", "https://www.mountainproject.com/route/106806146/olympic-new-sit" },
                    { 9, 0.0, 0.0, 0.0, "Cranium Cracker", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2025-01-03T17:34:06.7063538Z", "Cranium Boulder > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V4", "2025-01-03T17:34:06.7063538Z", "https://www.mountainproject.com/route/106806154/cranium-cracker" },
                    { 10, 0.0, 0.0, 0.0, "Warm up that kills your hands", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41826 47.71369)"), "2025-01-03T17:34:06.7063606Z", "Main stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0+", "2025-01-03T17:34:06.7063606Z", "https://www.mountainproject.com/route/116352005/warm-up-that-kills-your-hands" },
                    { 11, 0.0, 0.0, 0.0, "RIP hands", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41826 47.71369)"), "2025-01-03T17:34:06.7063663Z", "Main stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1-2", "2025-01-03T17:34:06.7063664Z", "https://www.mountainproject.com/route/116351995/rip-hands" },
                    { 12, 0.0, 0.0, 0.0, "Fun dyno crimp", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41826 47.71369)"), "2025-01-03T17:34:06.7063723Z", "Main stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2+", "2025-01-03T17:34:06.7063724Z", "https://www.mountainproject.com/route/116354168/fun-dyno-crimp" },
                    { 13, 0.0, 0.0, 0.0, "Beach Crack", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41931 47.71575)"), "2025-01-03T17:34:06.7063831Z", "Northernmost stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0", "2025-01-03T17:34:06.7063832Z", "https://www.mountainproject.com/route/119245180/beach-crack" },
                    { 14, 0.0, 0.0, 0.0, "Beach Slab", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41931 47.71575)"), "2025-01-03T17:34:06.7063891Z", "Northernmost stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0-1", "2025-01-03T17:34:06.7063892Z", "https://www.mountainproject.com/route/124538213/beach-slab" },
                    { 15, 0.0, 0.0, 0.0, "5 Karat Traverse", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41701 47.71192)"), "2025-01-03T17:34:06.7063954Z", "Three-pillar stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7063955Z", "https://www.mountainproject.com/route/119174300/5-karat-traverse" },
                    { 16, 0.0, 0.0, 0.0, "Pillar puller", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41701 47.71192)"), "2025-01-03T17:34:06.7064213Z", "Three-pillar stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2025-01-03T17:34:06.7064213Z", "https://www.mountainproject.com/route/123883322/pillar-puller" },
                    { 17, 0.0, 0.0, 0.0, "10 Karat Traverse", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41701 47.71192)"), "2025-01-03T17:34:06.7064275Z", "Three-pillar stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V3", "2025-01-03T17:34:06.7064276Z", "https://www.mountainproject.com/route/119174375/10-karat-traverse" },
                    { 18, 0.0, 0.0, 0.0, "Slabface west", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41826 47.71369)"), "2025-01-03T17:34:06.7064362Z", "Slabface > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0-1", "2025-01-03T17:34:06.7064362Z", "https://www.mountainproject.com/route/116351847/slabface-west" },
                    { 19, 0.0, 0.0, 0.0, "Slabface", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41826 47.71369)"), "2025-01-03T17:34:06.7064420Z", "Slabface > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1+", "2025-01-03T17:34:06.7064420Z", "https://www.mountainproject.com/route/114779104/slabface" },
                    { 20, 0.0, 0.0, 0.0, "Undercling crack crimp", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41826 47.71369)"), "2025-01-03T17:34:06.7064483Z", "Undercling stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V5+", "2025-01-03T17:34:06.7064483Z", "https://www.mountainproject.com/route/116351912/undercling-crack-crimp" },
                    { 21, 0.0, 0.0, 0.0, "Chimichangas", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38583 47.63921)"), "2025-01-03T17:34:06.7064540Z", "Low Tide Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7064541Z", "https://www.mountainproject.com/route/120811016/chimichangas" },
                    { 22, 0.0, 0.0, 0.0, "Low Tide Center", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38583 47.63921)"), "2025-01-03T17:34:06.7064599Z", "Low Tide Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7064600Z", "https://www.mountainproject.com/route/118113913/low-tide-center" },
                    { 23, 0.0, 0.0, 0.0, "Prow Right", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38583 47.63921)"), "2025-01-03T17:34:06.7064700Z", "Low Tide Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7064700Z", "https://www.mountainproject.com/route/118113958/prow-right" },
                    { 24, 0.0, 0.0, 0.0, "Prow Left", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38583 47.63921)"), "2025-01-03T17:34:06.7064780Z", "Low Tide Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7064781Z", "https://www.mountainproject.com/route/118113978/prow-left" },
                    { 25, 0.0, 0.0, 0.0, "Crabclaws", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38583 47.63921)"), "2025-01-03T17:34:06.7064839Z", "Low Tide Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V3-", "2025-01-03T17:34:06.7064840Z", "https://www.mountainproject.com/route/119221372/crabclaws" },
                    { 26, 0.0, 0.0, 0.0, "Under the Sea", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38636 47.64008)"), "2025-01-03T17:34:06.7064897Z", "Under the Sea > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2025-01-03T17:34:06.7064898Z", "https://www.mountainproject.com/route/119690489/under-the-sea" },
                    { 27, 0.0, 0.0, 0.0, "Pickpocket", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38684 47.64199)"), "2025-01-03T17:34:06.7064957Z", "Kalaloch Traverse Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2025-01-03T17:34:06.7064957Z", "https://www.mountainproject.com/route/120958791/pickpocket" },
                    { 28, 0.0, 0.0, 0.0, "Swiss Cheese Arete Right", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38751 47.64562)"), "2025-01-03T17:34:06.7065035Z", "North Cluster > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V-easy", "2025-01-03T17:34:06.7065036Z", "https://www.mountainproject.com/route/121247249/swiss-cheese-arete-right" },
                    { 29, 0.0, 0.0, 0.0, "Swiss Cheese Arete Left", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38751 47.64562)"), "2025-01-03T17:34:06.7065096Z", "North Cluster > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0", "2025-01-03T17:34:06.7065121Z", "https://www.mountainproject.com/route/121247278/swiss-cheese-arete-left" },
                    { 30, 0.0, 0.0, 0.0, "Gunshot", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38751 47.64562)"), "2025-01-03T17:34:06.7065177Z", "North Cluster > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0-1", "2025-01-03T17:34:06.7065178Z", "https://www.mountainproject.com/route/126349929/gunshot" },
                    { 31, 0.0, 0.0, 0.0, "Shoobies", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38751 47.64562)"), "2025-01-03T17:34:06.7065232Z", "North Cluster > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V5", "2025-01-03T17:34:06.7065233Z", "https://www.mountainproject.com/route/126352156/shoobies" },
                    { 32, 0.0, 0.0, 0.0, "Shell City", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2025-01-03T17:34:06.7065325Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V-easy", "2025-01-03T17:34:06.7065325Z", "https://www.mountainproject.com/route/121247462/shell-city" },
                    { 33, 0.0, 0.0, 0.0, "Bubbles!", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2025-01-03T17:34:06.7065381Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0", "2025-01-03T17:34:06.7065381Z", "https://www.mountainproject.com/route/121247591/bubbles" },
                    { 34, 0.0, 0.0, 0.0, "Unknown Mantle", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2025-01-03T17:34:06.7065439Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0", "2025-01-03T17:34:06.7065440Z", "https://www.mountainproject.com/route/124495228/unknown-mantle" },
                    { 35, 0.0, 0.0, 0.0, "Rainbow Arete", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2025-01-03T17:34:06.7065521Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0", "2025-01-03T17:34:06.7065522Z", "https://www.mountainproject.com/route/122584043/rainbow-arete" },
                    { 36, 0.0, 0.0, 0.0, "The Poser", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2025-01-03T17:34:06.7065578Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7065578Z", "https://www.mountainproject.com/route/121247206/the-poser" },
                    { 37, 0.0, 0.0, 0.0, "Rainbow Shell", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2025-01-03T17:34:06.7065645Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7065646Z", "https://www.mountainproject.com/route/121247528/rainbow-shell" },
                    { 38, 0.0, 0.0, 0.0, "Rainbow Shell Left", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2025-01-03T17:34:06.7065721Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1+", "2025-01-03T17:34:06.7065722Z", "https://www.mountainproject.com/route/122584093/rainbow-shell-left" },
                    { 39, 0.0, 0.0, 0.0, "Red Spotted Jasper", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2025-01-03T17:34:06.7065795Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2025-01-03T17:34:06.7065796Z", "https://www.mountainproject.com/route/124643341/red-spotted-jasper" },
                    { 40, 0.0, 0.0, 0.0, "Pretty Boy", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2025-01-03T17:34:06.7065864Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V3-4", "2025-01-03T17:34:06.7065878Z", "https://www.mountainproject.com/route/122749550/pretty-boy" },
                    { 41, 0.0, 0.0, 0.0, "Crimp Line", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38646 47.64013)"), "2025-01-03T17:34:06.7065951Z", "Warm-up Slab > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0-", "2025-01-03T17:34:06.7065952Z", "https://www.mountainproject.com/route/122584203/crimp-line" },
                    { 42, 0.0, 0.0, 0.0, "Diagonal", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38646 47.64013)"), "2025-01-03T17:34:06.7066021Z", "Warm-up Slab > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0", "2025-01-03T17:34:06.7066021Z", "https://www.mountainproject.com/route/122584129/diagonal" },
                    { 43, 0.0, 0.0, 0.0, "Penny Pockets", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38646 47.64013)"), "2025-01-03T17:34:06.7066092Z", "Warm-up Slab > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0", "2025-01-03T17:34:06.7066093Z", "https://www.mountainproject.com/route/122584160/penny-pockets" },
                    { 44, 0.0, 0.0, 0.0, "Misty 1", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.3863 47.63983)"), "2025-01-03T17:34:06.7066162Z", "Misty Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2025-01-03T17:34:06.7066162Z", "https://www.mountainproject.com/route/122749602/misty-1" },
                    { 45, 0.0, 0.0, 0.0, "Misty 2", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.3863 47.63983)"), "2025-01-03T17:34:06.7066233Z", "Misty Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2025-01-03T17:34:06.7066234Z", "https://www.mountainproject.com/route/122749619/misty-2" },
                    { 46, 0.0, 0.0, 0.0, "Unknown", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.3863 47.63983)"), "2025-01-03T17:34:06.7066351Z", "Misty Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2+", "2025-01-03T17:34:06.7066352Z", "https://www.mountainproject.com/route/124490697/unknown" },
                    { 47, 0.0, 0.0, 0.0, "Project", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.3863 47.63983)"), "2025-01-03T17:34:06.7066423Z", "Misty Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2-3", "2025-01-03T17:34:06.7066424Z", "https://www.mountainproject.com/route/124494981/project" },
                    { 48, 0.0, 0.0, 0.0, "Wave to yr dad", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38618 47.64065)"), "2025-01-03T17:34:06.7066620Z", "The Wave > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2025-01-03T17:34:06.7066623Z", "https://www.mountainproject.com/route/124642997/wave-to-yr-dad" },
                    { 49, 0.0, 0.0, 0.0, "Wave to yr mom", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38618 47.64065)"), "2025-01-03T17:34:06.7066697Z", "The Wave > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V4", "2025-01-03T17:34:06.7066698Z", "https://www.mountainproject.com/route/124642933/wave-to-yr-mom" },
                    { 50, 0.0, 0.0, 0.0, "Bootyhole", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38623 47.63981)"), "2025-01-03T17:34:06.7066768Z", "The Flea Circus > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1-", "2025-01-03T17:34:06.7066769Z", "https://www.mountainproject.com/route/124643699/bootyhole" },
                    { 51, 0.0, 0.0, 0.0, "Who Farted?", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38623 47.63981)"), "2025-01-03T17:34:06.7066840Z", "The Flea Circus > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7066840Z", "https://www.mountainproject.com/route/124643681/who-farted" },
                    { 52, 0.0, 0.0, 0.0, "Fleabag", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38623 47.63981)"), "2025-01-03T17:34:06.7066943Z", "The Flea Circus > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1-2", "2025-01-03T17:34:06.7066943Z", "https://www.mountainproject.com/route/124643645/fleabag" },
                    { 53, 0.0, 0.0, 0.0, "Starfish Surprise", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38723 47.64399)"), "2025-01-03T17:34:06.7067017Z", "Waterfall Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V3", "2025-01-03T17:34:06.7067018Z", "https://www.mountainproject.com/route/126352272/starfish-surprise" },
                    { 54, 0.0, 0.0, 0.0, "Rock Dancer Traverse", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.84092 47.37409)"), "2025-01-03T17:34:06.7067078Z", "Chimacum Rock > Olympics & Pacific Coast > Washington", 1, "V2-", "2025-01-03T17:34:06.7067079Z", "https://www.mountainproject.com/route/119219313/rock-dancer-traverse" },
                    { 55, 0.0, 0.0, 0.0, "Easy Middle", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.8269 47.0406)"), "2025-01-03T17:34:06.7067134Z", "Olympia > Olympics & Pacific Coast > Washington", 1, "V-easy", "2025-01-03T17:34:06.7067135Z", "https://www.mountainproject.com/route/107835132/easy-middle" },
                    { 56, 0.0, 0.0, 0.0, "Easy Left", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.8269 47.0406)"), "2025-01-03T17:34:06.7067184Z", "Olympia > Olympics & Pacific Coast > Washington", 1, "V0-", "2025-01-03T17:34:06.7067185Z", "https://www.mountainproject.com/route/107835143/easy-left" },
                    { 57, 0.0, 0.0, 0.0, "Iceman Traverse", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.8269 47.0406)"), "2025-01-03T17:34:06.7067239Z", "Olympia > Olympics & Pacific Coast > Washington", 1, "V1+", "2025-01-03T17:34:06.7067240Z", "https://www.mountainproject.com/route/107835165/iceman-traverse" },
                    { 58, 0.0, 0.0, 0.0, "ATV", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.0644 46.9465)"), "2025-01-03T17:34:06.7067324Z", "Waddle Creek > Capitol Forest > Olympia Area Bouldering > Olympics & Pacific Coast > Washington", 1, "V3", "2025-01-03T17:34:06.7067325Z", "https://www.mountainproject.com/route/107957920/atv" },
                    { 59, 0.0, 0.0, 0.0, "Waddeller", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.0644 46.9465)"), "2025-01-03T17:34:06.7067390Z", "Waddle Creek > Capitol Forest > Olympia Area Bouldering > Olympics & Pacific Coast > Washington", 1, "V3", "2025-01-03T17:34:06.7067390Z", "https://www.mountainproject.com/route/125654507/waddeller" },
                    { 60, 0.0, 0.0, 0.0, "Bolt Action", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.0644 46.9465)"), "2025-01-03T17:34:06.7067455Z", "Waddle Creek > Capitol Forest > Olympia Area Bouldering > Olympics & Pacific Coast > Washington", 1, "V7", "2025-01-03T17:34:06.7067455Z", "https://www.mountainproject.com/route/107957902/bolt-action" },
                    { 61, 0.0, 0.0, 0.0, "Left ventricle", "TR, Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.246 47.53125)"), "2025-01-03T17:34:06.7067521Z", "Mt. Washington > Olympic National Forest > Olympics & Pacific Coast > Washington", 1, "V0", "2025-01-03T17:34:06.7067522Z", "https://www.mountainproject.com/route/123309972/left-ventricle" },
                    { 62, 0.0, 0.0, 0.0, "Cattails", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.2888 47.49235)"), "2025-01-03T17:34:06.7067583Z", "Boulder With a View > Lake Cushman > Olympics & Pacific Coast > Washington", 1, "V2-", "2025-01-03T17:34:06.7067583Z", "https://www.mountainproject.com/route/122291633/cattails" },
                    { 63, 0.0, 0.0, 0.0, "Mike's Hard", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.2888 47.49235)"), "2025-01-03T17:34:06.7067641Z", "Boulder With a View > Lake Cushman > Olympics & Pacific Coast > Washington", 1, "V3", "2025-01-03T17:34:06.7067642Z", "https://www.mountainproject.com/route/125227983/mikes-hard" },
                    { 64, 0.0, 0.0, 0.0, "Hard a steppy", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.2888 47.49235)"), "2025-01-03T17:34:06.7067727Z", "Boulder With a View > Lake Cushman > Olympics & Pacific Coast > Washington", 1, "V3-4", "2025-01-03T17:34:06.7067727Z", "https://www.mountainproject.com/route/122286924/hard-a-steppy" },
                    { 65, 0.0, 0.0, 0.0, "Long boi cattails", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.2888 47.49235)"), "2025-01-03T17:34:06.7067794Z", "Boulder With a View > Lake Cushman > Olympics & Pacific Coast > Washington", 1, "V3-4", "2025-01-03T17:34:06.7067794Z", "https://www.mountainproject.com/route/122300275/long-boi-cattails" },
                    { 66, 0.0, 0.0, 0.0, "Party Crack", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.30218 47.49542)"), "2025-01-03T17:34:06.7067854Z", "Party Rock > Lake Cushman > Olympics & Pacific Coast > Washington", 1, "V2", "2025-01-03T17:34:06.7067855Z", "https://www.mountainproject.com/route/126742128/party-crack" },
                    { 67, 0.0, 0.0, 0.0, "Un drank coffee", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15723 47.62276)"), "2025-01-03T17:34:06.7067944Z", "Lena lake > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7067945Z", "https://www.mountainproject.com/route/114156136/un-drank-coffee" },
                    { 68, 0.0, 0.0, 0.0, "Slot Machine", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.0745 46.2956)"), "2025-01-03T17:34:06.7068005Z", "Monolith Wall > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V0", "2025-01-03T17:34:06.7068005Z", "https://www.mountainproject.com/route/115163251/slot-machine" },
                    { 69, 0.0, 0.0, 0.0, "Left Arete", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.0745 46.2956)"), "2025-01-03T17:34:06.7068092Z", "Monolith Wall > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V0+", "2025-01-03T17:34:06.7068093Z", "https://www.mountainproject.com/route/115163144/left-arete" },
                    { 70, 0.0, 0.0, 0.0, "Easy Street", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.0745 46.2956)"), "2025-01-03T17:34:06.7068153Z", "Monolith Wall > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7068153Z", "https://www.mountainproject.com/route/115163272/easy-street" },
                    { 71, 0.0, 0.0, 0.0, "Top Out", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.0734 46.29434)"), "2025-01-03T17:34:06.7068213Z", "Lewis and Clark Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V-easy", "2025-01-03T17:34:06.7068213Z", "https://www.mountainproject.com/route/115163625/top-out" },
                    { 72, 0.0, 0.0, 0.0, "Columbia step ladder", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.0734 46.29434)"), "2025-01-03T17:34:06.7068281Z", "Lewis and Clark Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7068281Z", "https://www.mountainproject.com/route/115163509/columbia-step-ladder" },
                    { 73, 0.0, 0.0, 0.0, "Swiss Flake", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.0734 46.29434)"), "2025-01-03T17:34:06.7068344Z", "Lewis and Clark Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V2", "2025-01-03T17:34:06.7068345Z", "https://www.mountainproject.com/route/115163587/swiss-flake" },
                    { 74, 0.0, 0.0, 0.0, "Hoot Owl", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.0734 46.29434)"), "2025-01-03T17:34:06.7068404Z", "Lewis and Clark Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V2-3", "2025-01-03T17:34:06.7068404Z", "https://www.mountainproject.com/route/125057191/hoot-owl" },
                    { 75, 0.0, 0.0, 0.0, "Sea Bluff", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07224 46.29409)"), "2025-01-03T17:34:06.7068488Z", "Sands of Time Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V0+", "2025-01-03T17:34:06.7068489Z", "https://www.mountainproject.com/route/115168096/sea-bluff" },
                    { 76, 0.0, 0.0, 0.0, "Crest", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07224 46.29409)"), "2025-01-03T17:34:06.7068548Z", "Sands of Time Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V2", "2025-01-03T17:34:06.7068548Z", "https://www.mountainproject.com/route/115168078/crest" },
                    { 77, 0.0, 0.0, 0.0, "Wall E", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2025-01-03T17:34:06.7068604Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7068605Z", "https://www.mountainproject.com/route/115168152/wall-e" },
                    { 78, 0.0, 0.0, 0.0, "Tyrolean", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2025-01-03T17:34:06.7068661Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1 R", "2025-01-03T17:34:06.7068662Z", "https://www.mountainproject.com/route/115168207/tyrolean" },
                    { 79, 0.0, 0.0, 0.0, "Croc Rock", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2025-01-03T17:34:06.7068718Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7068718Z", "https://www.mountainproject.com/route/115168248/croc-rock" },
                    { 80, 0.0, 0.0, 0.0, "Crumbles", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2025-01-03T17:34:06.7068769Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7068769Z", "https://www.mountainproject.com/route/124665396/crumbles" },
                    { 81, 0.0, 0.0, 0.0, "Go Fold Yourself", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2025-01-03T17:34:06.7068844Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7068845Z", "https://www.mountainproject.com/route/124358844/go-fold-yourself" },
                    { 82, 0.0, 0.0, 0.0, "Jug Hug", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2025-01-03T17:34:06.7068890Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V2+", "2025-01-03T17:34:06.7068890Z", "https://www.mountainproject.com/route/124318061/jug-hug" },
                    { 83, 0.0, 0.0, 0.0, "Reach for the stars", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2025-01-03T17:34:06.7068984Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V3", "2025-01-03T17:34:06.7068985Z", "https://www.mountainproject.com/route/124318163/reach-for-the-stars" },
                    { 84, 0.0, 0.0, 0.0, "Surprise", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2025-01-03T17:34:06.7069028Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V3", "2025-01-03T17:34:06.7069029Z", "https://www.mountainproject.com/route/124665366/surprise" },
                    { 85, 0.0, 0.0, 0.0, "Lattice", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2025-01-03T17:34:06.7069073Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V3", "2025-01-03T17:34:06.7069073Z", "https://www.mountainproject.com/route/115168136/lattice" },
                    { 86, 0.0, 0.0, 0.0, "schwing and a slap", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2025-01-03T17:34:06.7069121Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V5", "2025-01-03T17:34:06.7069121Z", "https://www.mountainproject.com/route/124767873/schwing-and-a-slap" },
                    { 87, 0.0, 0.0, 0.0, "John", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07396 46.29434)"), "2025-01-03T17:34:06.7069181Z", "The Shark's Fin > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7069181Z", "https://www.mountainproject.com/route/115168313/john" },
                    { 88, 0.0, 0.0, 0.0, "Julia", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07396 46.29434)"), "2025-01-03T17:34:06.7069504Z", "The Shark's Fin > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7069507Z", "https://www.mountainproject.com/route/115168347/julia" },
                    { 89, 0.0, 0.0, 0.0, "Stairway to Heaven", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.05749 46.2821)"), "2025-01-03T17:34:06.7069556Z", "Stage Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V-easy", "2025-01-03T17:34:06.7069557Z", "https://www.mountainproject.com/route/115168912/stairway-to-heaven" },
                    { 90, 0.0, 0.0, 0.0, "Grilled Cheese", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.05749 46.2821)"), "2025-01-03T17:34:06.7069603Z", "Stage Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1-", "2025-01-03T17:34:06.7069604Z", "https://www.mountainproject.com/route/115168926/grilled-cheese" },
                    { 91, 0.0, 0.0, 0.0, "Staring blankly", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2025-01-03T17:34:06.7069653Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V-easy", "2025-01-03T17:34:06.7069654Z", "https://www.mountainproject.com/route/119282371/staring-blankly" },
                    { 92, 0.0, 0.0, 0.0, "Placed By The Pioneers", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2025-01-03T17:34:06.7069704Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V0", "2025-01-03T17:34:06.7069705Z", "https://www.mountainproject.com/route/120038863/placed-by-the-pioneers" },
                    { 93, 0.0, 0.0, 0.0, "Tall Timber", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2025-01-03T17:34:06.7069787Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7069788Z", "https://www.mountainproject.com/route/120044477/tall-timber" },
                    { 94, 0.0, 0.0, 0.0, "Logger Rhythm", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2025-01-03T17:34:06.7069833Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V1", "2025-01-03T17:34:06.7069834Z", "https://www.mountainproject.com/route/120048363/logger-rhythm" },
                    { 95, 0.0, 0.0, 0.0, "Undercut", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2025-01-03T17:34:06.7069879Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V1+", "2025-01-03T17:34:06.7069879Z", "https://www.mountainproject.com/route/120719116/undercut" },
                    { 96, 0.0, 0.0, 0.0, "Loggers Lap", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2025-01-03T17:34:06.7069925Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V1-2", "2025-01-03T17:34:06.7069926Z", "https://www.mountainproject.com/route/120044482/loggers-lap" },
                    { 97, 0.0, 0.0, 0.0, "Spidey Dyno", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2025-01-03T17:34:06.7069970Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V2", "2025-01-03T17:34:06.7069971Z", "https://www.mountainproject.com/route/119282322/spidey-dyno" },
                    { 98, 0.0, 0.0, 0.0, "Unnamed", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2025-01-03T17:34:06.7070014Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V2", "2025-01-03T17:34:06.7070014Z", "https://www.mountainproject.com/route/120719166/unnamed" },
                    { 99, 0.0, 0.0, 0.0, "Stumpjumper", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2025-01-03T17:34:06.7070099Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V3+", "2025-01-03T17:34:06.7070099Z", "https://www.mountainproject.com/route/120065010/stumpjumper" },
                    { 100, 0.0, 0.0, 0.0, "Talk a Boat Easy", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.58668 47.87778)"), "2025-01-03T17:34:06.7071456Z", "Big Fat Beach boulder > La Push Beaches > Olympics & Pacific Coast > Washington", 1, "V0-", "2025-01-03T17:34:06.7071461Z", "https://www.mountainproject.com/route/109572402/talk-a-boat-easy" }
                });

            migrationBuilder.InsertData(
                table: "Features",
                columns: new[] { "FeatureId", "CreatedAt", "MapId", "TagId", "Type", "UpdatedAt" },
                values: new object[] { 1, "2024-12-01T10:00:00Z", 101, 0, "Feature", "2024-12-01T10:00:00Z" });

            migrationBuilder.InsertData(
                table: "Maps",
                columns: new[] { "MapId", "CreatedAt", "Description", "MapName", "UpdatedAt" },
                values: new object[,]
                {
                    { 101, "2024-11-01T09:00:00Z", "A curated collection of intermediate summit climbs offering breathtaking views.", "Summit Challenge A", "2024-11-10T09:00:00Z" },
                    { 102, "2024-11-02T10:00:00Z", "An alpine-themed collection featuring climbs through rugged peaks and icy paths.", "Alpine Adventure B", "2024-11-11T10:00:00Z" },
                    { 103, "2024-11-03T11:00:00Z", "A selection of climbs showcasing stunning canyon walls and deep gorges.", "Canyon Climbs C", "2024-11-12T11:00:00Z" },
                    { 104, "2024-11-04T12:00:00Z", "Climbs in arid desert landscapes, including iconic sandstone formations.", "Desert Heights D", "2024-11-13T12:00:00Z" },
                    { 105, "2024-11-05T13:00:00Z", "A collection of snow-covered climbs, ideal for experienced adventurers.", "Winter Ascents E", "2024-11-14T13:00:00Z" }
                });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "TagId", "CreatedAt", "TagName", "UpdatedAt" },
                values: new object[,]
                {
                    { 101, "2024-11-01T09:00:00Z", "woop", "2024-11-10T09:00:00Z" },
                    { 102, "2024-11-02T10:00:00Z", "hype", "2024-11-11T10:00:00Z" },
                    { 103, "2024-11-03T11:00:00Z", "blue", "2024-11-12T11:00:00Z" },
                    { 104, "2024-11-04T12:00:00Z", "great", "2024-11-13T12:00:00Z" },
                    { 105, "2024-11-05T13:00:00Z", "amazing", "2024-11-14T13:00:00Z" },
                    { 106, "2024-11-05T13:00:00Z", "coolio", "2024-11-14T13:00:00Z" }
                });

            migrationBuilder.InsertData(
                table: "ClimbToTags",
                columns: new[] { "Id", "AssociatedAt", "ClimbId", "TagId" },
                values: new object[,]
                {
                    { 1, "2024-12-01T10:00:00Z", 1, 101 },
                    { 2, "2024-12-01T10:00:00Z", 1, 102 },
                    { 3, "2024-12-01T10:00:00Z", 2, 103 },
                    { 4, "2024-12-01T10:00:00Z", 2, 104 },
                    { 5, "2024-12-01T10:00:00Z", 3, 105 },
                    { 6, "2024-12-01T10:00:00Z", 4, 106 }
                });

            migrationBuilder.InsertData(
                table: "MapToFeatureToClimbs",
                columns: new[] { "Id", "AssociatedAt", "ClimbId", "FeatureId", "MapId" },
                values: new object[,]
                {
                    { 1, "2024-12-01T10:00:00Z", 6, 1, 101 },
                    { 2, "2024-12-01T10:00:00Z", 5, 1, 101 },
                    { 3, "2024-12-01T10:00:00Z", 4, 1, 101 },
                    { 4, "2024-12-01T10:00:00Z", 3, 1, 101 },
                    { 5, "2024-12-01T10:00:00Z", 2, 1, 101 },
                    { 6, "2024-12-01T10:00:00Z", 1, 1, 101 }
                });

            migrationBuilder.InsertData(
                table: "MapToTags",
                columns: new[] { "Id", "AssociatedAt", "MapId", "MapId1", "TagId" },
                values: new object[,]
                {
                    { 1, "2024-12-01T10:00:00Z", 101, null, 101 },
                    { 2, "2024-12-01T10:00:00Z", 101, null, 102 },
                    { 3, "2024-12-01T10:00:00Z", 101, null, 103 },
                    { 4, "2024-12-01T10:00:00Z", 101, null, 104 },
                    { 5, "2024-12-01T10:00:00Z", 101, null, 105 },
                    { 6, "2024-12-01T10:00:00Z", 101, null, 106 }
                });

            migrationBuilder.InsertData(
                table: "MapToUsers",
                columns: new[] { "Id", "AssociatedAt", "MapId", "UserId" },
                values: new object[,]
                {
                    { 1, "2024-12-01T10:00:00Z", 101, "google-oauth2|100195696035167038572" },
                    { 2, "2024-12-02T11:00:00Z", 102, "google-oauth2|100195696035167038572" },
                    { 3, "2024-12-03T12:00:00Z", 103, "google-oauth2|100195696035167038572" },
                    { 4, "2024-12-02T12:00:00Z", 104, "google-oauth2|112911737438637748824" },
                    { 5, "2024-12-03T14:00:00Z", 101, "google-oauth2|112911737438637748824" },
                    { 6, "2024-12-04T15:00:00Z", 105, "google-oauth2|112911737438637748824" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attempts_ClimbId",
                table: "Attempts",
                column: "ClimbId");

            migrationBuilder.CreateIndex(
                name: "IX_Attempts_MapId",
                table: "Attempts",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_Attempts_MapToUserToClimbId",
                table: "Attempts",
                column: "MapToUserToClimbId");

            migrationBuilder.CreateIndex(
                name: "IX_Attempts_UserId",
                table: "Attempts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ClimbChats_ClimbId",
                table: "ClimbChats",
                column: "ClimbId");

            migrationBuilder.CreateIndex(
                name: "IX_ClimbChats_MapId",
                table: "ClimbChats",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_ClimbChats_MapToFeatureToClimbId",
                table: "ClimbChats",
                column: "MapToFeatureToClimbId");

            migrationBuilder.CreateIndex(
                name: "IX_ClimbChats_UserId",
                table: "ClimbChats",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ClimbToTags_ClimbId",
                table: "ClimbToTags",
                column: "ClimbId");

            migrationBuilder.CreateIndex(
                name: "IX_ClimbToTags_TagId",
                table: "ClimbToTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_GradeRangeFilters_MapId",
                table: "GradeRangeFilters",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_MapToFeatureToClimbs_MapId",
                table: "MapToFeatureToClimbs",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_MapToTags_MapId",
                table: "MapToTags",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_MapToTags_MapId1",
                table: "MapToTags",
                column: "MapId1");

            migrationBuilder.CreateIndex(
                name: "IX_MapToTags_TagId",
                table: "MapToTags",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_MapToUsers_MapId",
                table: "MapToUsers",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_MapToUserToClimbs_ClimbId",
                table: "MapToUserToClimbs",
                column: "ClimbId");

            migrationBuilder.CreateIndex(
                name: "IX_MapToUserToClimbs_MapId",
                table: "MapToUserToClimbs",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_MapToUserToClimbs_UserId",
                table: "MapToUserToClimbs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TagFilters_MaptoTagId",
                table: "TagFilters",
                column: "MaptoTagId");

            migrationBuilder.CreateIndex(
                name: "IX_Ticks_ClimbId",
                table: "Ticks",
                column: "ClimbId");

            migrationBuilder.CreateIndex(
                name: "IX_Ticks_MapId",
                table: "Ticks",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_Ticks_MapToUserToClimbId",
                table: "Ticks",
                column: "MapToUserToClimbId");

            migrationBuilder.CreateIndex(
                name: "IX_Ticks_UserId",
                table: "Ticks",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFilters_MapToUserId",
                table: "UserFilters",
                column: "MapToUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFilters_UserId",
                table: "UserFilters",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attempts");

            migrationBuilder.DropTable(
                name: "ClimbChats");

            migrationBuilder.DropTable(
                name: "ClimbToTags");

            migrationBuilder.DropTable(
                name: "Features");

            migrationBuilder.DropTable(
                name: "GradeRangeFilters");

            migrationBuilder.DropTable(
                name: "TagFilters");

            migrationBuilder.DropTable(
                name: "Ticks");

            migrationBuilder.DropTable(
                name: "UserFilters");

            migrationBuilder.DropTable(
                name: "MapToFeatureToClimbs");

            migrationBuilder.DropTable(
                name: "MapToTags");

            migrationBuilder.DropTable(
                name: "MapToUserToClimbs");

            migrationBuilder.DropTable(
                name: "MapToUsers");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Climbs");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Maps");
        }
    }
}
