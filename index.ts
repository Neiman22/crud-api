import express from 'express';

const app = express();
app.use(express.json());

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = [];

