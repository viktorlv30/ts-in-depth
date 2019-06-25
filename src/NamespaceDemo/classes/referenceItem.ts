// Task 11
abstract class ReferenceItem {

    // constructor(title: string, year: number) {
    //     console.log(`'Creating a new ReferenceItem...`);
    //     this.title = title;
    //     this.year = year;
    // }

    // title: string;
    // private year: number;

    static department: string = 'Government';

    private _publisher: string;

    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    constructor(public title: string, protected year: number) {
        console.log(`'Creating a new ReferenceItem...`);
    }

    public printItem(): void {
        console.log(`${this.title} was published in ${this.year} in department '${ReferenceItem.department}'.`);
    }

    abstract printCitation(): void;

}

export { ReferenceItem };
