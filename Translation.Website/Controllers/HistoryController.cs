using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Translation.Website.Repository;

namespace Translation.Website.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class HistoryController : Controller
    {
        private readonly ITranslationRepository _translationRepository;

        public HistoryController(ITranslationRepository translationRepository)
        {
            _translationRepository = translationRepository;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Get()
        {
            var result = await _translationRepository.GetAllTranslations();
            return new ObjectResult(result);
        }
    }
}
