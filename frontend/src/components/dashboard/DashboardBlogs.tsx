import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PencilSquareIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid"; // Importar íconos
import axios from "axios";

// Definir la interfaz Blog
interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
}

export default function DashboardBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]); // Lista de blogs
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Cambiar según lógica de autenticación
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false); // Estado del modal de confirmación
  const [blogIdToDelete, setBlogIdToDelete] = useState<string | null>(null); // ID del blog a eliminar

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error al cargar los blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
    setIsAuthenticated(true);
  }, []);

  const handleDelete = (id: string) => {
    setBlogIdToDelete(id);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDeleteBlog = async () => {
    if (blogIdToDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/blogs/${blogIdToDelete}`);
        setBlogs(blogs.filter((blog) => blog._id !== blogIdToDelete));
        setIsConfirmDeleteOpen(false);
        setBlogIdToDelete(null);
        alert("Blog eliminado exitosamente.");
      } catch (error) {
        console.error("Error al eliminar el blog:", error);
        alert("No se pudo eliminar el blog.");
      }
    }
  };

  if (!isAuthenticated) {
    return <p>No tienes permisos para acceder a esta sección.</p>;
  }

  if (loading) return <p>Cargando blogs...</p>;

  return (
    <div className="py-16 px-8">
      <h2 className="text-4xl text-center text-orange-600 mb-12 font-bold">
        Administración de Blogs
      </h2>
      <button
        onClick={() => navigate("/dashboard/blogs/create-blog")}
        className="fixed bottom-4 right-4 p-4 rounded-full bg-blue-600 text-white"
      >
        <PlusIcon className="h-12 w-12" />
      </button>

      <table className="min-w-full border border-collapse mx-auto">
        <thead>
          <tr className="bg-gray-300">
            <th className="border col-span-3">Título</th>
            <th className="border col-span-4">Contenido</th>
            <th className="border col-span-3">Autor</th>
            <th className="border col-span-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="bg-white">
              <td className="p-4 border border-gray-300">{blog.title}</td>
              <td className="p-4 border border-gray-300 max-w-sm">{blog.content}</td>
              <td className="p-4 border border-gray-300">{blog.author}</td>
              <td className="text-center p-4">
                <button onClick={() => navigate(`/edit-blog/${blog._id}`)}>
                  <PencilSquareIcon className="h-6 w-6 text-green-600 mr-2 hover:text-green-500 transition duration-300" />
                </button>
                <button onClick={() => handleDelete(blog._id)}>
                  <TrashIcon className="h-6 w-6 text-red-600 mr-2 hover:text-red-500 transition duration-300" />
                </button>
              </td>
            </tr>
          ))}
          {/* Fila para crear un nuevo blog */}
          <tr>
            <td colSpan={4} className="text-center py-4">
              <button
                onClick={() => navigate("/create-blog")}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Crear Blog
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Modal de Confirmación */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 shadow-xl">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Confirmar Eliminación
            </h3>
            <p>¿Estás seguro de que deseas eliminar este blog?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsConfirmDeleteOpen(false)}
                className="mr-2 bg-gray-400 text-white py-2 px-4 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteBlog}
                className="bg-red-600 text-white py-2 px-4 rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
