import { BaseModule } from "#web/base/module.base";
import { UserEnv } from "#web/types/Env.d";

type OauthEnv = UserEnv & {};

export default class DiscordOauthModule extends BaseModule<OauthEnv> {

    init() {

        this.router.use(this.wrapper.rateLimiter.limit(15 * 60 * 1000, 100))

        this.router.get(
        '/callback',
        this.wrapper.validator.validate('query', this.dto.oauth.discord.callback),
        async (c) => {
            const { code } = c.req.valid('query');
            console.log(await this.service.oauth.discord.callback(code));

            return c.json({ success: true })
        }
        )
    }
}
