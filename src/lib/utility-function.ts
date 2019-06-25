import { IBook, LibMgrCallback } from '../NamespaceDemo/interfaces';
import { Category } from '../NamespaceDemo/enums';

export function purge<T>(inventory: Array<T>): Array<T> {
    return inventory.splice(2, inventory.length);
}



export function getAllBooks(): IBook[] {
    let books: IBook[] = [
        {
            id: 1,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            available: true,
            category: Category.JavaScript
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            available: false,
            category: Category.JavaScript
        },
        {
            id: 3,
            title: 'CSS Secrets',
            author: 'Lea Verou',
            available: true,
            category: Category.CSS
        },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
            category: Category.JavaScript
        }
    ];
    return books;
}

export function logFirstAvailable(books: IBook[] = getAllBooks()): void {
    const numBooks: number = books.length;
    let title: string = '';
    for (const book of books) {
        if (book.available) {
            title = book.title;
            break;
        }
    }
    console.log(`Books count ${numBooks}.`);
    console.log(`First available book is ${title}.`);
}

export function getBookTitlesByCategory(category: Category = Category.JavaScript): string[] {
    const books = getAllBooks();
    const titles = books
        .filter(book => book.category === category)
        .map(book => book.title);
    return titles;
}

export function logBookTitles(titles: string[]): void {
    for (const title of titles) {
        console.log(title);
    }
}

export function getBookById(id: number): IBook {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

export function createCustomerId(name: string, id: number): string {
    return `${name}${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer Name:`, name);
    if (age) {
        console.log(`Customer Age:`, age);
    }
    if (city) {
        console.log(`Customer City:`, city);
    }
}

export function getBooksAsync(): Promise<IBook[]> {
    return new Promise((res, rej) => {
        const books = getAllBooks();
        setTimeout(() => res(books), 3000);
    });
}

export function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer ${customer}`);
    const books = bookIDs.map((id: number): IBook => getBookById(id));
    const availableBooks = books.filter(book => book.available);
    const titles = availableBooks.map(book => book.title);
    return titles;
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(property: string | boolean): string[] {
    const books = getAllBooks();
    if (typeof property === 'boolean') {
        return books
            .filter(book => book.available === property)
            .map(book => book.title);
    }
    if (typeof property === 'string') {
        return books
            .filter(book => book.author === property)
            .map(book => book.title);
    }
}

export function printBook(book: IBook): void {
    console.log(`${book.title} by ${book.author}`);
}

export function getBooksByCategory(category: Category, cb: LibMgrCallback): void {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                cb(null, titles);
            } else {
                throw new Error('No books found.');
            }
        } catch (error) {
            cb(error, null);
        }
    });
}

export const logCategorySearch: LibMgrCallback = (err: Error, titles: string[]): void => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(titles.join('; '));
    }
}

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    return new Promise<Array<string>>((resolve, reject) => {
        setTimeout(() => {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                resolve(titles);
            } else {
                reject(new Error('No books found.'));
            }
        }, 2000);
    });
}

export async function logSearchResults(category: Category) {
    let foundBooks = await getBooksByCategoryPromise(category);
    console.log(foundBooks);
}
