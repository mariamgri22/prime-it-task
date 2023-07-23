import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/database";
import { UserAttributes } from "../types/UserAttributes";



class User extends Model<UserAttributes> implements UserAttributes {
  public username!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export default User;
