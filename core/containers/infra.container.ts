import DiscordOauthInfra from "#core/infra/discord/oauth.discord.infra.js";
import RabbitMqInfra from "../infra/rabbitmq/rabbitmq.infra.js";

export default class InfraContainer {
    constructor(
        readonly rabbitmq: RabbitMqInfra,
        readonly oauth: {
            readonly discord: DiscordOauthInfra,
        }
    ) {}
}