import React, { useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Insertcategorie = () => {
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState({
    nomcategorie: '',
    description: '',
    image: ''
  });

  // Gestion de la soumission du formulaire
  const handleSave = async (e) => {
    e.preventDefault();

    // Validation simple des champs
    if (!categorie.nomcategorie || !categorie.description || !categorie.image) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:13000/api/categories", categorie);
      if (res.status === 201) {
        navigate("/categories"); // Rediriger vers la liste des catégories
      } else {
        console.error("Erreur lors de la création de la catégorie:", res);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <Form>
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h1>Insérer une catégorie</h1>

          <Row>
            <Form.Group as={Col} md="12">
              <Form.Label>Nom de la catégorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer le nom de la catégorie"
                value={categorie.nomcategorie}
                onChange={(e) =>
                  setCategorie({ ...categorie, nomcategorie: e.target.value })
                }
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="12">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Entrer la description de la catégorie"
                value={categorie.description}
                onChange={(e) =>
                  setCategorie({ ...categorie, description: e.target.value })
                }
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="12">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer l'URL de l'image"
                value={categorie.image}
                onChange={(e) =>
                  setCategorie({ ...categorie, image: e.target.value })
                }
              />
            </Form.Group>
          </Row>

          <button
            type="submit"
            className="btn btn-success btn-sm mt-3"
            onClick={handleSave}
          >
            Enregistrer
          </button>
          &nbsp;
          <Link className="btn btn-danger mx-2 mt-3" to="/categories">
            Annuler
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Insertcategorie;
