export class ConflictException extends Error {
    constructor(public params: string, message: string) {
        super(message);
        this.name = 'ConflictException';

        Object.setPrototypeOf(this, ConflictException.prototype);
    }
}