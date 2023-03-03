import { Redis } from "ioredis";
import { Redis as RedisOption } from "../../config/types"

export async function RedisClientCreate(redisOption :RedisOption) :Promise<Redis> {
    return new Promise((resolve, reject) => {
        try {
            resolve(new Redis(redisOption));
        } catch(e) { reject(e) }
    });
}
