import * as Interfaces from '../interfaces';
import { sealed, logger, writable } from '../decorators';

// Task 21
@sealed('UniversityLibrarian')
@logger
class UniversityLibrarian implements Interfaces.ILibrarian {
    constructor(public email: string) {

    }

    name: string;
    department: string;

    public assistCustomer(custName: string): void {
        console.log(`${this.name} is assisting to ${custName}`);
    }

    @writable(true)
    public assistFaculty() {
        console.log(`Assisting faculty`);
    }

    @writable(false)
    public teachCommunity() {
        console.log(`Teaching community`);
    }
}

export { UniversityLibrarian };
