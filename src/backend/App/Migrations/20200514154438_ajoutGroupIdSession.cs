using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Migrations
{
    public partial class ajoutGroupIdSession : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "groupId",
                table: "Sessions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "groupId",
                table: "Sessions");
        }
    }
}
