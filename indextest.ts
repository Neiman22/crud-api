import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const users: User[] = [];

// GET all users
app.get('/api/users', (req: Request, res: Response) => {
  res.status(200).json(users);
});

// GET user by ID
app.get('/api/users/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!isValidUuid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
});

// POST create new user
app.post('/api/users', (req: Request, res: Response) => {
  const { username, age, hobbies } = req.body;

  if (!username || !age || !hobbies) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newUser: User = { id: uuidv4(), username, age, hobbies };
  users.push(newUser);

  return res.status(201).json(newUser);
});

// PUT update user by ID
app.put('/api/users/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const { username, age, hobbies } = req.body;

  if (!isValidUuid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.username = username || user.username;
  user.age = age || user.age;
  user.hobbies = hobbies || user.hobbies;

  return res.status(200).json(user);
});

// DELETE user by ID
app.delete('/api/users/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!isValidUuid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(index, 1);

  return res.status(204).end();
});

// Helper function to validate UUID
const isValidUuid = (id: string): boolean => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(id);
};

// Error handling middleware
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Server is running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
