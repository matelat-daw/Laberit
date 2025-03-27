using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace MongoApi.Models
{
    public class Users
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("nombre")]
        [JsonPropertyName("nombre")]
        public string? Name { get; set; }
        [BsonElement("email")]
        [JsonPropertyName("email")]
        public string? Email { get; set; }
        public int edad { get; set; }
    }
}