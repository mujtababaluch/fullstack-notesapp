import { useState, useEffect } from "react";
import {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
} from "../services/CategoryService";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();

    if (name.trim() === "") return;

    await addCategory({ name: name });

    setName("");
    loadCategories();
  }

  async function handleDelete(id) {
    await deleteCategory(id);
    loadCategories();
  }

  async function handleEdit(id) {
    const newName = prompt("New name:");
    if (!newName || newName.trim() === "") return;

    await updateCategory(id, { name: newName });
    loadCategories();
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold">Categories</h2>

      <form
        onSubmit={handleAdd}
        className="bg-white rounded-xl shadow-sm p-5 mt-6 flex gap-3"
      >
        <input
          type="text"
          placeholder="Enter category name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm"
        />
        <button className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg">
          Add
        </button>
      </form>

      <p className="text-gray-600 mt-6">
        Total Categories: {categories.length}
      </p>

      {categories.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No categories yet. Add one above.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {categories.map((category) => (
          <div key={category._id} className="bg-white rounded-xl shadow-sm p-5">
            <h4 className="font-semibold">{category.name}</h4>
            <button
              onClick={() => handleEdit(category._id)}
              className="text-sm text-blue-600 mt-2 mr-4"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(category._id)}
              className="text-sm text-red-600 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoriesPage;
