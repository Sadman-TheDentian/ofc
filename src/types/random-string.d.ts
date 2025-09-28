
declare module 'random-string' {
  function generate(options?: number | {
    length?: number;
    numeric?: boolean;
    letters?: boolean;
    special?: boolean;
  }): string;

  export { generate };
}
