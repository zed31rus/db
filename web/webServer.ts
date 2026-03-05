import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";

const PORT = Number(process.env.PORT) || 3000;

const fastify = Fastify({
    logger: true,
    trustProxy: true
})

const allowedOrigins = [
  "https://zed31rus.ru",
  "https://nodes.zed31rus.ru",
  "https://api.zed31rus.ru",
];

fastify.register(cors, {
    origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".zed31rus.ru")) {
      cb(null, true);
      return;
    }
    cb(new Error("Not allowed by CORS"), false);
  },
  credentials: true,
})

fastify.register(cookie);