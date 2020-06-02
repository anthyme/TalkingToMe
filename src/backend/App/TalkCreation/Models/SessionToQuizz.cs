namespace App.TalkCreation.Models
{
    public class SessionToQuizz
    {
        public int Id { get; set; }
        public int QuizzId { get; set; }
        public Quizz Quizz { get; set; }
        public int SessionId { get; set; }
        public Session Session { get; set; }
    }
}
