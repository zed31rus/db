import { BaseModule } from "#web/base/module.base";
import { OptionalUserEnv } from "#web/types/Env.d";

type DiscordOauthEnv = OptionalUserEnv & {};

export default class DiscordOauthModule extends BaseModule<DiscordOauthEnv> {

    init() {

        this.router.use(this.wrapper.rateLimiter.limit(15 * 60 * 1000, 100))

        this.router.get(
            '/callback',
            this.wrapper.validator.validate('query', this.dto.oauth.discord.callback),
            this.middleware.auth.withOptionalUser<DiscordOauthEnv>(),
            async (c) => {
                const { code } = c.req.valid('query');
                const publicUser = c.get('user');
                
                const { user, refresh, access } = await this.service.oauth.discord.callback(code, publicUser);

                this.webManager.session.sendSession(c, refresh, access)

                return c.json({ user })
            }
        )
    }
}
