import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';

const PORT = Number(process.env.PORT) || 3000;

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

fastifyInstance.listen({
  port: PORT
}, (err) => {
  err ? console.log(err) : console.log(`Server listening port ${PORT}`)
})

export type FastifyInstanceType = typeof fastifyInstance