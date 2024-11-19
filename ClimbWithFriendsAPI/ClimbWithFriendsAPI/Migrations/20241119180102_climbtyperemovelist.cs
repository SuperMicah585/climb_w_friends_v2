using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClimbWithFriendsAPI.Migrations
{
    /// <inheritdoc />
    public partial class climbtyperemovelist : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 1,
                columns: new[] { "ClimbType", "CreatedAt", "UpdatedAt" },
                values: new object[] { "Trad,Big Wall", "2024-11-19T18:01:02.0026978Z", "2024-11-19T18:01:02.0026999Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 2,
                columns: new[] { "ClimbType", "CreatedAt", "UpdatedAt" },
                values: new object[] { "Trad,Big Wall", "2024-11-19T18:01:02.0027009Z", "2024-11-19T18:01:02.0027010Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 3,
                columns: new[] { "ClimbType", "CreatedAt", "UpdatedAt" },
                values: new object[] { "Trad", "2024-11-19T18:01:02.0027016Z", "2024-11-19T18:01:02.0027017Z" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 1,
                columns: new[] { "ClimbType", "CreatedAt", "UpdatedAt" },
                values: new object[] { "[\"Trad\",\"Big Wall\"]", "2024-11-19T17:55:27.8321224Z", "2024-11-19T17:55:27.8321244Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 2,
                columns: new[] { "ClimbType", "CreatedAt", "UpdatedAt" },
                values: new object[] { "[\"Trad\",\"Big Wall\"]", "2024-11-19T17:55:27.8321258Z", "2024-11-19T17:55:27.8321259Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 3,
                columns: new[] { "ClimbType", "CreatedAt", "UpdatedAt" },
                values: new object[] { "[\"Trad\"]", "2024-11-19T17:55:27.8321269Z", "2024-11-19T17:55:27.8321270Z" });
        }
    }
}
