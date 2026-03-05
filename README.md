
```
db
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
├─ services
│  ├─ account.service.ts
│  ├─ auth.service.ts
│  ├─ social.service.ts
│  └─ user.service.ts
└─ web
   ├─ account
   │  ├─ account.controller.ts
   │  ├─ account.d.ts
   │  └─ account.dto.ts
   ├─ auth
   │  └─ auth.dto.ts
   ├─ get
   │  └─ get.dto.ts
   ├─ social
   │  └─ social.dto.ts
   ├─ types
   │  └─ user.d.ts
   └─ webServer.ts

```