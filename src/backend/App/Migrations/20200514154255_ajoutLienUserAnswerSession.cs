﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Migrations
{
    public partial class ajoutLienUserAnswerSession : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SessionId",
                table: "UserAnswers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswers_SessionId",
                table: "UserAnswers",
                column: "SessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAnswers_Sessions_SessionId",
                table: "UserAnswers",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAnswers_Sessions_SessionId",
                table: "UserAnswers");

            migrationBuilder.DropIndex(
                name: "IX_UserAnswers_SessionId",
                table: "UserAnswers");

            migrationBuilder.DropColumn(
                name: "SessionId",
                table: "UserAnswers");
        }
    }
}
