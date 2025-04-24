
import express from 'express';
const app = express();
import routes from './src/routes/api';
import auth from "./src/routes/auth"
import { AppDataSource } from './src/config/data-source';
import { DataSource } from 'typeorm';
import cookieParser from 'cookie-parser'
import { Request, Response } from 'express';

app.use(express.json());

app.use('/api/auth', auth)

app.get('/about', (req: Request, res: Response) => {
  console.log("----------- API request.")
  res.send('About us. version: 1.0.6');
});


// Start server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
