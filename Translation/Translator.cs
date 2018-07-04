using System.Net.Http;
using System.Threading.Tasks;

namespace Translation
{
    public static class Translator
    {
        private static readonly HttpClient client = new HttpClient();
        private static readonly string baseUrl = "http://localhost:8080";

        public static async Task<string> Translate(string from, string to, string text)
        {   
            var fromLanguage = Languages.All[int.Parse(from)].Value;
            var toLanguage = Languages.All[int.Parse(to)].Value;

            var url = baseUrl + $"?q={text}&from={fromLanguage}&to={toLanguage}";
            var stringTask = client.GetStringAsync(url);
            var translation = await stringTask as string;
            return translation;
        }
    }
}