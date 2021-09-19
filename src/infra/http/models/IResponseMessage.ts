interface IResponseMessage<T = any> {
  data?: T;
  success: boolean;
  message: string;
}

export { IResponseMessage };
