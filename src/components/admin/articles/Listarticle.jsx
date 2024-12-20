import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

const Listarticle = () => {
  const [articles, setArticles] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetcharticles = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:13000/api/articles");
      const articlesData = Array.isArray(res.data) ? res.data : [];
      setArticles(articlesData);
    } catch (error) {
      console.error("Erreur lors du chargement des articles :", error);
      setError("Erreur lors du chargement des articles.");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcharticles();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?");
    if (!confirmed) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:13000/api/articles/${id}`);
      setArticles(articles.filter(art => art._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ReactLoading type="spokes" color="#0d6efd" height={100} width={100} />
      </div>
    );
  }

  return (
    <div>
      <button onClick={fetcharticles} className="btn btn-primary mb-3">
        <i className="fas fa-sync-alt"></i> Actualiser
      </button>
      <center><h1>Liste des Articles</h1></center>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <Link to="/articles/add" className="btn btn-success">
          <i className="fas fa-plus"></i> Ajouter un article
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Références</th>
            <th>Désignation</th>
            <th>Marque</th>
            <th>Stock</th>
            <th>Prix</th>
            <th>Image</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(articles) && articles.length > 0 ? (
            articles.map((art) => (
              <tr key={art._id}>
                <td>{art.reference}</td>
                <td>{art.designation}</td>
                <td>{art.marque}</td>
                <td>{art.qtestock}</td>
                <td>{art.prix}</td>
                <td>
                  <img src={art.imageart} alt={`Image de ${art.designation}`} width={100} height={100} />
                </td>
                <td>
                  <Link to={`/articles/edit/${art._id}`} className="btn btn-warning btn-sm">
                    <i className="fas fa-edit"></i> Modifier
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(art._id)}
                  >
                    <i className="fas fa-trash"></i> Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                Aucun article trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Listarticle;
