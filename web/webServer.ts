import express from 'express';
import http from 'http';
import getRouter from './routes/get.router';
import authRouter from './routes/auth.router';
import errorMiddleware from './middlewares/error.middleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT

const allowedOrigins = [
  "https://zed31rus.ru",
  "https://nodes.zed31rus.ru",
  "https://api.zed31rus.ru",
];

const corsOptions: cors.CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) {
      callback(null, true);
      return;
    }

    const isAllowed = allowedOrigins.includes(origin) || origin.endsWith(".zed31rus.ru");

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use('/auth', authRouter)
app.use('/get', getRouter)

app.use(errorMiddleware)

server.listen(PORT, () => {
    console.log(`OK, port: ${PORT}`);
});

export default app;