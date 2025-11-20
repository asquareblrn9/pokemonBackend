import { DataTypes, Model } from "sequelize";
import sequelize from "../index";

export class Favorite extends Model {
  declare name: string;
}

Favorite.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Favorites",
    timestamps: false,
  }
);
