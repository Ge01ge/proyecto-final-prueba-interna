import { Route, Routes } from "react-router-dom";
import axios from 'axios';

/* Common */
import HeaderNavbar from "./components/common/HeaderNavbar";
import Footer from "./components/common/Footer";
/* Sections */
import Features from "./components/home/Features";
import Offers from "./components/home/Offers";
import AboutUs from "./components/home/AboutUs";
import Blogs from "./components/home/Blogs";
import Testimonials from "./components/home/Testimonials";
/* Pages */
import AboutUsPage from "./components/pages/AboutUsPage";
import ProductsStoragePage from "./components/pages/ProductsStorePage";
import ProductIDetailsPage from "./components/pages/ProductIDetailsPage";
import BlogsPage from "./components/pages/BlogsPage";
import ContactPage from "./components/pages/ContactPage";
/* Dashboard */
import DashboardProducts from "./components/dashboard/DashboardProducts";
import DashboardBlogs from "./components/dashboard/DashboardBlogs";  // Página que lista los blogs en el dashboard
// Formulario para crear y editar blogs
import CreateBlogForm from './components/forms/CreateBlogForm';
import EditBlogForm from './components/forms/EditBlogForm';

/* Auth */
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
/* Utilities */
import ScrollToTop from "./utilities/ScrollToTop";

function App() {
  const handleBlogSubmit = async (formData: FormData, id?: string) => {
    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/blogs/update/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert('Blog actualizado con éxito.');
      } else {
        await axios.post(`http://localhost:3000/api/blogs/create`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert('Blog creado con éxito.');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      alert('Hubo un error al procesar la solicitud.');
    }
  }
  
  return (
    <>
      <ScrollToTop />
      <HeaderNavbar />

      <Routes>
        {/* Rutas públicas - Páginas principales del sitio */}
        <Route
          path="/"
          element={
            <>
              <Features />
              <AboutUs />
              <Offers />
              <Blogs />
              <Testimonials />
            </>
          }
        />
        <Route path="/about_us" element={<AboutUsPage />} />
        <Route path="/products" element={<ProductsStoragePage />} />
        <Route path="/product/:id" element={<ProductIDetailsPage />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blogs" element={<BlogsPage />} /> {/* Página que muestra los blogs */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas del Dashboard para los administradores */}
        <Route path="/dashboard/products" element={<DashboardProducts />} /> {/* Dashboard de productos */}

        {/* Dashboard de Blogs - Página que lista los blogs 
        */}
        <Route path="/dashboard/blogs" element={<DashboardBlogs />} />

        {/* Formulario para crear un nuevo blog */}
        <Route
          path="/create-blog"
          element={<CreateBlogForm onSubmit={(formData) => handleBlogSubmit(formData)} />}
        />
        {/* Formulario para editar un blog existente */}
        <Route
          path="/edit-blog/:id"
          element={<EditBlogForm onSubmit={(formData) => handleBlogSubmit(formData)} />}
        />        {/* Usamos :id para capturar el ID del blog */}

      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
