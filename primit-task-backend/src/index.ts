import sequelize from "./config/database";
import app from "./app";

sequelize.sync();

const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
