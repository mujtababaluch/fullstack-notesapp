import { Link } from "react-router-dom";
import { FaPlus, FaRegFolder } from "react-icons/fa";

function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 mt-6">
      <div className="rounded-xl bg-[url('/hero.png')] bg-cover bg-right px-8 py-12 md:px-12">
        <p className="text-sm text-gray-600 font-medium uppercase">Good Morning,</p>

        <h2 className="text-4xl font-bold mt-1">Aman Kumar</h2>

        <p className="text-gray-600 mt-3 max-w-md">
          Capture your ideas, organize them into categories, and access your
          notes anytime, anywhere.
        </p>

        <div className="flex flex-wrap gap-3 mt-6 text-sm">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-lg">
            <FaPlus /> Create New Note
          </button>

          <Link
            to="/categories"
            className="flex items-center gap-2 bg-white/60 border border-gray-300 hover:bg-white font-medium px-5 py-3 rounded-lg"
          >
            <FaRegFolder /> View Categories
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
