using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Migrations
{
    public partial class SeedValuesAndBaseDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Quizz",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quizz", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartDate = table.Column<string>(nullable: true),
                    EndDate = table.Column<string>(nullable: true),
                    groupId = table.Column<string>(nullable: true),
                    TalkId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Talks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Talks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(nullable: true),
                    DisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    ExternalId = table.Column<string>(nullable: true),
                    Service = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuizzId = table.Column<int>(nullable: false),
                    Quest = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    CorrectAn = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questions_Quizz_QuizzId",
                        column: x => x.QuizzId,
                        principalTable: "Quizz",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SessionToQuizzes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuizzId = table.Column<int>(nullable: false),
                    SessionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionToQuizzes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SessionToQuizzes_Quizz_QuizzId",
                        column: x => x.QuizzId,
                        principalTable: "Quizz",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SessionToQuizzes_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserQuestions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(nullable: true),
                    Question = table.Column<string>(nullable: true),
                    Upvotes = table.Column<int>(nullable: false),
                    SessionId = table.Column<int>(nullable: false),
                    Date = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserQuestions_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "QuizzToTalks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TalkId = table.Column<int>(nullable: false),
                    QuizzId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuizzToTalks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuizzToTalks_Quizz_QuizzId",
                        column: x => x.QuizzId,
                        principalTable: "Quizz",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuizzToTalks_Talks_TalkId",
                        column: x => x.TalkId,
                        principalTable: "Talks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionId = table.Column<int>(nullable: false),
                    Response = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Answers_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionId = table.Column<int>(nullable: false),
                    Response = table.Column<string>(nullable: true),
                    Count = table.Column<int>(nullable: false),
                    SessionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserAnswers_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAnswers_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Quizz",
                columns: new[] { "Id", "Name", "OwnerId" },
                values: new object[] { 1, "Test", 1 });

            migrationBuilder.InsertData(
                table: "Sessions",
                columns: new[] { "Id", "EndDate", "StartDate", "TalkId", "groupId" },
                values: new object[] { 1, "01/01/2020 01:30:00", "01/01/2020 01:00:00", 1, "1" });

            migrationBuilder.InsertData(
                table: "Talks",
                columns: new[] { "Id", "Description", "Name", "OwnerId", "Url" },
                values: new object[] { 1, "Test", "Test", 1, null });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DisplayName", "Email", "ExternalId", "Service", "UserId" },
                values: new object[] { 1, null, null, "0", "Google", 1 });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "CorrectAn", "Quest", "QuizzId", "Type" },
                values: new object[] { 1, "Test", "Test", 1, "UCQ" });

            migrationBuilder.InsertData(
                table: "QuizzToTalks",
                columns: new[] { "Id", "QuizzId", "TalkId" },
                values: new object[] { 1, 1, 1 });

            migrationBuilder.InsertData(
                table: "SessionToQuizzes",
                columns: new[] { "Id", "QuizzId", "SessionId" },
                values: new object[] { 1, 1, 1 });

            migrationBuilder.InsertData(
                table: "UserQuestions",
                columns: new[] { "Id", "Date", "Question", "SessionId", "Upvotes", "Username" },
                values: new object[] { 1, null, "Test", 1, 1, "Anonymous" });

            migrationBuilder.InsertData(
                table: "Answers",
                columns: new[] { "Id", "QuestionId", "Response" },
                values: new object[] { 1, 1, "Test" });

            migrationBuilder.InsertData(
                table: "Answers",
                columns: new[] { "Id", "QuestionId", "Response" },
                values: new object[] { 2, 1, "Test2" });

            migrationBuilder.InsertData(
                table: "UserAnswers",
                columns: new[] { "Id", "Count", "QuestionId", "Response", "SessionId" },
                values: new object[] { 1, 1, 1, "Test", 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionId",
                table: "Answers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_QuizzId",
                table: "Questions",
                column: "QuizzId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizzToTalks_QuizzId",
                table: "QuizzToTalks",
                column: "QuizzId");

            migrationBuilder.CreateIndex(
                name: "IX_QuizzToTalks_TalkId",
                table: "QuizzToTalks",
                column: "TalkId");

            migrationBuilder.CreateIndex(
                name: "IX_SessionToQuizzes_QuizzId",
                table: "SessionToQuizzes",
                column: "QuizzId");

            migrationBuilder.CreateIndex(
                name: "IX_SessionToQuizzes_SessionId",
                table: "SessionToQuizzes",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswers_QuestionId",
                table: "UserAnswers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAnswers_SessionId",
                table: "UserAnswers",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserQuestions_SessionId",
                table: "UserQuestions",
                column: "SessionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "QuizzToTalks");

            migrationBuilder.DropTable(
                name: "SessionToQuizzes");

            migrationBuilder.DropTable(
                name: "UserAnswers");

            migrationBuilder.DropTable(
                name: "UserQuestions");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Talks");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.DropTable(
                name: "Quizz");
        }
    }
}
