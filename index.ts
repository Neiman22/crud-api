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
const PORT = process.env.PORT || 4000;

function isValidUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

app.get('/api/users', (req: Request, res: Response) => {
  res.status(200).json(users);
});

app.get('/api/users/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;

  if(!isValidUUID(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const user = users.find((elem) => elem.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
});


