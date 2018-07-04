import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Language } from '../language';
import { LANGUAGES } from '../languages';

@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent  {

    public languages = LANGUAGES;

    @Input() title: string = '';
    @Input() rightaligned: string = '';
    @Output() onLanguageSelected = new EventEmitter<Language>();

    selectValue(selected: Language) {
        this.onLanguageSelected.emit(selected);
    }
}
