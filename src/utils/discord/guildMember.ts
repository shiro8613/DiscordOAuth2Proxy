import axios, { AxiosInstance } from "axios"
import { APIGuildMember } from 'discord-api-types/v10'


const DISCORD_API_BASE_URI = "https://discord.com/api/v10";

export default class GuildMember {
    private readonly axios :AxiosInstance;
    constructor(access_token :string) {
        this.axios = axios.create({
            baseURL: DISCORD_API_BASE_URI + "/user/@me/guilds",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorizetion: `Bearer ${access_token}`
            }
        });
    }  

    public async guildme(id :string) :Promise<APIGuildMember> {
        return await new Promise((resolve, reject) => {
            this.axios.get(`/${id}/member`).then(d => {
                resolve(d.data);
            }).catch(reject);            
        });
    }
}