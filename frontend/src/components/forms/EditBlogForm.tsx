import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BlogsForm.css';

interface EditBlogFormProps {
  initialData?: {
    title: string;
    content: string;
    author: string;
    image?: File | null;
  } | null; // Permitir null además de undefined
  onSubmit: (data: FormData) => Promise<void>; // Agregar Promise<void> si es asíncrona
}

const EditBlogForm: React.FC<EditBlogFormProps> = ({ initialData }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Para redirigir después de actualizar

  const [title, setTitle] = useState<string>(initialData?.title || '');
  const [content, setContent] = useState<string>(initialData?.content || '');
  const [author, setAuthor] = useState<string>(initialData?.author || '');
  const [image, setImage] = useState<File | null>(initialData?.image || null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!initialData && !!id);

  useEffect(() => {
    if (!initialData && id) {
      const fetchBlog = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/blogs/${id}`);
          const { title, content, author } = response.data;
          setTitle(title);
          setContent(content);
          setAuthor(author);
        } catch (error) {
          console.error('Error al cargar el blog:', error);
          setError('No se pudo cargar el blog para editar.');
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !author) {
      setError('Todos los campos son requeridos');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('author', author);

      if (image) {
        formData.append('image', image);
      }

      await axios.put(`http://localhost:3000/api/blogs/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Redirigir después de la actualización
      alert('Blog actualizado con éxito.');
      navigate('/dashboard/blogs');
    } catch (error) {
      console.error('Error al actualizar el blog:', error);
      setError('No se pudo actualizar el blog.');
    }
  };

  if (loading) {
    return <p>Cargando datos del blog...</p>;
  }

  return (
    <div className="contain py-16 px-8">
      <h1 className="text-4xl text-center text-orange-600 mb-12 font-bold">Editar Blog</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Contenido</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea"
          />
        </div>
        <div className="form-group">
          <label className="label">Autor</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Imagen</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            className="input"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="submit-button">
          Actualizar Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlogForm;
