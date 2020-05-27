using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Migrations
{
    public partial class ajoutTalkIdInSessions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TalkId",
                table: "Sessions",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TalkId",
                table: "Sessions");
        }
    }
}
