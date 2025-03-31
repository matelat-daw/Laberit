using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoTest.Models;

namespace MongoTest.Services
{
    public class UsersService
    {
        private readonly IMongoCollection<Users> _usersCollection;

        public UsersService(
        IOptions<MongoConnection> mongoConnection)
        {
            var mongoClient = new MongoClient(
                mongoConnection.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                mongoConnection.Value.DatabaseName);

            _usersCollection = mongoDatabase.GetCollection<Users>(
                mongoConnection.Value.UsersCollectionName);
        }

        public async Task<List<Users>> GetAsync() =>
        await _usersCollection.Find(_ => true).SortBy(e => e.email).ToListAsync();

        public async Task<Users?> GetAsync(string id) =>
            await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Users newUser) =>
            await _usersCollection.InsertOneAsync(newUser);

        public async Task UpdateAsync(string id, Users updatedUser) =>
            await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);

        public async Task RemoveAsync(string id) =>
            await _usersCollection.DeleteOneAsync(x => x.Id == id);
    }
}