

type DiscordUser = {
    username :string
    nick :string
    discriminator :string
}

type DiscordData = {
    discordLogin :boolean
    disocrdJoinGuild :boolean
    discordUser :DiscordUser
    discordRoles :string[]
}


export type jwtData = {
    discord :DiscordData
    ip :string
    loginTime :string
}
