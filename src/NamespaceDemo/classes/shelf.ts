import { IShelfItem } from '../interfaces';

export default class <T extends IShelfItem> {
    private _items: T[];

    constructor() {
        this._items = [];
    }

    add(item: T): void {
        this._items.push(item);
    }

    getFirst(): T {
        return this._items[0];
    }

    find(title: string): T {
        return this._items.find(item => item.title === title);
    }

    printTitles(): void {
        this._items.forEach(item => console.log(item.title));
    }

}

