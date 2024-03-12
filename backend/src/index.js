import app from "./app.js";
import { sequelize } from "./database/database.js";

const main = async () => {
  try {
    // Conexión base de datos
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully");

    //puerto de conexion
    const port = process.env.PORT || 3001;

    //Inicializacion de servidor
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
