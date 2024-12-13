import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogsForm.css';

interface CreateBlogFormProps {
  onSubmit: (data: FormData) => void;
}

const CreateBlogForm: React.FC<CreateBlogFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de campos requeridos
    if (!title || !content || !author) {
      setError('Todos los campos son requeridos');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);

    if (image) {
      formData.append('image', image); // Se agrega la imagen al FormData
    }

    try {
      // Llama al prop `onSubmit` pasado desde el padre
      await onSubmit(formData);

      // Redirige al dashboard de blogs después del envío
      navigate('/dashboard/blogs');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setError('No se pudo enviar el formulario.');
    }
  };

  return (
    <div className="contain py-16 px-8">
      <h1 className="text-4xl text-center text-orange-600 mb-12 font-bold">Crear Blog</h1>
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
        <button type="submit" className="submit-button">Crear Blog</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
