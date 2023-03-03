type Listener = {
    address :string
    port: number
};

type Discord = {
    prefix :string
    clientId :string
    clientSecret :string
    guild :string
    roles :any
};

export type Config = {
    listener :Listener
    discord :Discord
    servers :any
};

export type Server = {
    path :string
    permission :string[]
};

export type Servers = Map<string, Server>;

export type Roles = Map<string,string>;
