import { Category } from './enums';

interface IBook {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    markDamaged?: IDamageLogger;
}

interface IDamageLogger {
    (reason: string): void;
}


interface IPerson {
    name: string;
    email: string;
}

interface IAuthor extends IPerson {
    numBooksPublished: number;
}

interface ILibrarian extends IPerson {
    department: string;
    assistCustomer: (custName: string) => void;
}

interface IMagazine {
    title: string;
    publisher: string;
}

interface IShelfItem {
    title: string;
}

interface LibMgrCallback {
    (err: Error, titles: string[]): void;
}

export { IBook, IDamageLogger, IAuthor, ILibrarian, IMagazine, IShelfItem, IDamageLogger as ILogger, LibMgrCallback };