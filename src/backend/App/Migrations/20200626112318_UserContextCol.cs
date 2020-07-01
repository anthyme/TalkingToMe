using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Migrations
{
    public partial class UserContextCol : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserContext",
                table: "UserQuestions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserContext",
                table: "UserQuestions");
        }
    }
}
