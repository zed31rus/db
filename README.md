
```
db
├─ docker-compose.yml
├─ generated
├─ lib
│  ├─ db
│  │  ├─ db.ts
│  │  ├─ oauth
│  │  │  ├─ classes
│  │  │  │  ├─ createOauthAccount.ts
│  │  │  │  ├─ getOauthAccount.ts
│  │  │  │  └─ updateOauthAccount.ts
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
├─ package-lock.json
├─ package.json
├─ prisma
│  ├─ migrations
│  │  ├─ ...
│  ├─ prisma.ts
│  └─ schema.prisma
├─ prisma.config.ts
├─ README.md
├─ services
│  ├─ auth.service.ts
│  └─ get.service.ts
├─ types
│  └─ express.d.ts
└─ web
   ├─ controllers
   │  ├─ auth.controller.ts
   │  └─ get.controller.ts
   ├─ dto
   │  ├─ auth.dto.ts
   │  └─ get.dto.ts
   ├─ middlewares
   │  ├─ auth.middleware.ts
   │  ├─ error.middleware.ts
   │  └─ validate.middleware.ts
   ├─ routes
   │  ├─ auth.router.ts
   │  └─ get.router.ts
   └─ webServer.ts

```