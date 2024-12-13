import Blog from '../schema/Blog.js';  // Importa el esquema Blog

// Obtener todos los blogs
const getAllBlogsController = async () => {
  if (!Blog) throw new Error("Blogs not found");
  return await Blog.find();
}

// Obtener un blog por ID
const getOneBlogController = async (blogID) => {
  const blog = await Blog.findById(blogID);
  if (!blog) throw new Error("Blog not found");
  return blog;
}

// Crear un nuevo blog
const createBlogController = async (title, content, author) => {
  const newBlog = new Blog({ title, content, author });
  return await newBlog.save();
}

// Actualizar un blog existente
const updateBlogController = async (blogID, title, content, author) => {
  const blogData = { title, content, author };
  const updatedBlog = await Blog.findByIdAndUpdate(blogID, blogData, { new: true });
  if (!updatedBlog) throw new Error("Blog not found");
  return updatedBlog;
}

// Eliminar un blog por ID
const deleteBlogController = async (blogID) => {
  const existBlog = await Blog.findById(blogID);
  if (!existBlog) throw new Error("Blog not found");

  return existBlog.deleteOne();
}

export {
  getAllBlogsController,
  getOneBlogController,
  createBlogController,
  updateBlogController,
  deleteBlogController
}
