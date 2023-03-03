type Listener = {
    address :string
    port :number
};

type Session = {
    maxAge :number 
    httpOnly :boolean
    secure :boolean
}

type Redis = {
    host :string
    port :number
    password :string
}

type Discord = {
    prefix :string
    clientId :string
    clientSecret :string
    guild :string
    roles :any
};

export type Config = {
    listener :Listener
    session :Session,
    redis :Redis
    discord :Discord
    servers :any
};

export type Server = {
    path :string
    permission :string[]
};

export type Servers = Map<string, Server>;

export type Roles = Map<string,string>;
