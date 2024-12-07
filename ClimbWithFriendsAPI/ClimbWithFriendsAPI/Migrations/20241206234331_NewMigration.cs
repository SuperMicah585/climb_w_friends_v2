using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ClimbWithFriendsAPI.Migrations
{
    /// <inheritdoc />
    public partial class NewMigration : Migration
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
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    CreatedAt = table.Column<string>(type: "text", nullable: false),
                    UpdatedAt = table.Column<string>(type: "text", nullable: false)
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
                columns: new[] { "ClimbId", "ClimbName", "ClimbType", "Coordinates", "CreatedAt", "Description", "Location", "Pitches", "Rating", "UpdatedAt", "Url" },
                values: new object[,]
                {
                    { 1, "El Capitan", "Trad,Big Wall", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-119.638 37.733)"), "2024-12-06T23:43:30.2346390Z", "One of the most iconic climbs in the world.", "Yosemite National Park", 30, "5.12d", "2024-12-06T23:43:30.2346420Z", "https://www.example.com/el-capitan" },
                    { 2, "The Nose", "Trad,Big Wall", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-119.638 37.733)"), "2024-12-06T23:43:30.2346430Z", "A legendary climb with a rich history.", "Yosemite National Park", 31, "5.14a", "2024-12-06T23:43:30.2346430Z", "https://www.example.com/the-nose" },
                    { 3, "Moonlight Buttress", "Trad", (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-113.026 37.274)"), "2024-12-06T23:43:30.2346440Z", "A stunning climb up a sandstone wall.", "Zion National Park", 9, "5.12d", "2024-12-06T23:43:30.2346450Z", "https://www.example.com/moonlight-buttress" }
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
                name: "MapToUsers");

            migrationBuilder.DropTable(
                name: "Maps");
        }
    }
}
