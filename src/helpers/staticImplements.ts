const staticImplements =
  <T>() =>
  <U extends T>(constructor: U): U =>
    constructor;

export { staticImplements };
