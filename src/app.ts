import { Category } from './NamespaceDemo/enums';
import { ILibrarian, IAuthor, ILogger, IBook, IMagazine } from './NamespaceDemo/interfaces';
import { UniversityLibrarian, ReferenceItem, RefBook, Shelf } from './NamespaceDemo/classes';
import { purge } from './lib/utility-function';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

//==================================================

// type Book = {
//   id: number,
//   title: string,
//   author: string,
//   available: boolean,
//   category: Category
// };




function getAllBooks(): IBook[] {
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

function logFirstAvailable(books: IBook[] = getAllBooks()): void {
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

function getBookTitlesByCategory(category: Category = Category.JavaScript): string[] {
    const books = getAllBooks();
    const titles = books
        .filter(book => book.category === category)
        .map(book => book.title);
    return titles;
}

function logBookTitles(titles: string[]): void {
    for (const title of titles) {
        console.log(title);
    }
}

function getBookById(id: number): IBook {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

function createCustomerId(name: string, id: number): string {
    return `${name}${id}`;
}

function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer Name:`, name);
    if (age) {
        console.log(`Customer Age:`, age);
    }
    if (city) {
        console.log(`Customer City:`, city);
    }
}

function getBooksAsync(): Promise<IBook[]> {
    return new Promise((res, rej) => {
        const books = getAllBooks();
        setTimeout(() => res(books), 3000);
    });
}

function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer ${customer}`);
    const books = bookIDs.map((id: number): IBook => getBookById(id));
    const availableBooks = books.filter(book => book.available);
    const titles = availableBooks.map(book => book.title);
    return titles;
}

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(property: string | boolean): string[] {
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

function printBook(book: IBook): void {
    console.log(`${book.title} by ${book.author}`);
}

const myBook: IBook = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 200,
    markDamaged: (reason: string) => console.log(`Damaged: ${reason}`)
};


// Task 01
logFirstAvailable(getAllBooks());

// Task 02
const titles = getBookTitlesByCategory(Category.JavaScript);
logBookTitles(titles);

// Task 03
const titles3 = getBookTitlesByCategory(Category.JavaScript);
titles3.forEach(title => console.log(title));
console.log(getBookById(3));

// Task 04
let myId: string = createCustomerId('Ann', 10);
console.log(myId);

type GeneratorType = (name: string, id: number) => string;
let idGenerator: GeneratorType = (name: string, id: number): string => `${name}${id}`;
idGenerator = createCustomerId;
myId = idGenerator('Kolya', 22);
console.log(myId);

// Task 05
createCustomer('Vasya');
createCustomer('Klara', 30);
createCustomer('Olya', 22, 'Roma');

const titles5 = getBookTitlesByCategory();
console.log(titles5);
const titles52 = checkoutBooks('Ann', 1, 2, 4);
console.log(titles52);

// Task 06
const checkedOutBooks = getTitles('Ann');
console.log(checkedOutBooks);

// Task 07
printBook(myBook);
myBook.markDamaged('missing back cover');

// Task 08
const logDamage: ILogger = (reason: string) => console.log(`Damaged: ${reason}.`);
logDamage(`Stain`);

// Task 09
const favoriteAuthor: IAuthor = {
    name: 'Viktor',
    email: 'Ann@gmail.com',
    numBooksPublished: 100
};

// const favoriteLibrarian: ILibrarian = {
//     department: 'Ura-Ura',
//     email: 'library@email.com',
//     name: 'Boris',
//     assistCustomer: (name: string) => console.log(`Assist: ${name}`)
// }

// Task 10


const favoriteLibrarian: ILibrarian = new UniversityLibrarian('hello@example.com');
favoriteLibrarian.name = 'Masha';
favoriteLibrarian.assistCustomer('Boris');



// const ref = new ReferenceItem('Red book', 2015);
// ref.printItem();
// ref.publisher = 'kolya';
// console.log('Publisher is ' + ref.publisher);


const refBook: ReferenceItem = new RefBook('Hororaru', 2000, 5);
refBook.printItem();
refBook.printCitation();

// Task 13 cross with 11

// Task 17
const inventory: /*Array<IBook | number>*/ IBook[] = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];

// const numberArray = [10, 12, 13, 14, 15];

// let purged = purge(inventory);
// console.log(`Books: ${purged}`);
// purged = purge(numberArray);
// console.log(`Numbers: ${purged}`);

// Task 19
const bookShelf: Shelf<IBook> = new Shelf<IBook>();
for (let book of inventory) {
    bookShelf.add(book);
}
const firstBook: IBook = bookShelf.getFirst();
console.log(`firstBook:`, firstBook);

const magazines = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];
const magazineShelf: Shelf<IMagazine> = new Shelf<IMagazine>();
for (let magazine of magazines) {
    magazineShelf.add(magazine);
}
const firstMag = magazineShelf.getFirst();
console.log(`firstMag:`, firstMag);


// Task 20
magazineShelf.printTitles();
console.log(magazineShelf.find('Five Points'));

// Task 22
const fLibrarian = new UniversityLibrarian('Nastya@com');
fLibrarian.name = 'Anna';
console.log('fLibrarian', fLibrarian);
(<any>fLibrarian).printLibrarian();

// Task 23
