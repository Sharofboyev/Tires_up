export class LocalError extends Error {
  constructor(message: string, public readonly status: number) {
    console.log(message);
    super(message);
  }
}
