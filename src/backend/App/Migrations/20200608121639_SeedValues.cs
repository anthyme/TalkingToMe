using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Migrations
{
    public partial class SeedValues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Quizz",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.InsertData(
              table: "Quizz",
              columns: new[] { "Id", "Name", "OwnerId" },
              values: new object[] { 1, "Test", 1 });

            migrationBuilder.DeleteData(
                table: "Sessions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.InsertData(
                table: "Sessions",
                columns: new[] { "Id", "EndDate", "StartDate", "TalkId", "groupId" },
                values: new object[] { 1, "01/01/2020 01:30:00", "01/01/2020 01:00:00", 1, "1" });

            migrationBuilder.DeleteData(
                table: "Talks",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.InsertData(
                table: "Talks",
                columns: new[] { "Id", "Description", "Name", "OwnerId", "Url" },
                values: new object[] { 1, "Test", "Test", 1, null });

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "DisplayName", "Email", "ExternalId", "Service", "UserId" },
                values: new object[] { 1, null, null, "0", "Google", 1 });

            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "Id", "CorrectAn", "Quest", "QuizzId", "Type" },
                values: new object[] { 1, "Test", "Test", 1, "UCQ" });
            
            migrationBuilder.DeleteData(
                table: "SessionToQuizzes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.InsertData(
                table: "SessionToQuizzes",
                columns: new[] { "Id", "QuizzId", "SessionId" },
                values: new object[] { 1, 1, 1 });

            migrationBuilder.DeleteData(
                table: "UserQuestions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.InsertData(
                table: "UserQuestions",
                columns: new[] { "Id", "Date", "Question", "SessionId", "Upvotes", "Username" },
                values: new object[] { 1, null, "Test", 1, 1, "Anonymous" });
            
            migrationBuilder.DeleteData(
               table: "Answers",
               keyColumn: "Id",
               keyValue: 1);

            migrationBuilder.InsertData(
                table: "Answers",
                columns: new[] { "Id", "QuestionId", "Response" },
                values: new object[] { 1, 1, "Test" });
            
            migrationBuilder.DeleteData(
                table: "Answers",
                keyColumn: "Id",
                keyValue: 2);
            
            migrationBuilder.InsertData(
                table: "Answers",
                columns: new[] { "Id", "QuestionId", "Response" },
                values: new object[] { 2, 1, "Test2" });

            migrationBuilder.DeleteData(
                table: "UserAnswers",
                keyColumn: "Id",
                keyValue: 1);
            
            migrationBuilder.InsertData(
                table: "UserAnswers",
                columns: new[] { "Id", "Count", "QuestionId", "Response", "SessionId" },
                values: new object[] { 1, 1, 1, "Test", 1 });

            migrationBuilder.DeleteData(
               table: "QuizzToTalks",
               keyColumn: "Id",
               keyValue: 1);

            migrationBuilder.InsertData(
               table: "QuizzToTalks",
               columns: new[] { "Id", "QuizzId", "TalkId" },
               values: new object[] { 1, 1, 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
          

        }
    }
}
