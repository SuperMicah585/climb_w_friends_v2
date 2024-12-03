using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using NetTopologySuite.Geometries;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ClimbWithFriendsAPI.Migrations
{
    /// <inheritdoc />
    public partial class dbseed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Climbs",
                columns: new[] { "ClimbId", "ClimbName", "ClimbType", "Coordinates", "CreatedAt", "Description", "Location", "Pitches", "Rating", "UpdatedAt", "Url" },
                values: new object[,]
                {
                    { 1, "El Capitan", new List<string> { "Trad", "Big Wall" }, (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-119.638 37.733)"), "2024-11-19T17:46:40.3680057Z", "One of the most iconic climbs in the world.", "Yosemite National Park", 30, "5.12d", "2024-11-19T17:46:40.3680076Z", "https://www.example.com/el-capitan" },
                    { 2, "The Nose", new List<string> { "Trad", "Big Wall" }, (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-119.638 37.733)"), "2024-11-19T17:46:40.3680084Z", "A legendary climb with a rich history.", "Yosemite National Park", 31, "5.14a", "2024-11-19T17:46:40.3680085Z", "https://www.example.com/the-nose" },
                    { 3, "Moonlight Buttress", new List<string> { "Trad" }, (NetTopologySuite.Geometries.Point)new NetTopologySuite.IO.WKTReader().Read("SRID=4326;POINT (-113.026 37.274)"), "2024-11-19T17:46:40.3680089Z", "A stunning climb up a sandstone wall.", "Zion National Park", 9, "5.12d", "2024-11-19T17:46:40.3680090Z", "https://www.example.com/moonlight-buttress" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 3);
        }
    }
}
