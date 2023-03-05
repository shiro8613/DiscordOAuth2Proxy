import RedisStore from "connect-redis";
import { RequestHandler } from "express";
import session from "express-session";
import { Redis } from "ioredis";
import { Session as SessionTypes } from "../config/types";

declare module 'express-session' {
    interface SessionData {
        userid? :string
        beforePath? :string
        jwtToken? :string
    }
  }

export function SessionSetter(sessionOption :SessionTypes, redis :Redis, secret :string) :RequestHandler{
    const redisStore = new RedisStore({ client: redis });
   
    return session( {
        secret: secret,
        cookie: {
            ...sessionOption
        },
        store: redisStore       
    } );
}