using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Migrations
{
    public partial class SecondMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HelloWorldBase",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Message = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HelloWorldBase", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "HelloWorldBase",
                columns: new[] { "Id", "Message" },
                values: new object[] { 1, "HelloWorld!" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HelloWorldBase");
        }
    }
}
