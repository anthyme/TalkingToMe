using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Migrations
{
    public partial class BaseValuesQuizztoTalk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "QuizzToTalks",
                columns: new[] { "Id", "QuizzId", "TalkId" },
                values: new object[] { 1, 1, 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "QuizzToTalks",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
