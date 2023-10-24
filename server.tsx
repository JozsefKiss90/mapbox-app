import express, { Request, Response } from 'express';
import next from 'next';

const dev: boolean = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  const PORT: number = 3000;
  server.listen(PORT, (err?: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
