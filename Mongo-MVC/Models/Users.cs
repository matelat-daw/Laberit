using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoTest.Models
{
    public class Users
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string nombre { get; set; } = null!;

        public string email { get; set; } = null!;

        public int edad { get; set; }
    }
}