using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Translation.Website.Models;

namespace Translation.Website.Data
{
    public class TranslationContext : ITranslationContext
    {
        private readonly IMongoDatabase _db;

        public TranslationContext(IOptions<Settings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            _db = client.GetDatabase(options.Value.Database);
        }
        public IMongoCollection<Record> Translations => _db.GetCollection<Record>("Translations");
    }
}
