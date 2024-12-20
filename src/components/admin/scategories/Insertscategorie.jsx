import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Insertscategorie = () => {
  const navigate = useNavigate();
  const [sousCategorie, setSousCategorie] = useState({
    nom: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSousCategorie({ ...sousCategorie, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('http:localhost:13000/api/scategories', sousCategorie);
      alert('Sous-catégorie ajoutée avec succès !');
      navigate('/souscategories'); // Redirection vers la liste des sous-catégories
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la sous-catégorie :', err);
      setError('Une erreur s\'est produite lors de l\'ajout de la sous-catégorie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Ajouter une Sous-Catégorie</h1>
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
            value={sousCategorie.nom}
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
            value={sousCategorie.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'En cours...' : 'Ajouter'}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/souscategories')}
        >
          Annuler
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default Insertscategorie;
