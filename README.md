
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
│  ├─ lib.container.ts
│  ├─ manager.container.ts
│  ├─ repository.container.ts
│  └─ service.container.ts
├─ errors
│  ├─ api.errors.ts
│  └─ prisma.erors.ts
├─ generated
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
│  │  ├─ oauth.manager.ts
│  │  └─ otp.manager.ts
│  └─ auth
│     └─ session.manager.ts
├─ package-lock.json
├─ package.json
├─ prisma
│  ├─ migrations
│  │  └─ ...
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
│     │  │  └─ updateOauthAccount.ts
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
│  └─ users.service.ts
├─ types
│  └─ account.ts
└─ web
   ├─ base
   │  ├─ handler.base.ts
   │  ├─ middleware.base.ts
   │  ├─ module.base.ts
   │  └─ webManager.base.ts
   ├─ containers
   │  ├─ handler.container.ts
   │  ├─ index.web.container.ts
   │  ├─ middleware.container.ts
   │  └─ webManager.container.ts
   ├─ dto
   │  ├─ cookie.dto.ts
   │  └─ file.dto.ts
   ├─ features
   │  ├─ account
   │  │  ├─ account.dto.ts
   │  │  └─ account.module.ts
   │  ├─ auth
   │  │  ├─ auth.dto.ts
   │  │  └─ auth.module.ts
   │  ├─ me
   │  │  ├─ me.dto.ts
   │  │  └─ me.module.ts
   │  └─ users
   │     ├─ users.dto.ts
   │     └─ users.module.ts
   ├─ handler
   │  ├─ auth.handler.ts
   │  └─ file.handler.ts
   ├─ middleware
   │  ├─ auth.middleware.ts
   │  └─ file.middleware.ts
   ├─ types
   │  └─ Env.d.ts
   ├─ webManagers
   │  └─ session.webManager.ts
   ├─ webServer.ts
   └─ wrappers
      └─ zValidator.wrapper.ts

```