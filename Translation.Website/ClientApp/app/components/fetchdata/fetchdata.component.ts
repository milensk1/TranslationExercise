import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public allTranslations: Translation[];
    public translations: Translation[];
    public items: number;

    pageState: Pages = {
        currentPage: 1,
        pages: []
    }

    glyphiconSortAsc = 'glyphicon-sort-by-attributes';
    glyphiconSortDesc = 'glyphicon-sort-by-attributes-alt';

    currentSort: Translation = {
        date: 'ASC',
        from: '',
        to: '',
        result: ''
    }

    sortIcons: Translation = {
        date: this.glyphiconSortAsc,
        from: '',
        to: '',
        result: ''
    }

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/History/Get').subscribe(result => {
            console.log(result.json());
            this.allTranslations = result.json() as Translation[];

            this.translations = this.allTranslations.slice(0, 5);
            this.items = this.allTranslations.length;
            this.pageState.pages = this.range(this.items / 5);
        }, error => console.error(error));
    }

    public sort(param: string) {
        let sortBy = '';
        if (this.currentSort[param] === 'ASC') {
            sortBy = 'DESC';
        } else {
            sortBy = 'ASC';
        }

        this.clearSort();
        this.currentSort[param] = sortBy;
        this.sortData(param, sortBy);
        this.updateSortIcons(param, sortBy);
    }

    public clearSort() {
        for (let param in this.currentSort) {
            this.currentSort[param] = '';
        }
    }

    public sortData(param: string, sortBy: string) {
        this.allTranslations.sort(function (a, b) {
            let propA: any;
            let propB: any;
            let correction = sortBy === 'ASC' ? 1 : -1;

            if (param != 'date') {
                propA = a[param];
                propB = b[param];
            } else {
                propA = Date.parse(a[param]);
                propB = Date.parse(b[param]);
            }
            if (propA < propB) {
                return -1 * correction;
            } else if (propA > propB) {
                return 1 * correction;
            }
            return 0;
        });

        this.updatePageData();
    }

    public updateSortIcons(param: string, sortBy: string) {
        for (let param in this.currentSort) {
            if (this.currentSort[param] === '') {
                this.sortIcons[param] = '';
            } else if (this.currentSort[param] === 'ASC') {
                this.sortIcons[param] = this.glyphiconSortAsc;
            } else {
                this.sortIcons[param] = this.glyphiconSortDesc;
            }
        }
    }

    public range(target: number) {
        let x = [];
        let i = 1;
        while (x.push(i++) < target) { };
        return x
    }

    public changePage(target: number) {
        if (target == -1 && this.pageState.currentPage > 1) {
            this.pageState.currentPage--;
        } else if (target == 0 && this.pageState.currentPage < this.pageState.pages.length) {
            this.pageState.currentPage++;
        } else if (target > 0) {
            this.pageState.currentPage = target;
        }

        this.updatePageData();
    }

    public updatePageData() {
        let start = this.pageState.currentPage * 5 - 5;
        let end = this.pageState.currentPage * 5;
        this.translations = this.allTranslations.slice(start, end);
    }
}

interface Translation {
    [date: string]: string;
    from: string;
    to: string;
    result: string;
}

interface Pages {
    currentPage: number;
    pages: number[];
}