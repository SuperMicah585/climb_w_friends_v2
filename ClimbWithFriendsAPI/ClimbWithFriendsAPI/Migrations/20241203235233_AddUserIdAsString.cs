using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClimbWithFriendsAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdAsString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MapToUsers",
                table: "MapToUsers");

            migrationBuilder.RenameTable(
                name: "MapToUsers",
                newName: "MapToUsers");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "MapToUsers",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MapToUsers",
                table: "MapToUsers",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2024-12-03T23:52:31.6057380Z", "2024-12-03T23:52:31.6057410Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2024-12-03T23:52:31.6057420Z", "2024-12-03T23:52:31.6057430Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2024-12-03T23:52:31.6057440Z", "2024-12-03T23:52:31.6057440Z" });

            migrationBuilder.UpdateData(
                table: "MapToUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserId",
                value: "google-oauth2|100195696035167038572");

            migrationBuilder.UpdateData(
                table: "MapToUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserId",
                value: "google-oauth2|100195696035167038572");

            migrationBuilder.UpdateData(
                table: "MapToUsers",
                keyColumn: "Id",
                keyValue: 3,
                column: "UserId",
                value: "google-oauth2|100195696035167038572");

            migrationBuilder.UpdateData(
                table: "MapToUsers",
                keyColumn: "Id",
                keyValue: 4,
                column: "UserId",
                value: "google-oauth2|112911737438637748824");

            migrationBuilder.UpdateData(
                table: "MapToUsers",
                keyColumn: "Id",
                keyValue: 5,
                column: "UserId",
                value: "google-oauth2|112911737438637748824");

            migrationBuilder.UpdateData(
                table: "MapToUsers",
                keyColumn: "Id",
                keyValue: 6,
                column: "UserId",
                value: "google-oauth2|112911737438637748824");

            migrationBuilder.CreateIndex(
                name: "IX_MapToUsers_MapId",
                table: "MapToUsers",
                column: "MapId");

            migrationBuilder.AddForeignKey(
                name: "FK_MapToUsers_Maps_MapId",
                table: "MapToUsers",
                column: "MapId",
                principalTable: "Maps",
                principalColumn: "MapId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MapToUsers_Maps_MapId",
                table: "MapToUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MapToUsers",
                table: "MapToUsers");

            migrationBuilder.DropIndex(
                name: "IX_MapToUsers_MapId",
                table: "MapToUsers");

            migrationBuilder.RenameTable(
                name: "MapToUsers",
                newName: "MapToUsers");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "MapToUsers",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MapToUsers",
                table: "MapToUsers",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2024-12-03T17:35:00.7264441Z", "2024-12-03T17:35:00.7264458Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2024-12-03T17:35:00.7264465Z", "2024-12-03T17:35:00.7264466Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2024-12-03T17:35:00.7264470Z", "2024-12-03T17:35:00.7264471Z" });

            migrationBuilder.UpdateData(
                table: "MapToUsers",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserId",
                value: 201);

            migrationBuilder.UpdateData(
                table: "MapToUsers",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserId",
                value: 201);

            migrationBuilder.UpdateData(
                table: "MapToUsers",
                keyColumn: "Id",
                keyValue: 3,
                column: "UserId",
                value: 201);

            migrationBuilder.UpdateData(
                table: "MapToUsers",
                keyColumn: "Id",
                keyValue: 4,
                column: "UserId",
                value: 202);

            migrationBuilder.UpdateData(
                table: "MapToUsers",
                keyColumn: "Id",
                keyValue: 5,
                column: "UserId",
                value: 203);

            migrationBuilder.UpdateData(
                table: "MapToUsers",
                keyColumn: "Id",
                keyValue: 6,
                column: "UserId",
                value: 203);
        }
    }
}
