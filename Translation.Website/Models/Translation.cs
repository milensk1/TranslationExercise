using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Translation.Website.Models
{
    public class Record
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string Date { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Text { get; set; }
        public string Result { get; set; }
    }
}
