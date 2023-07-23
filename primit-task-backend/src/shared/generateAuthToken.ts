import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString("hex");
};

const JWT_SECRET: string = generateJWTSecret();

const generateAuthToken = (id: any) => {
  const token: string = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export { generateAuthToken, JWT_SECRET };
