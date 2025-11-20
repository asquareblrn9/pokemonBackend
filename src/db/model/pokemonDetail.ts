import { DataTypes, Model } from "sequelize";
import sequelize from "../index";

export class PokemonDetail extends Model {
  declare name: string;
  declare data: string;
  declare updated_at: number;
}

PokemonDetail.init(
  {
    name: {
      type: DataTypes.STRING,
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
    tableName: "PokemonDetail",
    timestamps: false,
  }
);
