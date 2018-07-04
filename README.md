## Comments
* MongoDB is used for data persistance. 
* Service is listening on 'mongodb://localhost:27017' (configurable in appsettings.json)
* DB should be entitled 'TranslationsDB' (configurable in appsettings.json)
* Collection should be entitled 'Translations' (configurable in TranslationContext)
* Angular 4.2 is used for client-side code
* Unfortunatelly the provided helper API doesn't translate very well if the from text is with special characters even if encoded (tested with Postman).
* The API seems to be translating OK if letters are latin, thus the output is good even if there are special characters :)