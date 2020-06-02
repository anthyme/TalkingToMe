namespace App.TalkCreation.Models
{
    public class UserAnswer
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
        public string Response { get; set; }
        public int Count { get; set; }
        public int SessionId { get; set; }
        public Session Session { get; set; }
    }
}
