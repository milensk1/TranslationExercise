using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using Translation.Website.Data;
using Translation.Website.Models;

namespace Translation.Website.Repository
{
    public class TranslationRepository : ITranslationRepository
    {
        private readonly ITranslationContext _context;

        public TranslationRepository(ITranslationContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Record>> GetAllTranslations()
        {
            return await _context
            .Translations
            .Find(_ => true)
            .ToListAsync();
        }

        public async Task Create(Record translation)
        {
            await _context.Translations.InsertOneAsync(translation);
        }
    }
}
