import * as path from 'path';
import express, { Express, Request, Response } from 'express';

export class AppRoutes {
  constructor(
    private app: Express
  ) {
    this.app.use(express.static(path.join(__dirname, 'public')));

    this.app.get('/', (_req: Request, res: Response) => {
      res.render('index', { title: 'ZOOM+Care Candidate Code Challenge - NodeJS API - Alex Luecke' });
    });
  }
}
