// vulnerable-test.ts

import express from "express";
import { exec } from "child_process";

const app = express();

// 1. Command Injection
app.get("/ping", (req, res) => {
  const host = req.query.host as string;

  exec(`ping -c 1 ${host}`, (error, stdout) => {
    if (error) {
      return res.status(500).send(error.message);
    }

    res.send(stdout);
  });
});

// 2. Reflected XSS
app.get("/hello", (req, res) => {
  const name = req.query.name as string;

  res.send(`<html><body>Hello ${name}</body></html>`);
});

// 3. Hardcoded Secret
const AWS_ACCESS_KEY = "AKIAEXAMPLE123456789";
const AWS_SECRET_KEY = "example-secret-key";

// 4. SQL Injection
app.get("/user", async (req, res) => {
  const userId = req.query.id as string;

  const query = `SELECT * FROM users WHERE id = '${userId}'`;

  console.log(query);

  res.send({
    query,
  });
});

// 5. Insecure eval
app.post("/calculate", (req, res) => {
  const expression = req.body.expression;

  const result = eval(expression);

  res.json({ result });
});

app.listen(3000, () => {
  console.log("Test server running on port 3000");
});
