
```
db
├─ base
│  ├─ lib.base.ts
│  ├─ manager.base.ts
│  ├─ repository.base.ts
│  └─ service.base.ts
├─ config
│  └─ env.config.ts
├─ containers
│  ├─ index.container.ts
│  ├─ infra.container.ts
│  ├─ lib.container.ts
│  ├─ manager.container.ts
│  ├─ repository.container.ts
│  └─ service.container.ts
├─ errors
│  ├─ api.errors.ts
│  ├─ config.errors.ts
│  └─ prisma.errors.ts
├─ generated
├─ infra
│  └─ discord
│     └─ oauth.discord.infra.ts
├─ lib
│  ├─ hash
│  │  └─ hash.lib.ts
│  ├─ jwt
│  │  └─ jwt.lib.ts
│  ├─ mail
│  │  └─ mail.lib.ts
│  ├─ refreshToken
│  │  └─ refreshToken.lib.ts
│  ├─ selector
│  │  └─ user.selector.ts
│  └─ verificationCode
│     └─ verificationCode.lib.ts
├─ LICENSE
├─ managers
│  ├─ account
│  │  └─ otp.manager.ts
│  └─ auth
│     └─ session.manager.ts
├─ package-lock.json
├─ package.json
├─ prisma
│  ├─ migrations
│  │  ├─ 20260121195853_base
│  │  │  └─ migration.sql
│  │  ├─ 20260123151148_verification_codes
│  │  │  └─ migration.sql
│  │  ├─ 20260123224904_uuid
│  │  │  └─ migration.sql
│  │  ├─ 20260124020639_allow_user_find
│  │  │  └─ migration.sql
│  │  ├─ 20260127014001_creted
│  │  │  └─ migration.sql
│  │  ├─ 20260202131407_uuid
│  │  │  └─ migration.sql
│  │  ├─ 20260202211948_unique_provider_user_uuid
│  │  │  └─ migration.sql
│  │  ├─ 20260202212725
│  │  │  └─ migration.sql
│  │  └─ migration_lock.toml
│  ├─ prisma.ts
│  └─ schema.prisma
├─ prisma.config.ts
├─ README.md
├─ repository
│  └─ db
│     ├─ db.ts
│     ├─ oauth
│     │  ├─ classes
│     │  │  ├─ createOauthAccount.ts
│     │  │  ├─ getOauthAccount.ts
│     │  │  ├─ updateOauthAccount.ts
│     │  │  └─ upsertOauthAccount.ts
│     │  └─ oauth.class.ts
│     ├─ refreshToken
│     │  ├─ classes
│     │  │  ├─ createRefreshToken.ts
│     │  │  ├─ deleteRefreshToken.ts
│     │  │  └─ getRefreshToken.ts
│     │  └─ refreshToken.class.ts
│     ├─ user
│     │  ├─ classes
│     │  │  ├─ createUser.ts
│     │  │  ├─ getUser.ts
│     │  │  └─ updateUser.ts
│     │  └─ user.class.ts
│     └─ verificationCode
│        ├─ classes
│        │  ├─ deleteVerificationCode.ts
│        │  ├─ getVerificationCode.ts
│        │  └─ upsertVerificationCode.ts
│        └─ verificationCode.class.ts
├─ services
│  ├─ account.service.ts
│  ├─ auth.service.ts
│  ├─ me.service.ts
│  ├─ oauth
│  │  └─ discord.oauth.service.ts
│  └─ users.service.ts
├─ start.ts
├─ types
│  ├─ account.ts
│  └─ oauth.ts
└─ web
   ├─ base
   │  ├─ handler.base.ts
   │  ├─ middleware.base.ts
   │  ├─ module.base.ts
   │  ├─ openapi.base.ts
   │  ├─ server.base.ts
   │  ├─ webManager.base.ts
   │  └─ wrapper.base.ts
   ├─ containers
   │  ├─ dto.container.ts
   │  ├─ handler.container.ts
   │  ├─ index.web.container.ts
   │  ├─ middleware.container.ts
   │  ├─ module.container.ts
   │  ├─ openapi.container.ts
   │  ├─ server.container.ts
   │  ├─ webManager.container.ts
   │  └─ wrapper.container.ts
   ├─ dto
   │  ├─ account.dto.ts
   │  ├─ auth.dto.ts
   │  ├─ cookie.dto.ts
   │  ├─ file.dto.ts
   │  ├─ me.dto.ts
   │  ├─ oauth.dto.ts
   │  └─ users.dto.ts
   ├─ handler
   │  ├─ auth.handler.ts
   │  ├─ error.handler.ts
   │  └─ file.handler.ts
   ├─ middleware
   │  ├─ auth.middleware.ts
   │  └─ file.middleware.ts
   ├─ module
   │  ├─ account.module.ts
   │  ├─ auth.module.ts
   │  ├─ me.module.ts
   │  ├─ oauth
   │  │  └─ discord.oauth.module.ts
   │  └─ users.module.ts
   ├─ openapi
   │  ├─ account.openapi.ts
   │  ├─ auth.openapi.ts
   │  ├─ me.openapi.ts
   │  └─ users.openapi.ts
   ├─ servers
   │  └─ main.server.ts
   ├─ types
   │  └─ Env.d.ts
   ├─ webManagers
   │  └─ session.webManager.ts
   └─ wrappers
      ├─ cors.wrapper.ts
      ├─ rateLimiter.wrapper.ts
      └─ validator.wrapper.ts

```