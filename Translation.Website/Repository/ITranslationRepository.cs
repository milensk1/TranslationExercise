using System.Collections.Generic;
using System.Threading.Tasks;
using Translation.Website.Models;

namespace Translation.Website.Repository
{
    public interface ITranslationRepository
    {
        Task<IEnumerable<Record>> GetAllTranslations();
        Task Create(Record translation);
    }
}