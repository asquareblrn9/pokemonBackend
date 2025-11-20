import { DataTypes, Model } from "sequelize";
import sequelize from "../index";

export class PokemonList extends Model {
  declare id: number;
  declare data: string;
  declare updated_at: number;
}

PokemonList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "PokemonList",
    timestamps: false,
  }
);
