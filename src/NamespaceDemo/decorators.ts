export function sealed(p: string) {
    return function (target: Function): void {
        console.log(`Sealing the constructor: ${p}`);
        console.log(target.prototype);
        Object.seal(target);
        Object.seal(target.prototype);
    };
}

export function logger<TFunction extends Function>(target: TFunction): TFunction {
    const newConstructor: Function = function () {
        console.log(`Creating new instance`);
        console.log(target);
        this.age = 30;
        this.printLibrarian = () => console.log(`Librarian name:  ${this.name}, Librarian age: ${this.age}`);
    };


    newConstructor.prototype = Object.create(target.prototype);
    newConstructor.prototype.constructor = target;


    return newConstructor as TFunction;
}