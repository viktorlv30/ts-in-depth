showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = `Hello from ${name}`;
}

//==================================================

type Book = {
  id: number,
  title: string,
  author: string,
  available: boolean,
  category: Category
};

enum Category {
  JavaScript,
  CSS,
  HTML,
  TypeScript,
  Angular
}



function getAllBooks(): Book[] {
  let books: Book[] = [
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

function logFirstAvailable(books: Book[] = getAllBooks()): void {
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

function getBookById(id: number): Book {
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

function getBooksAsync(): Promise<Book[]> {
  return new Promise((res, rej) => {
    const books = getAllBooks();
    setTimeout(() => res(books), 3000);
  });
}

function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
  console.log(`Customer ${customer}`);
  const books = bookIDs.map((id: number): Book => getBookById(id));
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

// Task 10
interface ILabrarian {
  name: string;
  email: string;
  department: string;
  assistCustomer: (name: string) => void;
}

class UniversityLibrarian implements ILabrarian {
  constructor(public email: string) {

  }

  name: string;
  department: string;
  assistCustomer: (name: string) => void;

}

const l = new UniversityLibrarian('hello@example.com');

class Journal {
  constructor(public title: string) { }
  // private name: string;
}

class NewsPaper {

  constructor(title: number);
  constructor(title: string);
  constructor(public title: string | number) { }
}

let j = new Journal('journal');
let paper = new NewsPaper('hreloo');
