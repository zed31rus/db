import DiscordOauthInfra from "#infra/discord/oauth.discord.infra";

export default class InfraContainer {
    constructor(
        readonly oauth: {
            readonly discord: DiscordOauthInfra
        }
    ) {}
}