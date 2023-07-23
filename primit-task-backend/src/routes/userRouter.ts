import express from "express";
import { body } from "express-validator";
import userController from "../controllers/userController";

import UserServices from "../services/userService";
import fbController from "../controllers/fbController";



const router = express.Router();

router.post(
  "/sign-up",
  body("username")
    .notEmpty()
    .withMessage("username_null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("username_size"),
  body("email")
    .isEmail()
    .withMessage("email_invalid")
    .bail()
    .custom(async (email: string) => {
      const user = await UserServices.findByEmail(email);
      if (user) {
        throw new Error("email_inuse");
      }
    }),
    userController.signUp
);

router.post(
  "/login",
  body("email").isEmail().withMessage("email_invalid"),
  body("password").notEmpty().withMessage("password_null"),
  userController.login
);

router.get("/facebook-login-url",fbController.getFacebookLoginURL);

router.get("/oauth-redirect", fbController.OAuthRedirect);

router.get("/me", fbController.getMe);

router.get("/user", userController.getUser);

export default router;
