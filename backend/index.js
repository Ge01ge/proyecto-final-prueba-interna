import connectMongoDB from './src/model/connectMongoDB.js';
import app from './src/server.js'
import dotenv from 'dotenv';

import blogRouter from './src/routes/blogRoutes.js'; // Importa las rutas de blog

dotenv.config();

const serverApp = app;

const PORT = process.env.PORT || 3001;

// Usar las rutas del blog en la ruta base /api/blogs
serverApp.use('/api/blogs', blogRouter);

const main = async () => {
  try {
    await connectMongoDB();
    serverApp.listen(PORT, () => {
      console.log(`Server listened on PORT: ${PORT}`)
    })
  } catch (error) {
    console.log(`Error connecting to the server. ${error.message}`)
  }
}

main();