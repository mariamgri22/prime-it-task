import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../shared/generateAuthToken";
import UserServices from "../services/userService";
import { ValidationException } from "../shared/ValidationExcaption"
import { AuthException } from "../shared/AuthException";

async function signUp(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ValidationException(errors.array()));
  }

  try {
    const { user } = await UserServices.create(req.body);
    res.send({ user, message: "user_create_success" });
  } catch (err) {
    next(err);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ValidationException(errors.array()));
  }

  try {
    const { email, password } = req.body;
    const user = await UserServices.findByEmail(email);

    if (!user) {
      return next(new AuthException("login_failed"));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return next(new AuthException("login_failed"));
    }

    const token = generateAuthToken(user);

    res.send({ token, message: "login_success" });
  
  } catch (err) {
    next(err);
  }
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token not provided." });
    }

    const user = await UserServices.getUserFromToken(token);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const { username, email } = user;
    res.json({ username, email });
  } catch (err) {
    next(err);
  }
}

export default {
  signUp,
  login,
  getUser,
};
