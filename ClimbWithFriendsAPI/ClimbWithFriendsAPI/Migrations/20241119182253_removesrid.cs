using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClimbWithFriendsAPI.Migrations
{
    /// <inheritdoc />
    public partial class removesrid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2024-11-19T18:22:53.2126616Z", "2024-11-19T18:22:53.2126831Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2024-11-19T18:22:53.2126871Z", "2024-11-19T18:22:53.2127055Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2024-11-19T18:22:53.2127086Z", "2024-11-19T18:22:53.2127087Z" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2024-11-19T18:01:02.0026978Z", "2024-11-19T18:01:02.0026999Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2024-11-19T18:01:02.0027009Z", "2024-11-19T18:01:02.0027010Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2024-11-19T18:01:02.0027016Z", "2024-11-19T18:01:02.0027017Z" });
        }
    }
}
