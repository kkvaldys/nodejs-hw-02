//server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import contactsRouter from "./routers/contacts-router.js";

//error imports
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

import env from './utils/env.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
    const app = express();
    const logger = pino(
        {
            transport: {
                target: 'pino-pretty',
            },
        }
    );

    app.use(logger);
    app.use(cors());
    app.use(express.json());


app.use("/api/contacts", contactsRouter);


    app.use(notFoundHandler);
    app.use(errorHandler);

    app.use((err, req, res, next) => {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message,
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
