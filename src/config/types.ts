type Listener = {
    address :string
    port :Number
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

export type Servers = Map<String, Server>;

export type Roles = Map<String,Number>;
