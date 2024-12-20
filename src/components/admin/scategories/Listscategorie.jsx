import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

const Listscategorie = () => {
  const [scategories, setScategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchScategories = async () => {
    try {
      const res = await axios.get("http://localhost:13000/api/scategories");
      setScategories(res.data);
      setIsLoading(false);
    } catch (error) {
      setError("Une erreur est survenue lors du chargement des sous-catégories.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?")) {
      try {
        await axios.delete(`http://localhost:13000/api/scategories/${id}`);
        setScategories(scategories.filter(scat => scat._id !== id));
      } catch (error) {
        setError("Une erreur est survenue lors de la suppression de la sous-catégorie.");
      }
    }
  };

  if (isLoading) {
    return <center><ReactLoading type="spokes" color="blue" height={300} width={200} /></center>;
  }

  return (
    <div>
      <h1>Liste des Sous-Catégories</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <Link to="/scategories/add">
        <button className="btn btn-success">
          <i className="fas fa-plus"></i> Ajouter une Sous-Catégorie
        </button>
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Catégorie Principale</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {scategories.map(scat => (
            <tr key={scat._id}>
              <td>{scat.nomscategorie}</td>
              <td>{scat.categorieID.nomcategorie}</td>
              <td><img src={scat.imagescategorie} width={80} alt={scat.nomscategorie} /></td>
              <td>
                <Link to={`/scategories/edit/${scat._id}`}>
                  <button className="btn btn-primary">
                    <i className="fas fa-edit"></i> Modifier
                  </button>
                </Link>
                <button className="btn btn-danger" onClick={() => handleDelete(scat._id)}>
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

export default Listscategorie;
