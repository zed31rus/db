import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import AuthModules from "#web/features/auth/auth.module";
import AccountModules from "#web/features/account/account.module";
import ProfileModules from "#web/features/profile/profile.module";
import SocialModules from "#web/features/social/social.module";
import dotenv from 'dotenv';

dotenv.config()

export const PORT = Number(process.env.PORT) || 3000;

const fastifyInstance = Fastify({
    logger: true,
    trustProxy: true
}).withTypeProvider<ZodTypeProvider>();

const allowedOrigins = [
  "https://zed31rus.ru",
  "https://nodes.zed31rus.ru",
  "https://api.zed31rus.ru",
];

fastifyInstance.register(cors, {
    origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".zed31rus.ru")) {
      cb(null, true);
      return;
    }
    cb(new Error("Not allowed by CORS"), false);
  },
  credentials: true,
})

fastifyInstance.register(cookie);
fastifyInstance.setValidatorCompiler(validatorCompiler);
fastifyInstance.setSerializerCompiler(serializerCompiler);

AuthModules.init(fastifyInstance, '/auth');
AccountModules.init(fastifyInstance, '/account');
ProfileModules.init(fastifyInstance, '/profile');
SocialModules.init(fastifyInstance, '/social');

export default fastifyInstance;

export type FastifyInstanceType = typeof fastifyInstance;
