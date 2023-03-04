type Listener = {
    address :string
    port :number
};

export type Session = {
    maxAge :number 
    httpOnly :boolean
    secure :boolean
}

export type Redis = {
    host :string
    port :number
    password :string
}

export type Discord = {
    prefix :string
    clientId :string
    clientSecret :string
    callbackUrl :string
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
