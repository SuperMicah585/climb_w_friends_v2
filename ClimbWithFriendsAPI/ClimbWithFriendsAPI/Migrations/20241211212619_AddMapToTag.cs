using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ClimbWithFriendsAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddMapToTag : Migration
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
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Latitude = table.Column<decimal>(type: "numeric", nullable: false),
                    Longitude = table.Column<decimal>(type: "numeric", nullable: false),
                    ClimbId = table.Column<string>(type: "text", nullable: false),
                    ClimbName = table.Column<string>(type: "text", nullable: false),
                    Grade = table.Column<string>(type: "text", nullable: false),
                    ClimberNames = table.Column<List<string>>(type: "text[]", nullable: false),
                    CreatedAt = table.Column<string>(type: "text", nullable: false),
                    UpdatedAt = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Features", x => x.Id);
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
                name: "MapToTags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MapId = table.Column<int>(type: "integer", nullable: false),
                    TagId = table.Column<int>(type: "integer", nullable: false),
                    AssociatedAt = table.Column<string>(type: "text", nullable: false)
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

            migrationBuilder.InsertData(
                table: "Climbs",
                columns: new[] { "ClimbId", "AreaLatitude", "AreaLongitude", "AvgStars", "ClimbName", "ClimbType", "Coordinates", "CreatedAt", "Location", "Pitches", "Rating", "UpdatedAt", "Url" },
                values: new object[,]
                {
                    { 1, 0.0, 0.0, 0.0, "Horse Fly", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2024-12-11T21:26:17.7874510Z", "Roadside Boulder > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V5", "2024-12-11T21:26:17.7874540Z", "https://www.mountainproject.com/route/106806098/horse-fly" },
                    { 2, 0.0, 0.0, 0.0, "Kelly's Fly", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2024-12-11T21:26:17.7874860Z", "Roadside Boulder > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V7", "2024-12-11T21:26:17.7874860Z", "https://www.mountainproject.com/route/106806101/kellys-fly" },
                    { 3, 0.0, 0.0, 0.0, "Top Out Cop Out", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2024-12-11T21:26:17.7875020Z", "Anchor Rock > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2024-12-11T21:26:17.7875020Z", "https://www.mountainproject.com/route/106806115/top-out-cop-out" },
                    { 4, 0.0, 0.0, 0.0, "ODB Left", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2024-12-11T21:26:17.7875170Z", "Anchor Rock > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V3", "2024-12-11T21:26:17.7875170Z", "https://www.mountainproject.com/route/106806120/odb-left" },
                    { 5, 0.0, 0.0, 0.0, "Excelsior", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2024-12-11T21:26:17.7875320Z", "Anchor Rock > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V4", "2024-12-11T21:26:17.7875320Z", "https://www.mountainproject.com/route/106806108/excelsior" },
                    { 6, 0.0, 0.0, 0.0, "3 Glazers", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2024-12-11T21:26:17.7875480Z", "3 Glazers Boulder > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V5", "2024-12-11T21:26:17.7875480Z", "https://www.mountainproject.com/route/106806130/3-glazers" },
                    { 7, 0.0, 0.0, 0.0, "Olympic New", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2024-12-11T21:26:17.7875740Z", "The Olympic Boulder > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V4", "2024-12-11T21:26:17.7875740Z", "https://www.mountainproject.com/route/106806143/olympic-new" },
                    { 8, 0.0, 0.0, 0.0, "Olympic New Sit", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2024-12-11T21:26:17.7875900Z", "The Olympic Boulder > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V7", "2024-12-11T21:26:17.7875910Z", "https://www.mountainproject.com/route/106806146/olympic-new-sit" },
                    { 9, 0.0, 0.0, 0.0, "Cranium Cracker", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15347 47.7343)"), "2024-12-11T21:26:17.7876050Z", "Cranium Boulder > Jefferson Lake > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V4", "2024-12-11T21:26:17.7876060Z", "https://www.mountainproject.com/route/106806154/cranium-cracker" },
                    { 10, 0.0, 0.0, 0.0, "Warm up that kills your hands", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41826 47.71369)"), "2024-12-11T21:26:17.7876230Z", "Main stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0+", "2024-12-11T21:26:17.7876230Z", "https://www.mountainproject.com/route/116352005/warm-up-that-kills-your-hands" },
                    { 11, 0.0, 0.0, 0.0, "RIP hands", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41826 47.71369)"), "2024-12-11T21:26:17.7876380Z", "Main stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1-2", "2024-12-11T21:26:17.7876380Z", "https://www.mountainproject.com/route/116351995/rip-hands" },
                    { 12, 0.0, 0.0, 0.0, "Fun dyno crimp", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41826 47.71369)"), "2024-12-11T21:26:17.7876530Z", "Main stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2+", "2024-12-11T21:26:17.7876530Z", "https://www.mountainproject.com/route/116354168/fun-dyno-crimp" },
                    { 13, 0.0, 0.0, 0.0, "Beach Crack", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41931 47.71575)"), "2024-12-11T21:26:17.7876780Z", "Northernmost stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0", "2024-12-11T21:26:17.7876780Z", "https://www.mountainproject.com/route/119245180/beach-crack" },
                    { 14, 0.0, 0.0, 0.0, "Beach Slab", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41931 47.71575)"), "2024-12-11T21:26:17.7876940Z", "Northernmost stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0-1", "2024-12-11T21:26:17.7876940Z", "https://www.mountainproject.com/route/124538213/beach-slab" },
                    { 15, 0.0, 0.0, 0.0, "5 Karat Traverse", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41701 47.71192)"), "2024-12-11T21:26:17.7877100Z", "Three-pillar stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7877100Z", "https://www.mountainproject.com/route/119174300/5-karat-traverse" },
                    { 16, 0.0, 0.0, 0.0, "Pillar puller", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41701 47.71192)"), "2024-12-11T21:26:17.7877480Z", "Three-pillar stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2024-12-11T21:26:17.7877490Z", "https://www.mountainproject.com/route/123883322/pillar-puller" },
                    { 17, 0.0, 0.0, 0.0, "10 Karat Traverse", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41701 47.71192)"), "2024-12-11T21:26:17.7877650Z", "Three-pillar stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V3", "2024-12-11T21:26:17.7877650Z", "https://www.mountainproject.com/route/119174375/10-karat-traverse" },
                    { 18, 0.0, 0.0, 0.0, "Slabface west", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41826 47.71369)"), "2024-12-11T21:26:17.7877870Z", "Slabface > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0-1", "2024-12-11T21:26:17.7877870Z", "https://www.mountainproject.com/route/116351847/slabface-west" },
                    { 19, 0.0, 0.0, 0.0, "Slabface", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41826 47.71369)"), "2024-12-11T21:26:17.7878020Z", "Slabface > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1+", "2024-12-11T21:26:17.7878030Z", "https://www.mountainproject.com/route/114779104/slabface" },
                    { 20, 0.0, 0.0, 0.0, "Undercling crack crimp", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.41826 47.71369)"), "2024-12-11T21:26:17.7878190Z", "Undercling stack > Ruby beach boulder stacks > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V5+", "2024-12-11T21:26:17.7878190Z", "https://www.mountainproject.com/route/116351912/undercling-crack-crimp" },
                    { 21, 0.0, 0.0, 0.0, "Chimichangas", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38583 47.63921)"), "2024-12-11T21:26:17.7878340Z", "Low Tide Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7878340Z", "https://www.mountainproject.com/route/120811016/chimichangas" },
                    { 22, 0.0, 0.0, 0.0, "Low Tide Center", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38583 47.63921)"), "2024-12-11T21:26:17.7878500Z", "Low Tide Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7878500Z", "https://www.mountainproject.com/route/118113913/low-tide-center" },
                    { 23, 0.0, 0.0, 0.0, "Prow Right", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38583 47.63921)"), "2024-12-11T21:26:17.7878650Z", "Low Tide Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7878650Z", "https://www.mountainproject.com/route/118113958/prow-right" },
                    { 24, 0.0, 0.0, 0.0, "Prow Left", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38583 47.63921)"), "2024-12-11T21:26:17.7879400Z", "Low Tide Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7879410Z", "https://www.mountainproject.com/route/118113978/prow-left" },
                    { 25, 0.0, 0.0, 0.0, "Crabclaws", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38583 47.63921)"), "2024-12-11T21:26:17.7879580Z", "Low Tide Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V3-", "2024-12-11T21:26:17.7879580Z", "https://www.mountainproject.com/route/119221372/crabclaws" },
                    { 26, 0.0, 0.0, 0.0, "Under the Sea", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38636 47.64008)"), "2024-12-11T21:26:17.7879730Z", "Under the Sea > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2024-12-11T21:26:17.7879730Z", "https://www.mountainproject.com/route/119690489/under-the-sea" },
                    { 27, 0.0, 0.0, 0.0, "Pickpocket", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38684 47.64199)"), "2024-12-11T21:26:17.7879890Z", "Kalaloch Traverse Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2024-12-11T21:26:17.7879890Z", "https://www.mountainproject.com/route/120958791/pickpocket" },
                    { 28, 0.0, 0.0, 0.0, "Swiss Cheese Arete Right", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38751 47.64562)"), "2024-12-11T21:26:17.7880050Z", "North Cluster > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V-easy", "2024-12-11T21:26:17.7880050Z", "https://www.mountainproject.com/route/121247249/swiss-cheese-arete-right" },
                    { 29, 0.0, 0.0, 0.0, "Swiss Cheese Arete Left", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38751 47.64562)"), "2024-12-11T21:26:17.7880290Z", "North Cluster > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0", "2024-12-11T21:26:17.7880290Z", "https://www.mountainproject.com/route/121247278/swiss-cheese-arete-left" },
                    { 30, 0.0, 0.0, 0.0, "Gunshot", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38751 47.64562)"), "2024-12-11T21:26:17.7880440Z", "North Cluster > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0-1", "2024-12-11T21:26:17.7880450Z", "https://www.mountainproject.com/route/126349929/gunshot" },
                    { 31, 0.0, 0.0, 0.0, "Shoobies", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38751 47.64562)"), "2024-12-11T21:26:17.7880590Z", "North Cluster > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V5", "2024-12-11T21:26:17.7880590Z", "https://www.mountainproject.com/route/126352156/shoobies" },
                    { 32, 0.0, 0.0, 0.0, "Shell City", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2024-12-11T21:26:17.7880830Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V-easy", "2024-12-11T21:26:17.7880830Z", "https://www.mountainproject.com/route/121247462/shell-city" },
                    { 33, 0.0, 0.0, 0.0, "Bubbles!", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2024-12-11T21:26:17.7880980Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0", "2024-12-11T21:26:17.7880980Z", "https://www.mountainproject.com/route/121247591/bubbles" },
                    { 34, 0.0, 0.0, 0.0, "Unknown Mantle", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2024-12-11T21:26:17.7881130Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0", "2024-12-11T21:26:17.7881130Z", "https://www.mountainproject.com/route/124495228/unknown-mantle" },
                    { 35, 0.0, 0.0, 0.0, "Rainbow Arete", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2024-12-11T21:26:17.7881350Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0", "2024-12-11T21:26:17.7881350Z", "https://www.mountainproject.com/route/122584043/rainbow-arete" },
                    { 36, 0.0, 0.0, 0.0, "The Poser", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2024-12-11T21:26:17.7881490Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7881490Z", "https://www.mountainproject.com/route/121247206/the-poser" },
                    { 37, 0.0, 0.0, 0.0, "Rainbow Shell", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2024-12-11T21:26:17.7881640Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7881640Z", "https://www.mountainproject.com/route/121247528/rainbow-shell" },
                    { 38, 0.0, 0.0, 0.0, "Rainbow Shell Left", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2024-12-11T21:26:17.7881790Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1+", "2024-12-11T21:26:17.7881790Z", "https://www.mountainproject.com/route/122584093/rainbow-shell-left" },
                    { 39, 0.0, 0.0, 0.0, "Red Spotted Jasper", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2024-12-11T21:26:17.7881940Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2024-12-11T21:26:17.7881940Z", "https://www.mountainproject.com/route/124643341/red-spotted-jasper" },
                    { 40, 0.0, 0.0, 0.0, "Pretty Boy", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38643 47.63958)"), "2024-12-11T21:26:17.7882180Z", "The Blob > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V3-4", "2024-12-11T21:26:17.7882190Z", "https://www.mountainproject.com/route/122749550/pretty-boy" },
                    { 41, 0.0, 0.0, 0.0, "Crimp Line", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38646 47.64013)"), "2024-12-11T21:26:17.7882350Z", "Warm-up Slab > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0-", "2024-12-11T21:26:17.7882350Z", "https://www.mountainproject.com/route/122584203/crimp-line" },
                    { 42, 0.0, 0.0, 0.0, "Diagonal", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38646 47.64013)"), "2024-12-11T21:26:17.7882500Z", "Warm-up Slab > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0", "2024-12-11T21:26:17.7882500Z", "https://www.mountainproject.com/route/122584129/diagonal" },
                    { 43, 0.0, 0.0, 0.0, "Penny Pockets", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38646 47.64013)"), "2024-12-11T21:26:17.7882650Z", "Warm-up Slab > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V0", "2024-12-11T21:26:17.7882650Z", "https://www.mountainproject.com/route/122584160/penny-pockets" },
                    { 44, 0.0, 0.0, 0.0, "Misty 1", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.3863 47.63983)"), "2024-12-11T21:26:17.7882780Z", "Misty Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2024-12-11T21:26:17.7882780Z", "https://www.mountainproject.com/route/122749602/misty-1" },
                    { 45, 0.0, 0.0, 0.0, "Misty 2", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.3863 47.63983)"), "2024-12-11T21:26:17.7882930Z", "Misty Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2024-12-11T21:26:17.7882940Z", "https://www.mountainproject.com/route/122749619/misty-2" },
                    { 46, 0.0, 0.0, 0.0, "Unknown", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.3863 47.63983)"), "2024-12-11T21:26:17.7883200Z", "Misty Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2+", "2024-12-11T21:26:17.7883210Z", "https://www.mountainproject.com/route/124490697/unknown" },
                    { 47, 0.0, 0.0, 0.0, "Project", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.3863 47.63983)"), "2024-12-11T21:26:17.7883360Z", "Misty Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2-3", "2024-12-11T21:26:17.7883360Z", "https://www.mountainproject.com/route/124494981/project" },
                    { 48, 0.0, 0.0, 0.0, "Wave to yr dad", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38618 47.64065)"), "2024-12-11T21:26:17.7883580Z", "The Wave > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V2", "2024-12-11T21:26:17.7883580Z", "https://www.mountainproject.com/route/124642997/wave-to-yr-dad" },
                    { 49, 0.0, 0.0, 0.0, "Wave to yr mom", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38618 47.64065)"), "2024-12-11T21:26:17.7883730Z", "The Wave > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V4", "2024-12-11T21:26:17.7883730Z", "https://www.mountainproject.com/route/124642933/wave-to-yr-mom" },
                    { 50, 0.0, 0.0, 0.0, "Bootyhole", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38623 47.63981)"), "2024-12-11T21:26:17.7883880Z", "The Flea Circus > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1-", "2024-12-11T21:26:17.7883880Z", "https://www.mountainproject.com/route/124643699/bootyhole" },
                    { 51, 0.0, 0.0, 0.0, "Who Farted?", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38623 47.63981)"), "2024-12-11T21:26:17.7884030Z", "The Flea Circus > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7884030Z", "https://www.mountainproject.com/route/124643681/who-farted" },
                    { 52, 0.0, 0.0, 0.0, "Fleabag", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38623 47.63981)"), "2024-12-11T21:26:17.7884250Z", "The Flea Circus > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V1-2", "2024-12-11T21:26:17.7884250Z", "https://www.mountainproject.com/route/124643645/fleabag" },
                    { 53, 0.0, 0.0, 0.0, "Starfish Surprise", "Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.38723 47.64399)"), "2024-12-11T21:26:17.7884400Z", "Waterfall Boulder > Kalaloch Beach 3 > Olympic Bouldering > Olympic National Park > Olympics & Pacific Coast > Washington", 1, "V3", "2024-12-11T21:26:17.7884400Z", "https://www.mountainproject.com/route/126352272/starfish-surprise" },
                    { 54, 0.0, 0.0, 0.0, "Rock Dancer Traverse", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.84092 47.37409)"), "2024-12-11T21:26:17.7884510Z", "Chimacum Rock > Olympics & Pacific Coast > Washington", 1, "V2-", "2024-12-11T21:26:17.7884510Z", "https://www.mountainproject.com/route/119219313/rock-dancer-traverse" },
                    { 55, 0.0, 0.0, 0.0, "Easy Middle", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.8269 47.0406)"), "2024-12-11T21:26:17.7884630Z", "Olympia > Olympics & Pacific Coast > Washington", 1, "V-easy", "2024-12-11T21:26:17.7884630Z", "https://www.mountainproject.com/route/107835132/easy-middle" },
                    { 56, 0.0, 0.0, 0.0, "Easy Left", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.8269 47.0406)"), "2024-12-11T21:26:17.7884730Z", "Olympia > Olympics & Pacific Coast > Washington", 1, "V0-", "2024-12-11T21:26:17.7884740Z", "https://www.mountainproject.com/route/107835143/easy-left" },
                    { 57, 0.0, 0.0, 0.0, "Iceman Traverse", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.8269 47.0406)"), "2024-12-11T21:26:17.7884850Z", "Olympia > Olympics & Pacific Coast > Washington", 1, "V1+", "2024-12-11T21:26:17.7884850Z", "https://www.mountainproject.com/route/107835165/iceman-traverse" },
                    { 58, 0.0, 0.0, 0.0, "ATV", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.0644 46.9465)"), "2024-12-11T21:26:17.7885030Z", "Waddle Creek > Capitol Forest > Olympia Area Bouldering > Olympics & Pacific Coast > Washington", 1, "V3", "2024-12-11T21:26:17.7885040Z", "https://www.mountainproject.com/route/107957920/atv" },
                    { 59, 0.0, 0.0, 0.0, "Waddeller", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.0644 46.9465)"), "2024-12-11T21:26:17.7885160Z", "Waddle Creek > Capitol Forest > Olympia Area Bouldering > Olympics & Pacific Coast > Washington", 1, "V3", "2024-12-11T21:26:17.7885160Z", "https://www.mountainproject.com/route/125654507/waddeller" },
                    { 60, 0.0, 0.0, 0.0, "Bolt Action", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.0644 46.9465)"), "2024-12-11T21:26:17.7885280Z", "Waddle Creek > Capitol Forest > Olympia Area Bouldering > Olympics & Pacific Coast > Washington", 1, "V7", "2024-12-11T21:26:17.7885280Z", "https://www.mountainproject.com/route/107957902/bolt-action" },
                    { 61, 0.0, 0.0, 0.0, "Left ventricle", "TR, Boulder, Alpine", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.246 47.53125)"), "2024-12-11T21:26:17.7885400Z", "Mt. Washington > Olympic National Forest > Olympics & Pacific Coast > Washington", 1, "V0", "2024-12-11T21:26:17.7885400Z", "https://www.mountainproject.com/route/123309972/left-ventricle" },
                    { 62, 0.0, 0.0, 0.0, "Cattails", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.2888 47.49235)"), "2024-12-11T21:26:17.7885510Z", "Boulder With a View > Lake Cushman > Olympics & Pacific Coast > Washington", 1, "V2-", "2024-12-11T21:26:17.7885510Z", "https://www.mountainproject.com/route/122291633/cattails" },
                    { 63, 0.0, 0.0, 0.0, "Mike's Hard", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.2888 47.49235)"), "2024-12-11T21:26:17.7885620Z", "Boulder With a View > Lake Cushman > Olympics & Pacific Coast > Washington", 1, "V3", "2024-12-11T21:26:17.7885620Z", "https://www.mountainproject.com/route/125227983/mikes-hard" },
                    { 64, 0.0, 0.0, 0.0, "Hard a steppy", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.2888 47.49235)"), "2024-12-11T21:26:17.7885900Z", "Boulder With a View > Lake Cushman > Olympics & Pacific Coast > Washington", 1, "V3-4", "2024-12-11T21:26:17.7885900Z", "https://www.mountainproject.com/route/122286924/hard-a-steppy" },
                    { 65, 0.0, 0.0, 0.0, "Long boi cattails", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.2888 47.49235)"), "2024-12-11T21:26:17.7886030Z", "Boulder With a View > Lake Cushman > Olympics & Pacific Coast > Washington", 1, "V3-4", "2024-12-11T21:26:17.7886030Z", "https://www.mountainproject.com/route/122300275/long-boi-cattails" },
                    { 66, 0.0, 0.0, 0.0, "Party Crack", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.30218 47.49542)"), "2024-12-11T21:26:17.7886140Z", "Party Rock > Lake Cushman > Olympics & Pacific Coast > Washington", 1, "V2", "2024-12-11T21:26:17.7886150Z", "https://www.mountainproject.com/route/126742128/party-crack" },
                    { 67, 0.0, 0.0, 0.0, "Un drank coffee", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-123.15723 47.62276)"), "2024-12-11T21:26:17.7886340Z", "Lena lake > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7886350Z", "https://www.mountainproject.com/route/114156136/un-drank-coffee" },
                    { 68, 0.0, 0.0, 0.0, "Slot Machine", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.0745 46.2956)"), "2024-12-11T21:26:17.7886470Z", "Monolith Wall > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V0", "2024-12-11T21:26:17.7886470Z", "https://www.mountainproject.com/route/115163251/slot-machine" },
                    { 69, 0.0, 0.0, 0.0, "Left Arete", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.0745 46.2956)"), "2024-12-11T21:26:17.7886640Z", "Monolith Wall > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V0+", "2024-12-11T21:26:17.7886640Z", "https://www.mountainproject.com/route/115163144/left-arete" },
                    { 70, 0.0, 0.0, 0.0, "Easy Street", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.0745 46.2956)"), "2024-12-11T21:26:17.7886760Z", "Monolith Wall > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7886760Z", "https://www.mountainproject.com/route/115163272/easy-street" },
                    { 71, 0.0, 0.0, 0.0, "Top Out", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.0734 46.29434)"), "2024-12-11T21:26:17.7886870Z", "Lewis and Clark Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V-easy", "2024-12-11T21:26:17.7886870Z", "https://www.mountainproject.com/route/115163625/top-out" },
                    { 72, 0.0, 0.0, 0.0, "Columbia step ladder", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.0734 46.29434)"), "2024-12-11T21:26:17.7887000Z", "Lewis and Clark Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7887000Z", "https://www.mountainproject.com/route/115163509/columbia-step-ladder" },
                    { 73, 0.0, 0.0, 0.0, "Swiss Flake", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.0734 46.29434)"), "2024-12-11T21:26:17.7887110Z", "Lewis and Clark Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V2", "2024-12-11T21:26:17.7887110Z", "https://www.mountainproject.com/route/115163587/swiss-flake" },
                    { 74, 0.0, 0.0, 0.0, "Hoot Owl", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.0734 46.29434)"), "2024-12-11T21:26:17.7887220Z", "Lewis and Clark Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V2-3", "2024-12-11T21:26:17.7887220Z", "https://www.mountainproject.com/route/125057191/hoot-owl" },
                    { 75, 0.0, 0.0, 0.0, "Sea Bluff", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07224 46.29409)"), "2024-12-11T21:26:17.7887440Z", "Sands of Time Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V0+", "2024-12-11T21:26:17.7887440Z", "https://www.mountainproject.com/route/115168096/sea-bluff" },
                    { 76, 0.0, 0.0, 0.0, "Crest", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07224 46.29409)"), "2024-12-11T21:26:17.7887560Z", "Sands of Time Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V2", "2024-12-11T21:26:17.7887560Z", "https://www.mountainproject.com/route/115168078/crest" },
                    { 77, 0.0, 0.0, 0.0, "Wall E", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2024-12-11T21:26:17.7887660Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7887660Z", "https://www.mountainproject.com/route/115168152/wall-e" },
                    { 78, 0.0, 0.0, 0.0, "Tyrolean", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2024-12-11T21:26:17.7887760Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1 R", "2024-12-11T21:26:17.7887770Z", "https://www.mountainproject.com/route/115168207/tyrolean" },
                    { 79, 0.0, 0.0, 0.0, "Croc Rock", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2024-12-11T21:26:17.7887870Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7887870Z", "https://www.mountainproject.com/route/115168248/croc-rock" },
                    { 80, 0.0, 0.0, 0.0, "Crumbles", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2024-12-11T21:26:17.7887980Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7887980Z", "https://www.mountainproject.com/route/124665396/crumbles" },
                    { 81, 0.0, 0.0, 0.0, "Go Fold Yourself", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2024-12-11T21:26:17.7888180Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7888180Z", "https://www.mountainproject.com/route/124358844/go-fold-yourself" },
                    { 82, 0.0, 0.0, 0.0, "Jug Hug", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2024-12-11T21:26:17.7888290Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V2+", "2024-12-11T21:26:17.7888290Z", "https://www.mountainproject.com/route/124318061/jug-hug" },
                    { 83, 0.0, 0.0, 0.0, "Reach for the stars", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2024-12-11T21:26:17.7888410Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V3", "2024-12-11T21:26:17.7888410Z", "https://www.mountainproject.com/route/124318163/reach-for-the-stars" },
                    { 84, 0.0, 0.0, 0.0, "Surprise", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2024-12-11T21:26:17.7888510Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V3", "2024-12-11T21:26:17.7888520Z", "https://www.mountainproject.com/route/124665366/surprise" },
                    { 85, 0.0, 0.0, 0.0, "Lattice", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2024-12-11T21:26:17.7888620Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V3", "2024-12-11T21:26:17.7888620Z", "https://www.mountainproject.com/route/115168136/lattice" },
                    { 86, 0.0, 0.0, 0.0, "schwing and a slap", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07361 46.2939)"), "2024-12-11T21:26:17.7888740Z", "Te Fiti > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V5", "2024-12-11T21:26:17.7888740Z", "https://www.mountainproject.com/route/124767873/schwing-and-a-slap" },
                    { 87, 0.0, 0.0, 0.0, "John", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07396 46.29434)"), "2024-12-11T21:26:17.7888840Z", "The Shark's Fin > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7888840Z", "https://www.mountainproject.com/route/115168313/john" },
                    { 88, 0.0, 0.0, 0.0, "Julia", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.07396 46.29434)"), "2024-12-11T21:26:17.7889080Z", "The Shark's Fin > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7889080Z", "https://www.mountainproject.com/route/115168347/julia" },
                    { 89, 0.0, 0.0, 0.0, "Stairway to Heaven", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.05749 46.2821)"), "2024-12-11T21:26:17.7889200Z", "Stage Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V-easy", "2024-12-11T21:26:17.7889200Z", "https://www.mountainproject.com/route/115168912/stairway-to-heaven" },
                    { 90, 0.0, 0.0, 0.0, "Grilled Cheese", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.05749 46.2821)"), "2024-12-11T21:26:17.7889310Z", "Stage Rock > Cape Disappointment > Olympics & Pacific Coast > Washington", 1, "V1-", "2024-12-11T21:26:17.7889310Z", "https://www.mountainproject.com/route/115168926/grilled-cheese" },
                    { 91, 0.0, 0.0, 0.0, "Staring blankly", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2024-12-11T21:26:17.7889420Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V-easy", "2024-12-11T21:26:17.7889430Z", "https://www.mountainproject.com/route/119282371/staring-blankly" },
                    { 92, 0.0, 0.0, 0.0, "Placed By The Pioneers", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2024-12-11T21:26:17.7889540Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V0", "2024-12-11T21:26:17.7889540Z", "https://www.mountainproject.com/route/120038863/placed-by-the-pioneers" },
                    { 93, 0.0, 0.0, 0.0, "Tall Timber", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2024-12-11T21:26:17.7889650Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7889650Z", "https://www.mountainproject.com/route/120044477/tall-timber" },
                    { 94, 0.0, 0.0, 0.0, "Logger Rhythm", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2024-12-11T21:26:17.7889870Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V1", "2024-12-11T21:26:17.7889870Z", "https://www.mountainproject.com/route/120048363/logger-rhythm" },
                    { 95, 0.0, 0.0, 0.0, "Undercut", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2024-12-11T21:26:17.7889980Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V1+", "2024-12-11T21:26:17.7889980Z", "https://www.mountainproject.com/route/120719116/undercut" },
                    { 96, 0.0, 0.0, 0.0, "Loggers Lap", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2024-12-11T21:26:17.7890090Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V1-2", "2024-12-11T21:26:17.7890090Z", "https://www.mountainproject.com/route/120044482/loggers-lap" },
                    { 97, 0.0, 0.0, 0.0, "Spidey Dyno", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2024-12-11T21:26:17.7890200Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V2", "2024-12-11T21:26:17.7890200Z", "https://www.mountainproject.com/route/119282322/spidey-dyno" },
                    { 98, 0.0, 0.0, 0.0, "Unnamed", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2024-12-11T21:26:17.7890300Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V2", "2024-12-11T21:26:17.7890300Z", "https://www.mountainproject.com/route/120719166/unnamed" },
                    { 99, 0.0, 0.0, 0.0, "Stumpjumper", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-122.59067 47.79476)"), "2024-12-11T21:26:17.7890410Z", "Port Gamble Heritage Park > Olympics & Pacific Coast > Washington", 1, "V3+", "2024-12-11T21:26:17.7890410Z", "https://www.mountainproject.com/route/120065010/stumpjumper" },
                    { 100, 0.0, 0.0, 0.0, "Talk a Boat Easy", "Boulder", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-124.58668 47.87778)"), "2024-12-11T21:26:17.7890610Z", "Big Fat Beach boulder > La Push Beaches > Olympics & Pacific Coast > Washington", 1, "V0-", "2024-12-11T21:26:17.7890620Z", "https://www.mountainproject.com/route/109572402/talk-a-boat-easy" }
                });

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
                    { 105, "2024-11-05T13:00:00Z", "amazing", "2024-11-14T13:00:00Z" }
                });

            migrationBuilder.InsertData(
                table: "MapToTags",
                columns: new[] { "Id", "AssociatedAt", "MapId", "TagId" },
                values: new object[,]
                {
                    { 1, "2024-12-01T10:00:00Z", 101, 101 },
                    { 2, "2024-12-02T11:00:00Z", 102, 102 },
                    { 3, "2024-12-03T12:00:00Z", 103, 103 },
                    { 4, "2024-12-02T12:00:00Z", 104, 104 },
                    { 5, "2024-12-03T14:00:00Z", 101, 102 },
                    { 6, "2024-12-04T15:00:00Z", 105, 105 }
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
                name: "IX_MapToTags_MapId",
                table: "MapToTags",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_MapToUsers_MapId",
                table: "MapToUsers",
                column: "MapId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Climbs");

            migrationBuilder.DropTable(
                name: "Features");

            migrationBuilder.DropTable(
                name: "MapToTags");

            migrationBuilder.DropTable(
                name: "MapToUsers");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Maps");
        }
    }
}
