import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Editscategorie = () => {
  const { id } = useParams(); // Récupère l'ID de la sous-catégorie depuis l'URL
  const navigate = useNavigate();
  const [sscategorie, setSousCategorie] = useState({ nom: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSousCategorie = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:13000/api/scategories/${id}`);
        setSousCategorie(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement de la sous-catégorie :", err);
        setError("Impossible de charger la sous-catégorie.");
      } finally {
        setLoading(false);
      }
    };
    fetchSousCategorie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSousCategorie({ ...sscategorie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:13000/api/scategories/${id}`, sscategorie);
      alert("Sous-catégorie mise à jour avec succès !");
      navigate('/scategories'); // Redirige vers la liste des sous-catégories
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la sous-catégorie :", err);
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
      <h1>Éditer une sous-catégorie</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">
            Nom de la sous-catégorie
          </label>
          <input
            type="text"
            className="form-control"
            id="nom"
            name="nom"
            value={sscategorie.nom}
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
            value={sscategorie.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Enregistrer
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/scategories')}>
          Annuler
        </button>
      </form>
    </div>
  );
};

export default Editscategorie;
