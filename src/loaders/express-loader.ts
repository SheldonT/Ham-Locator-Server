import express from 'express';
import { Routes } from '../controllers/routes';
import cors from 'cors';

export const ExpressLoader = (app: express.Application): void => {
    app.use(cors());
    app.use(express.json({ limit: "1mb" }));

    app.use(Routes);

    console.log("Express Loaded...")
}