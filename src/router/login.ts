import DiscordOAuth from "@arthur.dev/discord-oauth2";
import { Router } from "express";
import { Discord as DiscordConfig } from "../config/types";
import { DISCORD_AFTER, DISCORD_LOGIN } from "../consts";
import GuildMember from "../utils/discord/guildMember";
import { Jwt } from "../utils/jwt/jwt";
import { DiscordData, DiscordUser, jwtData } from "../utils/jwt/types";

export function LoginRouter(config :DiscordConfig, jwt :Jwt) :Router {
    const router = Router();
    const oatuh = new DiscordOAuth({
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        callbackUrl: config.callbackUrl,
        scope: ["identify", "guilds", "guilds.members.read"]
    });

    router.get(DISCORD_LOGIN, async (req, res) => {
        if(req.session.jwtToken != undefined) res.redirect('/');
        res.redirect(oatuh.authorizationUrl);
    });

    router.get(DISCORD_AFTER, async (req, res) => {
        
        const code = req.query.code as string;
        if(!code) return //codeが存在しない場合

        var discordLogin :boolean = false;
        var discordGuildJoin :boolean = false;
        var username = undefined;
        var usertag = undefined;
        var userid = undefined;
        var usernick = undefined;
        var roles = undefined;

        try {
            const exchengeCode = await oatuh.exchangeCode(code);
            const token = exchengeCode.access_token;

            const guildme = new GuildMember(token);

            const user = await oatuh.fetchUser(token);
            discordLogin = true;

            const guilds = await user.guilds();

            username = user.username;
            usertag = user.tag;
            userid = user.id;

            guilds.filter(async guild => {
                if(guild.id == config.guild) {
                    discordGuildJoin = true;
                    const guildInMe = await guildme.guildme(guild.id);
                    usernick = guildInMe.nick;
                    roles = guildInMe.roles;
                }
            })

        } catch(e) {
            res.sendStatus(500); //なんかエラー出た
        }

        const DiscordUserData :DiscordUser = {
            username: username,
            discriminator: usertag,
            nick: usernick
        }

        const DiscordData :DiscordData = {
            discordLogin: discordLogin,
            disocrdJoinGuild: discordGuildJoin,
            discordUser: DiscordUserData,
            discordRoles: roles
        }

        const jwtData :jwtData = {
            discord: DiscordData,
            ip: req.ip,
            loginTime: (discordLogin && discordGuildJoin) ? 
                                        new Date().getDate().toString() : undefined
        }

        const jwtToken = await jwt.generete(jwtData);

        req.session.userid = userid;
        req.session.jwtToken = jwtToken;

        res.redirect(req.session.beforePath 
                                    ? req.session.beforePath : "/")
    });

    router.get("/logout",async (req, res) => {
        if(!req.session.userid) res.send('<p>ログインしていません。</p> <a href="/">ホームに戻る</>').sendStatus(202);

        req.session.destroy(async (e) => {
            //エラー起きちゃた
            res.sendStatus(500);
        })
    });

    return router;
}