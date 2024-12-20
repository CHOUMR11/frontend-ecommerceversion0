import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

const Listcategorie = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:13000/api/categories");
      setCategories(res.data);
      setIsLoading(false);
    } catch (error) {
      setError("Échec de la récupération des catégories. Veuillez réessayer plus tard.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      try {
        await axios.delete(`http://localhost:13000/api/categories/${id}`);
        setCategories(categories.filter(cat => cat._id !== id));
      } catch (error) {
        setError("Échec de la suppression de la catégorie. Veuillez réessayer.");
      }
    }
  };

  if (isLoading) {
    return <center><ReactLoading type="spokes" color="blue" height={300} width={200} /></center>;
  }

  return (
    <div>
      <h1>Liste des Catégories</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <Link to="/categories/add">
        <button className="btn btn-success">
          <i className="fas fa-plus"></i> Ajouter une Catégorie
        </button>
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat._id}>
              <td>{cat.nomcategorie}</td>
              <td><img src={cat.imagecategorie} width={80} alt={cat.nomcategorie} /></td>
              <td>
                <Link to={`/categories/edit/${cat._id}`}>
                  <button className="btn btn-primary">
                    <i className="fas fa-edit"></i> Modifier
                  </button>
                </Link>
                <button className="btn btn-danger" onClick={() => handleDelete(cat._id)}>
                  <i className="fas fa-trash"></i> Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listcategorie;
