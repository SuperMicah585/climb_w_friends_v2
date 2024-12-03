using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClimbWithFriendsAPI.Migrations
{
    /// <inheritdoc />
    public partial class updatepointtypeinseed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2024-11-19T18:25:39.0582722Z", "2024-11-19T18:25:39.0582744Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2024-11-19T18:25:39.0582748Z", "2024-11-19T18:25:39.0582749Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2024-11-19T18:25:39.0582752Z", "2024-11-19T18:25:39.0582753Z" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
