import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-[500px]">
      {/* Sección de Imagen */}
      <div className="h-full">
        <img
          src="/nosotros.jpg"
          alt="Sobre nosotros"
          className="h-full w-full object-cover"
        />
      </div>
      {/* Sección de Texto */}
      <div className="flex flex-col justify-center bg-orange-600 py-12 px-8 lg:px-16 h-full">
      <h2 className="text-3xl text-white font-bold italic mb-6">¿Quiénes Somos?</h2>
        <p className="text-white text-lg mb-6">
        En Guitar LA, somos un equipo de músicos y entusiastas de la guitarra con la misión de ofrecerte lo mejor en instrumentos musicales. Fundada por amantes de la música, nuestra empresa se dedica a proporcionar guitarras de alta calidad, accesorios y todo lo necesario para que tanto principiantes como profesionales puedan explorar su pasión musical. Creemos que cada guitarra tiene su propia historia y nos enorgullece ser parte de la tuya, ayudándote a llevar tu música al siguiente nivel.
        </p>
        <Link to="/about_us" className="flex justify-end">
          <button
            type="button"
           className="uppercase font-bold bg-transparent border border-white text-white px-4 py-2 hover:bg-white hover:text-orange-600 transition duration-300 rounded-xl"
          >
            Más información
          </button>
        </Link>
      </div>
    </div>
  );
}
