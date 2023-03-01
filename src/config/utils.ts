import { Roles, Servers } from "./types";


export const ConvertRoles = (object :any) :Roles => object as Roles;
 
export const ConvertServers = (object :any) :Servers => object as Servers;