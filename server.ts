import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface StoredUser {
  id: number;
  username: string;
  passwordHash: string;
  is_active: boolean;
  created_at: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "aura_development_secret_key_change_in_production_123456789";
const DB_FILE = path.join(process.cwd(), "aura_local_db.json");

// Simple persistent user store for Phase 1 local container verification
function loadUsers(): StoredUser[] {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading db file:", e);
  }
  return [];
}

function saveUsers(users: StoredUser[]) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing db file:", e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "healthy",
      service: "aura-api",
      version: "1.0.0",
      auth: "active"
    });
  });

  // Auth: Signup
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { username, password, confirm_password } = req.body;

      if (!username || typeof username !== "string" || username.trim().length < 3) {
        return res.status(400).json({ detail: "Username must be at least 3 characters long." });
      }

      const trimmedUsername = username.trim();
      const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
      if (!usernameRegex.test(trimmedUsername)) {
        return res.status(400).json({
          detail: "Username must be 3-30 characters and contain only letters, numbers, hyphens, and underscores."
        });
      }

      if (!password || typeof password !== "string" || password.length < 6) {
        return res.status(400).json({ detail: "Password must be at least 6 characters long." });
      }

      if (password !== confirm_password) {
        return res.status(400).json({ detail: "Passwords do not match." });
      }

      const users = loadUsers();
      const existingUser = users.find(
        (u) => u.username.toLowerCase() === trimmedUsername.toLowerCase()
      );

      if (existingUser) {
        return res.status(400).json({
          detail: "Username already registered. Please choose another username."
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser: StoredUser = {
        id: users.length + 1,
        username: trimmedUsername,
        passwordHash,
        is_active: true,
        created_at: new Date().toISOString()
      };

      users.push(newUser);
      saveUsers(users);

      const token = jwt.sign({ sub: newUser.username, id: newUser.id }, JWT_SECRET, {
        expiresIn: "7d"
      });

      return res.status(201).json({
        access_token: token,
        token_type: "bearer",
        user: {
          id: newUser.id,
          username: newUser.username,
          is_active: newUser.is_active,
          created_at: newUser.created_at
        }
      });
    } catch (err) {
      console.error("Signup error:", err);
      return res.status(500).json({ detail: "Internal server error during registration." });
    }
  });

  // Auth: Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ detail: "Username and password are required." });
      }

      const users = loadUsers();
      const user = users.find(
        (u) => u.username.toLowerCase() === String(username).trim().toLowerCase()
      );

      if (!user) {
        return res.status(401).json({ detail: "Invalid username or password." });
      }

      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) {
        return res.status(401).json({ detail: "Invalid username or password." });
      }

      if (!user.is_active) {
        return res.status(400).json({ detail: "User account is inactive." });
      }

      const token = jwt.sign({ sub: user.username, id: user.id }, JWT_SECRET, {
        expiresIn: "7d"
      });

      return res.json({
        access_token: token,
        token_type: "bearer",
        user: {
          id: user.id,
          username: user.username,
          is_active: user.is_active,
          created_at: user.created_at
        }
      });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ detail: "Internal server error during login." });
    }
  });

  // Auth: Current User (/me)
  app.get("/api/auth/me", (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ detail: "Missing or invalid authorization token." });
      }

      const token = authHeader.split(" ")[1];
      const payload = jwt.verify(token, JWT_SECRET) as any;

      const users = loadUsers();
      const user = users.find((u) => u.username === payload.sub);

      if (!user) {
        return res.status(401).json({ detail: "User not found or session expired." });
      }

      return res.json({
        id: user.id,
        username: user.username,
        is_active: user.is_active,
        created_at: user.created_at
      });
    } catch (err) {
      return res.status(401).json({ detail: "Invalid or expired token." });
    }
  });

  // Vite middleware setup for web preview
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AURA Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
