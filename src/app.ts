import { Category } from './NamespaceDemo/enums';
import { ILibrarian, IAuthor, ILogger, IBook, IMagazine } from './NamespaceDemo/interfaces';
import { UniversityLibrarian, ReferenceItem, RefBook, Shelf } from './NamespaceDemo/classes';
import { purge, getBooksByCategory, logCategorySearch, logFirstAvailable, getAllBooks, getBookTitlesByCategory, logBookTitles, getBookById, createCustomerId, createCustomer, checkoutBooks, getTitles, printBook, getBooksByCategoryPromise, logSearchResults } from './lib/utility-function';
import Encyclopedia from './NamespaceDemo/classes/encyclopedia';

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
const library = new UniversityLibrarian('hello@world.com');

library.assistFaculty = () => console.log(`New assist faculty`);

library.assistFaculty();
try {
    library.teachCommunity = () => console.log(`New teach community`);
    library.teachCommunity();
} catch (error) {
    console.warn(error.message);
}

// Task 24
const enc = new Encyclopedia('Big SSSR', 1965, 20);
// console.log(`enc`, enc);
enc.printItem();

// Task 28. Callback Functions
// console.log(`Begin`);
// getBooksByCategory(Category.Software, logCategorySearch);
// console.log(`End`);

// Task 29. Promises
// console.log(`Begin promise`);
// getBooksByCategoryPromise(Category.JavaScript)
//     .then(titles => logCategorySearch(null, titles))
//     .catch(err => logCategorySearch(err, null))
// console.log(`End promise`);

// Task 30. Async Functions
console.log('Beginning search...');
logSearchResults(Category.JavaScript)
    .catch(reason => console.log(reason));
console.log('Search submitted...');


// Task 31
// Personal

function enumerable(isEnumerable: boolean) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = isEnumerable;
    }
}

class MyClass {

    private _age: number;
    private _name: string;
    private _address: string;



    @enumerable(false)
    public get age() {
        return this._age || 0;
    }

    @enumerable(true)
    public get name() {
        return this._name || 'No name';
    }

    @enumerable(true)
    public get address() {
        return this._address || 'No address';
    }
}

const myClass = new MyClass();
for (let prop in myClass) {
    console.log(`Enumerable property`, prop);
}

