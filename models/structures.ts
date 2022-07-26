export class LocalError extends Error {
    constructor (message: string, public readonly status: number){
        console.error(message);
        super(message);
    }
}