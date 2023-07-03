import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = [];

app.get('/api/users', (req: Request, res: Response) => {
  res.status(200).json(users);
});

