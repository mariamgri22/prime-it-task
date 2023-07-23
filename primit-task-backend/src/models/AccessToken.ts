import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { AccessTokenAttributes } from "../types/AccessTokenAttributes";

class AccessToken
  extends Model<AccessTokenAttributes>
  implements AccessTokenAttributes
{
  public _id!: string;
}

AccessToken.init(
  {
    _id: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "AccessToken",
  }
);

export default AccessToken;
