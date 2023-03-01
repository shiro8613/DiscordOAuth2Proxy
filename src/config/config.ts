import { load, dump } from "js-yaml";
import { readFileSync, writeFileSync } from "fs";
import { Config } from "./types";
const expJson = require("./example/exp.json");


export function LoadConfig(path :string) :Config {
    const filesString = readFileSync(path, { encoding: "utf-8" })
    const config = load(filesString) as Config
    return config;
}

export function ExportConfig(path :string) :void{
    const dumpYml = dump(expJson as Config);
    writeFileSync(path, dumpYml);
}
