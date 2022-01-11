import { JwtPayloadModel } from "@models/common/JwtPayloadModel";

interface IAuthenticationProvider {
  generateToken(payload: JwtPayloadModel): string;
  decode(token: string): JwtPayloadModel;
  verify(token: string): boolean;
}

export { IAuthenticationProvider };
