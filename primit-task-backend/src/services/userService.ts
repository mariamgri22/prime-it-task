import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../shared/generateAuthToken";
import { UserAttributes } from "../types/UserAttributes";


const create = async (body: UserAttributes) => {
  const { username, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return { user };
};

const findByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

async function getUserFromToken(token: string) {
  const decodedToken = jwt.verify(token, JWT_SECRET) as { id: { id: number } };
  console.log(decodedToken);
  const user = await User.findByPk(decodedToken.id.id);
  return user;
}

export default {
  create,
  findByEmail,
  getUserFromToken,
};
