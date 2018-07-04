using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Translation.Website.Models;
using Translation.Website.Repository;

namespace Translation.Website.Controllers
{
    [Route("api/[controller]")]
    public class TranslationController : Controller
    {
        private readonly ITranslationRepository _translationRepository;

        public TranslationController(ITranslationRepository translationRepository)
        {
            _translationRepository = translationRepository;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Get([FromQuery]Record translation)
        {
            translation.Result = Translator
                .Translate(translation.From, translation.To, translation.Text)
                .Result;

            translation.Date = DateTime.Now.ToString("d");
            translation.From = Languages.All[int.Parse(translation.From)].Key;
            translation.To = Languages.All[int.Parse(translation.To)].Key;

            await _translationRepository.Create(translation);
            return new OkObjectResult(translation.Result);
        }
    }
}
