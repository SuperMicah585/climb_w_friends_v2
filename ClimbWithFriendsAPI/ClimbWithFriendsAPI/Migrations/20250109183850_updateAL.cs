using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClimbWithFriendsAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateAL : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClimbId",
                table: "ActivityLogs",
                type: "integer",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2348892Z", "2025-01-09T18:38:49.2353429Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2356483Z", "2025-01-09T18:38:49.2356496Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2356654Z", "2025-01-09T18:38:49.2356655Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2356715Z", "2025-01-09T18:38:49.2356715Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2356772Z", "2025-01-09T18:38:49.2356773Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2356841Z", "2025-01-09T18:38:49.2356842Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2356900Z", "2025-01-09T18:38:49.2356900Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2357004Z", "2025-01-09T18:38:49.2357004Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2357063Z", "2025-01-09T18:38:49.2357064Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2357132Z", "2025-01-09T18:38:49.2357132Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 11,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2357192Z", "2025-01-09T18:38:49.2357192Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 12,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2357252Z", "2025-01-09T18:38:49.2357252Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 13,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2357338Z", "2025-01-09T18:38:49.2357338Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 14,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2357399Z", "2025-01-09T18:38:49.2357400Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 15,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2357463Z", "2025-01-09T18:38:49.2357464Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 16,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2357929Z", "2025-01-09T18:38:49.2357932Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 17,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2357997Z", "2025-01-09T18:38:49.2357998Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 18,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2358062Z", "2025-01-09T18:38:49.2358062Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 19,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2358148Z", "2025-01-09T18:38:49.2358149Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 20,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2358213Z", "2025-01-09T18:38:49.2358213Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 21,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2358272Z", "2025-01-09T18:38:49.2358272Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 22,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2358332Z", "2025-01-09T18:38:49.2358333Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 23,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2358390Z", "2025-01-09T18:38:49.2358390Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 24,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2358476Z", "2025-01-09T18:38:49.2358476Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 25,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2358534Z", "2025-01-09T18:38:49.2358535Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 26,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2358593Z", "2025-01-09T18:38:49.2358594Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 27,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2358652Z", "2025-01-09T18:38:49.2358652Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 28,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2358715Z", "2025-01-09T18:38:49.2358715Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 29,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2358776Z", "2025-01-09T18:38:49.2358777Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 30,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2358936Z", "2025-01-09T18:38:49.2358939Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 31,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2358995Z", "2025-01-09T18:38:49.2358996Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 32,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2359100Z", "2025-01-09T18:38:49.2359101Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 33,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2359158Z", "2025-01-09T18:38:49.2359158Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 34,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2359218Z", "2025-01-09T18:38:49.2359219Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 35,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2359336Z", "2025-01-09T18:38:49.2359336Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 36,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2359393Z", "2025-01-09T18:38:49.2359394Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 37,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2359462Z", "2025-01-09T18:38:49.2359463Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 38,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2359537Z", "2025-01-09T18:38:49.2359537Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 39,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2359611Z", "2025-01-09T18:38:49.2359612Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 40,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2359683Z", "2025-01-09T18:38:49.2359684Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 41,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2359792Z", "2025-01-09T18:38:49.2359793Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 42,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2359862Z", "2025-01-09T18:38:49.2359862Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 43,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2359934Z", "2025-01-09T18:38:49.2359934Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 44,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2360005Z", "2025-01-09T18:38:49.2360006Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 45,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2360077Z", "2025-01-09T18:38:49.2360078Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 46,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2360175Z", "2025-01-09T18:38:49.2360176Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 47,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2360246Z", "2025-01-09T18:38:49.2360246Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 48,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2360355Z", "2025-01-09T18:38:49.2360355Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 49,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2360432Z", "2025-01-09T18:38:49.2360432Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 50,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2360509Z", "2025-01-09T18:38:49.2360509Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 51,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2360585Z", "2025-01-09T18:38:49.2360586Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 52,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2360770Z", "2025-01-09T18:38:49.2360773Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 53,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2360850Z", "2025-01-09T18:38:49.2360851Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 54,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2360913Z", "2025-01-09T18:38:49.2360914Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 55,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2360973Z", "2025-01-09T18:38:49.2360973Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 56,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2361029Z", "2025-01-09T18:38:49.2361030Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 57,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2361083Z", "2025-01-09T18:38:49.2361084Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 58,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2361171Z", "2025-01-09T18:38:49.2361172Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 59,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2361235Z", "2025-01-09T18:38:49.2361236Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 60,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2361299Z", "2025-01-09T18:38:49.2361300Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 61,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2361365Z", "2025-01-09T18:38:49.2361365Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 62,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2361423Z", "2025-01-09T18:38:49.2361424Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 63,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2361483Z", "2025-01-09T18:38:49.2361484Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 64,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2361572Z", "2025-01-09T18:38:49.2361572Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 65,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2361638Z", "2025-01-09T18:38:49.2361639Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 66,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2361701Z", "2025-01-09T18:38:49.2361701Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 67,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2361798Z", "2025-01-09T18:38:49.2361799Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 68,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2361860Z", "2025-01-09T18:38:49.2361861Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 69,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2361946Z", "2025-01-09T18:38:49.2361946Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 70,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362010Z", "2025-01-09T18:38:49.2362010Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 71,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362071Z", "2025-01-09T18:38:49.2362072Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 72,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362137Z", "2025-01-09T18:38:49.2362138Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 73,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362199Z", "2025-01-09T18:38:49.2362199Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 74,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362259Z", "2025-01-09T18:38:49.2362259Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 75,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362336Z", "2025-01-09T18:38:49.2362336Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 76,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362394Z", "2025-01-09T18:38:49.2362395Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 77,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362447Z", "2025-01-09T18:38:49.2362448Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 78,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362500Z", "2025-01-09T18:38:49.2362500Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 79,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362555Z", "2025-01-09T18:38:49.2362555Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 80,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362609Z", "2025-01-09T18:38:49.2362610Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 81,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362699Z", "2025-01-09T18:38:49.2362700Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 82,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362749Z", "2025-01-09T18:38:49.2362750Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 83,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362800Z", "2025-01-09T18:38:49.2362801Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 84,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362847Z", "2025-01-09T18:38:49.2362847Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 85,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362890Z", "2025-01-09T18:38:49.2362891Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 86,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362938Z", "2025-01-09T18:38:49.2362938Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 87,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2362984Z", "2025-01-09T18:38:49.2363019Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 88,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2363504Z", "2025-01-09T18:38:49.2363507Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 89,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2363558Z", "2025-01-09T18:38:49.2363558Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 90,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2363604Z", "2025-01-09T18:38:49.2363605Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 91,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2363720Z", "2025-01-09T18:38:49.2363723Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 92,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2363772Z", "2025-01-09T18:38:49.2363773Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 93,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2363820Z", "2025-01-09T18:38:49.2363846Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 94,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2363892Z", "2025-01-09T18:38:49.2363892Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 95,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2363935Z", "2025-01-09T18:38:49.2363936Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 96,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2363979Z", "2025-01-09T18:38:49.2363980Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 97,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2364024Z", "2025-01-09T18:38:49.2364025Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 98,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2364068Z", "2025-01-09T18:38:49.2364068Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 99,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2364114Z", "2025-01-09T18:38:49.2364114Z" });

            migrationBuilder.UpdateData(
                table: "Climbs",
                keyColumn: "ClimbId",
                keyValue: 100,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { "2025-01-09T18:38:49.2365134Z", "2025-01-09T18:38:49.2365135Z" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClimbId",
                table: "ActivityLogs");

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
    }
}
