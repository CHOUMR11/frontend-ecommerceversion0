import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Editcategorie = () => {
  const { id } = useParams(); // Récupère l'ID de la catégorie depuis l'URL
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState({ nom: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorie = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:13000/api/categories/${id}`);
        setCategorie(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement de la catégorie :", err);
        setError("Impossible de charger la catégorie.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategorie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategorie({ ...categorie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:13000/api/categories/${id}`, categorie);
      alert("Catégorie mise à jour avec succès !");
      navigate('/categories'); // Redirige vers la liste des catégories
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la catégorie :", err);
      setError("Erreur lors de la mise à jour. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h1>Éditer une catégorie</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom de la catégorie
          </label>
          <input
            type="text"
            className="form-control"
            id="nom"
            name="nom"
            value={categorie.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={categorie.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Enregistrer
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/categories')}>
          Annuler
        </button>
      </form>
    </div>
  );
};

export default Editcategorie;
