import * as Interfaces from '../interfaces';
import { sealed, logger } from '../decorators';

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
}

export { UniversityLibrarian };
