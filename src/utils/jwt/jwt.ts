import { sign, verify, SignOptions } from "jsonwebtoken";
import { jwtData } from "./types";


export class Jwt {
    private secret :string;
    private jwtOptions :SignOptions;

    constructor(Secret :string, Time :number) {
        this.secret = Secret;
        this.jwtOptions = {
            algorithm: "RS256",
            expiresIn: Time * 60 *  60 * 24
        }

    }

    public async generete(payload :jwtData) :Promise<string>  {
        return await sign(payload, this.secret, this.jwtOptions);
    }

    public async verify(token :string) :Promise<jwtData> {
        return await new Promise((resolve, reject) => {
            try {
                resolve(verify(token, this.secret, this.jwtOptions ) as jwtData);
              } catch (e) { reject(e); }
        });
    }


}