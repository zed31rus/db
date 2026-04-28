
```
db
├─ config
│  └─ env.config.ts
├─ core
│  ├─ base
│  │  ├─ base.ts
│  │  ├─ infra.base.ts
│  │  ├─ lib.base.ts
│  │  ├─ manager.base.ts
│  │  └─ service.base.ts
│  ├─ containers
│  │  ├─ index.container.ts
│  │  ├─ infra.container.ts
│  │  ├─ lib.container.ts
│  │  ├─ manager.container.ts
│  │  └─ services.container.ts
│  ├─ db
│  │  ├─ db.ts
│  │  ├─ oauth
│  │  │  ├─ classes
│  │  │  │  ├─ createOauthAccount.ts
│  │  │  │  ├─ getOauthAccount.ts
│  │  │  │  ├─ updateOauthAccount.ts
│  │  │  │  └─ upsertOauthAccount.ts
│  │  │  └─ oauth.class.ts
│  │  ├─ refreshToken
│  │  │  ├─ classes
│  │  │  │  ├─ createRefreshToken.ts
│  │  │  │  ├─ deleteRefreshToken.ts
│  │  │  │  └─ getRefreshToken.ts
│  │  │  └─ refreshToken.class.ts
│  │  ├─ user
│  │  │  ├─ classes
│  │  │  │  ├─ createUser.ts
│  │  │  │  ├─ getUser.ts
│  │  │  │  └─ updateUser.ts
│  │  │  └─ user.class.ts
│  │  └─ verificationCode
│  │     ├─ classes
│  │     │  ├─ deleteVerificationCode.ts
│  │     │  ├─ getVerificationCode.ts
│  │     │  └─ upsertVerificationCode.ts
│  │     └─ verificationCode.class.ts
│  ├─ infra
│  │  ├─ discord
│  │  │  └─ oauth.discord.infra.ts
│  │  └─ rabbitmq
│  │     └─ rabbitmq.infra.ts
│  ├─ lib
│  │  ├─ hash
│  │  │  └─ hash.lib.ts
│  │  ├─ jwt
│  │  │  └─ jwt.lib.ts
│  │  ├─ mail
│  │  │  └─ mail.lib.ts
│  │  ├─ refreshToken
│  │  │  └─ refreshToken.lib.ts
│  │  ├─ selector
│  │  │  └─ user.selector.ts
│  │  └─ verificationCode
│  │     └─ verificationCode.lib.ts
│  ├─ managers
│  │  ├─ otp.manager.ts
│  │  └─ session.manager.ts
│  ├─ prisma
│  │  ├─ migrations
│  │  │  └─ ...
│  │  └─ schema.prisma
│  ├─ services
│  │  ├─ account.service.ts
│  │  ├─ auth.service.ts
│  │  ├─ me.service.ts
│  │  ├─ oauth
│  │  │  └─ discord.oauth.service.ts
│  │  └─ users.service.ts
│  └─ types
│     ├─ account.ts
│     ├─ oauth.ts
│     └─ rabbitmq.ts
├─ errors
│  ├─ api.errors.ts
│  ├─ config.errors.ts
│  └─ prisma.errors.ts
├─ generated
│  └─ ...
├─ LICENSE
├─ package-lock.json
├─ package.json
├─ prisma.config.ts
├─ README.md
├─ start.ts
└─ web
   ├─ base
   │  ├─ base.ts
   │  ├─ handler.base.ts
   │  ├─ manager.base.ts
   │  ├─ middleware.base.ts
   │  ├─ module.base.ts
   │  ├─ openapi.base.ts
   │  ├─ server.base.ts
   │  └─ wrapper.base.ts
   ├─ containers
   │  ├─ dto.container.ts
   │  ├─ handler.container.ts
   │  ├─ index.web.container.ts
   │  ├─ managers.container.ts
   │  ├─ middleware.container.ts
   │  ├─ module.container.ts
   │  ├─ openapi.container.ts
   │  ├─ server.container.ts
   │  └─ wrapper.container.ts
   ├─ dto
   │  ├─ cookie.dto.ts
   │  └─ file.dto.ts
   ├─ handlers
   │  ├─ auth.handler.ts
   │  ├─ error.handler.ts
   │  └─ file.handler.ts
   ├─ managers
   │  └─ session.manager.ts
   ├─ middleware
   │  ├─ auth.middleware.ts
   │  └─ file.middleware.ts
   ├─ modules
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
   │  ├─ oauth
   │  │  └─ discord.oauth.openapi.ts
   │  └─ users.openapi.ts
   ├─ servers
   │  └─ main.server.ts
   ├─ types
   │  └─ Env.d.ts
   └─ wrappers
      ├─ cors.wrapper.ts
      ├─ rateLimiter.wrapper.ts
      └─ validator.wrapper.ts

```