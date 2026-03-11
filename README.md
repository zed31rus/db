
```
db
├─ generated
├─ lib
│  ├─ errors
│  │  └─ api.errors.ts
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
├─ managers
│  ├─ account
│  │  └─ otp.manager.ts
│  └─ auth
│     └─ session.manager.ts
├─ package-lock.json
├─ package.json
├─ prisma
│  ├─ migrations
│  │  └─...
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
│  ├─ profile.service.ts
│  └─ social.service.ts
└─ web
   ├─ features
   │  ├─ account
   │  │  ├─ account.dto.ts
   │  │  └─ account.module.ts
   │  ├─ auth
   │  │  ├─ auth.dto.ts
   │  │  └─ auth.module.ts
   │  ├─ profile
   │  │  ├─ profile.dto.ts
   │  │  └─ profile.module.ts
   │  └─ social
   │     ├─ social.dto.ts
   │     └─ social.module.ts
   ├─ hooks
   │  └─ preHandler
   │     └─ auth.preHandler.ts
   ├─ types
   │  └─ fastify.d.ts
   └─ webServer.ts

```