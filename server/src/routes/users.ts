import express, { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

const router: Router = express.Router();

// Get all users
router.get("/all", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get user by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get all children
router.get("/children/all", async (req: Request, res: Response) => {
  try {
    const children = await User.find({ role: "child" });
    res.json(children);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get child by ID
router.get("/children/:id", async (req: Request, res: Response) => {
  try {
    const child = await User.findOne({ _id: req.params.id, role: "child" });
    if (!child) {
      throw new Error("Child not found");
    }
    res.json(child);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get all parents
router.get("/parents/all", async (req: Request, res: Response) => {
  try {
    const parents = await User.find({ role: "parent" });
    res.json(parents);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.post("/update-points-money", async (req: Request, res: Response) => {
  const { childId, points, money, reason } = req.body;

  try {
    const child = await User.findOne({ _id: childId, role: "child" });
    if (!child) {
      throw new Error("Child not found");
    }

    // Update points and money
    child.points += points;
    child.money += money;

    // Add to point history
    child.pointHistory.push({ points, reason, date: new Date() });

    await child.save();

    res.status(200).send("Points and money updated successfully");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.put("/update/:id", async (req: Request, res: Response) => {
  const { firstName, lastName, username, password, role } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }

    // Update user details
    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName;
    user.username = username ?? user.username;
    user.role = role ?? user.role;

    // Hash and update password if provided
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.status(200).send("User updated successfully");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default router;
