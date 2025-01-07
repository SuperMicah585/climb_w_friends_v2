using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClimbWithFriendsAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddMapIdToActivityLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MapId",
                table: "ActivityLogs",
                type: "integer",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9154384Z", "2025-01-07T19:18:27.9158586Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9160479Z", "2025-01-07T19:18:27.9160484Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9160641Z", "2025-01-07T19:18:27.9160642Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9160705Z", "2025-01-07T19:18:27.9160706Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9160763Z", "2025-01-07T19:18:27.9160763Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9160823Z", "2025-01-07T19:18:27.9160824Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9160882Z", "2025-01-07T19:18:27.9160883Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9160942Z", "2025-01-07T19:18:27.9160943Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9161054Z", "2025-01-07T19:18:27.9161054Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9161124Z", "2025-01-07T19:18:27.9161124Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 11,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9161183Z", "2025-01-07T19:18:27.9161184Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 12,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9161243Z", "2025-01-07T19:18:27.9161243Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 13,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9161302Z", "2025-01-07T19:18:27.9161302Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 14,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9161362Z", "2025-01-07T19:18:27.9161391Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 15,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9161455Z", "2025-01-07T19:18:27.9161456Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 16,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9161767Z", "2025-01-07T19:18:27.9161767Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 17,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9161830Z", "2025-01-07T19:18:27.9161831Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 18,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9161892Z", "2025-01-07T19:18:27.9161893Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 19,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9161951Z", "2025-01-07T19:18:27.9161952Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 20,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9162152Z", "2025-01-07T19:18:27.9162154Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 21,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9162215Z", "2025-01-07T19:18:27.9162215Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 22,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9162276Z", "2025-01-07T19:18:27.9162276Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 23,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9162334Z", "2025-01-07T19:18:27.9162335Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 24,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9162391Z", "2025-01-07T19:18:27.9162392Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 25,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9162477Z", "2025-01-07T19:18:27.9162477Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 26,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9162538Z", "2025-01-07T19:18:27.9162539Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 27,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9162597Z", "2025-01-07T19:18:27.9162598Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 28,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9162662Z", "2025-01-07T19:18:27.9162662Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 29,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9162723Z", "2025-01-07T19:18:27.9162723Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 30,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9162779Z", "2025-01-07T19:18:27.9162780Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 31,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9162854Z", "2025-01-07T19:18:27.9162854Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 32,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9162965Z", "2025-01-07T19:18:27.9162966Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 33,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9163022Z", "2025-01-07T19:18:27.9163023Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 34,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9163084Z", "2025-01-07T19:18:27.9163085Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 35,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9163142Z", "2025-01-07T19:18:27.9163143Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 36,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9163242Z", "2025-01-07T19:18:27.9163242Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 37,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9163309Z", "2025-01-07T19:18:27.9163310Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 38,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9163385Z", "2025-01-07T19:18:27.9163385Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 39,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9163460Z", "2025-01-07T19:18:27.9163461Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 40,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9163532Z", "2025-01-07T19:18:27.9163533Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 41,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9163605Z", "2025-01-07T19:18:27.9163606Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 42,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9163727Z", "2025-01-07T19:18:27.9163728Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 43,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9163804Z", "2025-01-07T19:18:27.9163805Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 44,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9163892Z", "2025-01-07T19:18:27.9163893Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 45,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9163963Z", "2025-01-07T19:18:27.9163963Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 46,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9164031Z", "2025-01-07T19:18:27.9164032Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 47,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9164140Z", "2025-01-07T19:18:27.9164141Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 48,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9164252Z", "2025-01-07T19:18:27.9164252Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 49,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9164326Z", "2025-01-07T19:18:27.9164327Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 50,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9164400Z", "2025-01-07T19:18:27.9164401Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 51,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9164475Z", "2025-01-07T19:18:27.9164475Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 52,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9164549Z", "2025-01-07T19:18:27.9164549Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 53,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9164654Z", "2025-01-07T19:18:27.9164655Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 54,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9164715Z", "2025-01-07T19:18:27.9164716Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 55,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9164772Z", "2025-01-07T19:18:27.9164772Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 56,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9164827Z", "2025-01-07T19:18:27.9164828Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 57,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9164883Z", "2025-01-07T19:18:27.9164884Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 58,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9164945Z", "2025-01-07T19:18:27.9164946Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 59,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9165041Z", "2025-01-07T19:18:27.9165041Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 60,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9165110Z", "2025-01-07T19:18:27.9165110Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 61,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9165173Z", "2025-01-07T19:18:27.9165173Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 62,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9165233Z", "2025-01-07T19:18:27.9165234Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 63,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9165290Z", "2025-01-07T19:18:27.9165291Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 64,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9165351Z", "2025-01-07T19:18:27.9165351Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 65,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9165444Z", "2025-01-07T19:18:27.9165445Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 66,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9165507Z", "2025-01-07T19:18:27.9165507Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 67,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9165595Z", "2025-01-07T19:18:27.9165596Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 68,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9165658Z", "2025-01-07T19:18:27.9165659Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 69,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9165719Z", "2025-01-07T19:18:27.9165720Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 70,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9165780Z", "2025-01-07T19:18:27.9165781Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 71,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9165875Z", "2025-01-07T19:18:27.9165876Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 72,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9165943Z", "2025-01-07T19:18:27.9165944Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 73,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9166007Z", "2025-01-07T19:18:27.9166008Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 74,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9166067Z", "2025-01-07T19:18:27.9166067Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 75,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9166127Z", "2025-01-07T19:18:27.9166127Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 76,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9166185Z", "2025-01-07T19:18:27.9166185Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 77,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9166268Z", "2025-01-07T19:18:27.9166269Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 78,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9166324Z", "2025-01-07T19:18:27.9166325Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 79,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9166378Z", "2025-01-07T19:18:27.9166379Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 80,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9166505Z", "2025-01-07T19:18:27.9166507Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 81,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9166561Z", "2025-01-07T19:18:27.9166561Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 82,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9166606Z", "2025-01-07T19:18:27.9166606Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 83,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9166674Z", "2025-01-07T19:18:27.9166675Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 84,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9166725Z", "2025-01-07T19:18:27.9166726Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 85,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9166772Z", "2025-01-07T19:18:27.9166773Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 86,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9166819Z", "2025-01-07T19:18:27.9166819Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 87,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9166865Z", "2025-01-07T19:18:27.9166865Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 88,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9167692Z", "2025-01-07T19:18:27.9167695Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 89,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9167794Z", "2025-01-07T19:18:27.9167795Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 90,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9167845Z", "2025-01-07T19:18:27.9167846Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 91,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9167894Z", "2025-01-07T19:18:27.9167895Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 92,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9167948Z", "2025-01-07T19:18:27.9167949Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 93,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9167994Z", "2025-01-07T19:18:27.9167995Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 94,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9168042Z", "2025-01-07T19:18:27.9168042Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 95,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9168128Z", "2025-01-07T19:18:27.9168128Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 96,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9168175Z", "2025-01-07T19:18:27.9168175Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 97,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9168219Z", "2025-01-07T19:18:27.9168220Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 98,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9168262Z", "2025-01-07T19:18:27.9168263Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 99,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9168307Z", "2025-01-07T19:18:27.9168308Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 100,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-07T19:18:27.9169212Z", "2025-01-07T19:18:27.9169212Z" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MapId",
                table: "ActivityLogs");

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0436720Z", "2025-01-03T18:35:21.0440152Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0442004Z", "2025-01-03T18:35:21.0442010Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0442136Z", "2025-01-03T18:35:21.0442137Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0442196Z", "2025-01-03T18:35:21.0442197Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0442253Z", "2025-01-03T18:35:21.0442253Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0442312Z", "2025-01-03T18:35:21.0442313Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0442371Z", "2025-01-03T18:35:21.0442550Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0442661Z", "2025-01-03T18:35:21.0442662Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0442722Z", "2025-01-03T18:35:21.0442722Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0442793Z", "2025-01-03T18:35:21.0442793Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 11,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0442851Z", "2025-01-03T18:35:21.0442852Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 12,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0442912Z", "2025-01-03T18:35:21.0442913Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 13,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0443010Z", "2025-01-03T18:35:21.0443011Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 14,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0443939Z", "2025-01-03T18:35:21.0443955Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 15,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0444128Z", "2025-01-03T18:35:21.0444132Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 16,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0444689Z", "2025-01-03T18:35:21.0444695Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 17,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0444820Z", "2025-01-03T18:35:21.0444823Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 18,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0445415Z", "2025-01-03T18:35:21.0445426Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 19,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0445599Z", "2025-01-03T18:35:21.0445603Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 20,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0445731Z", "2025-01-03T18:35:21.0445734Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 21,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0445848Z", "2025-01-03T18:35:21.0445851Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 22,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0445966Z", "2025-01-03T18:35:21.0445969Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 23,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0446079Z", "2025-01-03T18:35:21.0446082Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 24,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0446267Z", "2025-01-03T18:35:21.0446271Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 25,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0446383Z", "2025-01-03T18:35:21.0446386Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 26,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0446498Z", "2025-01-03T18:35:21.0446500Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 27,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0446750Z", "2025-01-03T18:35:21.0446759Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 28,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0446835Z", "2025-01-03T18:35:21.0446836Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 29,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0447378Z", "2025-01-03T18:35:21.0447381Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 30,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0447442Z", "2025-01-03T18:35:21.0447443Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 31,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0447501Z", "2025-01-03T18:35:21.0447501Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 32,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0447703Z", "2025-01-03T18:35:21.0447704Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 33,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0447761Z", "2025-01-03T18:35:21.0447761Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 34,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0447827Z", "2025-01-03T18:35:21.0447827Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 35,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0447942Z", "2025-01-03T18:35:21.0447942Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 36,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0447997Z", "2025-01-03T18:35:21.0447998Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 37,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0448070Z", "2025-01-03T18:35:21.0448071Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 38,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0448151Z", "2025-01-03T18:35:21.0448152Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 39,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0448230Z", "2025-01-03T18:35:21.0448230Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 40,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0448349Z", "2025-01-03T18:35:21.0448349Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 41,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0448426Z", "2025-01-03T18:35:21.0448427Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 42,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0448498Z", "2025-01-03T18:35:21.0448498Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 43,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0448570Z", "2025-01-03T18:35:21.0448571Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 44,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0448642Z", "2025-01-03T18:35:21.0448642Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 45,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0448714Z", "2025-01-03T18:35:21.0448714Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 46,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0448816Z", "2025-01-03T18:35:21.0448816Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 47,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0448983Z", "2025-01-03T18:35:21.0448985Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 48,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0449107Z", "2025-01-03T18:35:21.0449107Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 49,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0449180Z", "2025-01-03T18:35:21.0449180Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 50,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0449250Z", "2025-01-03T18:35:21.0449251Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 51,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0449323Z", "2025-01-03T18:35:21.0449323Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 52,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0449427Z", "2025-01-03T18:35:21.0449428Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 53,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0449505Z", "2025-01-03T18:35:21.0449506Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 54,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0449566Z", "2025-01-03T18:35:21.0449567Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 55,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0449624Z", "2025-01-03T18:35:21.0449625Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 56,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0449679Z", "2025-01-03T18:35:21.0449680Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 57,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0449734Z", "2025-01-03T18:35:21.0449735Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 58,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0449827Z", "2025-01-03T18:35:21.0449828Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 59,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0449894Z", "2025-01-03T18:35:21.0449895Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 60,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0449960Z", "2025-01-03T18:35:21.0449960Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 61,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0450025Z", "2025-01-03T18:35:21.0450026Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 62,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0450086Z", "2025-01-03T18:35:21.0450087Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 63,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0450148Z", "2025-01-03T18:35:21.0450149Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 64,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0450239Z", "2025-01-03T18:35:21.0450240Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 65,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0450304Z", "2025-01-03T18:35:21.0450305Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 66,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0450367Z", "2025-01-03T18:35:21.0450368Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 67,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0450460Z", "2025-01-03T18:35:21.0450461Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 68,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0450523Z", "2025-01-03T18:35:21.0450524Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 69,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0450617Z", "2025-01-03T18:35:21.0450617Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 70,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0450679Z", "2025-01-03T18:35:21.0450680Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 71,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0450744Z", "2025-01-03T18:35:21.0450744Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 72,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0450813Z", "2025-01-03T18:35:21.0450813Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 73,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0450875Z", "2025-01-03T18:35:21.0450876Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 74,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0450937Z", "2025-01-03T18:35:21.0450937Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 75,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0451016Z", "2025-01-03T18:35:21.0451017Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 76,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0451075Z", "2025-01-03T18:35:21.0451075Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 77,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0451130Z", "2025-01-03T18:35:21.0451131Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 78,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0451184Z", "2025-01-03T18:35:21.0451184Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 79,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0451241Z", "2025-01-03T18:35:21.0451242Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 80,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0451295Z", "2025-01-03T18:35:21.0451296Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 81,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0451387Z", "2025-01-03T18:35:21.0451387Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 82,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0451437Z", "2025-01-03T18:35:21.0451438Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 83,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0451490Z", "2025-01-03T18:35:21.0451490Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 84,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0451536Z", "2025-01-03T18:35:21.0451536Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 85,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0451583Z", "2025-01-03T18:35:21.0451584Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 86,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0451636Z", "2025-01-03T18:35:21.0451636Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 87,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0451722Z", "2025-01-03T18:35:21.0451722Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 88,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0452289Z", "2025-01-03T18:35:21.0452292Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 89,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0452347Z", "2025-01-03T18:35:21.0452347Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 90,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0452394Z", "2025-01-03T18:35:21.0452395Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 91,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0452445Z", "2025-01-03T18:35:21.0452445Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 92,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0452497Z", "2025-01-03T18:35:21.0452498Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 93,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0452577Z", "2025-01-03T18:35:21.0452577Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 94,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0452624Z", "2025-01-03T18:35:21.0452625Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 95,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0452669Z", "2025-01-03T18:35:21.0452670Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 96,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0452714Z", "2025-01-03T18:35:21.0452715Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 97,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0452760Z", "2025-01-03T18:35:21.0452761Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 98,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0452804Z", "2025-01-03T18:35:21.0452804Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 99,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0452879Z", "2025-01-03T18:35:21.0452880Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 100,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-03T18:35:21.0453893Z", "2025-01-03T18:35:21.0453894Z" });
        }
    }
}
