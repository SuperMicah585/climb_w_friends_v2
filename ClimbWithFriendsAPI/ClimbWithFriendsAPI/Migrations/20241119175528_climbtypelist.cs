using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClimbWithFriendsAPI.Migrations
{
    /// <inheritdoc />
    public partial class climbtypelist : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ClimbType",
                table: "Climbs",
                type: "text",
                nullable: false,
                oldClrType: typeof(List<string>),
                oldType: "text[]");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<List<string>>(
                name: "ClimbType",
                table: "Climbs",
                type: "text[]",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 1,
                columns: new[] { "ClimbType", "CreatedAt", "UpdatedAt" },
                values: new object[] { new List<string> { "Trad", "Big Wall" }, "2024-11-19T17:46:40.3680057Z", "2024-11-19T17:46:40.3680076Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 2,
                columns: new[] { "ClimbType", "CreatedAt", "UpdatedAt" },
                values: new object[] { new List<string> { "Trad", "Big Wall" }, "2024-11-19T17:46:40.3680084Z", "2024-11-19T17:46:40.3680085Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 3,
                columns: new[] { "ClimbType", "CreatedAt", "UpdatedAt" },
                values: new object[] { new List<string> { "Trad" }, "2024-11-19T17:46:40.3680089Z", "2024-11-19T17:46:40.3680090Z" });
        }
    }
}
