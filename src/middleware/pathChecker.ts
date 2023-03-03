import { NextFunction, Request, Response } from "express";
import { Roles, Server, Servers } from "../config/types";
import { SLASH_HANDLER } from "../consts";

type settings = {
    servers :Servers
    discordPrefix :string
    roles :Roles
}

export class pathChecker {
    
    private settings :settings;

    constructor(servers :Servers, discordPrefix :string, roles :Roles) {
        this.settings = {
            servers: servers,
            discordPrefix: discordPrefix,
            roles :roles
        }
    }
    
    public handle(req :Request, res :Response, next :NextFunction) :void {
        const path = req.path;
        if( path.startsWith("/"+this.settings.discordPrefix)) next();
         
        if(this.checkPath(this.settings.servers, path, [""])) next();

        res.sendStatus(405).send("Unauthorizetion")
    }

    private checkPath(servs :Servers, path :string, userRoles :string[]): boolean {
        var result :boolean = false;
        const map :Roles = this.settings.roles;

        servs.forEach(async serv => {
            
            if(path.startsWith(serv.path)) {
                if(serv.permission.includes("everyone")) result = true
                if(serv.permission.filter(s => {
                    const permissionGet = map.get(s); 
                    (permissionGet !== undefined && s !== "everyone") ?
                     userRoles.includes(permissionGet) : false }).length > 0) result = true
            }
        });

        return result;
    }
}