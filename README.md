
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
│  └─ api.errors.ts
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
│  └─ account.d.ts
└─ web
   ├─ base
   │  ├─ middleware.base.ts
   │  ├─ module.base.ts
   │  └─ webManager.base.ts
   ├─ containers
   │  ├─ index.web.container.ts
   │  ├─ middleware.container.ts
   │  └─ webManager.container.ts
   ├─ dto
   │  └─ cookie.dto.ts
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
   ├─ middleware
   │  └─ auth.middleware.ts
   ├─ types
   │  └─ Env.d.ts
   ├─ webManagers
   │  └─ session.webManager.ts
   ├─ webServer.ts
   └─ wrappers
      └─ zValidator.wrapper.ts

```