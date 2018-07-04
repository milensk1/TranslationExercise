using MongoDB.Driver;
using Translation.Website.Models;

namespace Translation.Website.Data
{
    public interface ITranslationContext
    {
        IMongoCollection<Record> Translations { get; }
    }
}
