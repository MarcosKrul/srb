import { JwtPayloadModel } from "@models/JwtPayloadModel";

interface IAuthenticationProvider {
  generateToken(payload: JwtPayloadModel): string;
}

export { IAuthenticationProvider };
