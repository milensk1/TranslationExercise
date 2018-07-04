import { Component, Inject } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Language } from '../language';

@Component({
    selector: 'translator',
    templateUrl: './translator.component.html'
})
export class TranslatorComponent {
    from: Language = { id: 0, name: 'From' };
    to: Language = { id: 0, name: 'To' };
    fromText: string = '';
    toText: string = '';
    rightaligned = "dropdown-menu-right";

    http: Http;
    baseUrl: string;
    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.http = http;
        this.baseUrl = baseUrl;
    }

    translateText() {
        let myParams = `?from=${this.from.id}&to=${this.to.id}&text=${this.fromText}`;

        this.http.get(this.baseUrl + 'api/Translation/Get' + myParams)
            .subscribe(result => {
                this.toText = result.text();
            }, error => console.error(error));

    }

    reverseLanguages() {
        if (this.from.id === 0) {
            this.from = this.to;
            this.to = { id: 0, name: 'To' };
        } else if (this.to.id === 0) {
            this.to = this.from;
            this.from = { id: 0, name: 'From' };
        } else {
            var temp = this.from;
            this.from = this.to;
            this.to = temp;
        }
    }

    setFrom(language: Language) {
        this.from.id = language.id
        this.from.name = language.name;
    }

    setTo(language: Language) {
        this.to.id = language.id
        this.to.name = language.name;
    }
}
