import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';

const Editarticle = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID de l'article depuis l'URL
  const [article, setArticle] = useState({
    reference: '',
    designation: '',
    prix: '',
    marque: '',
    qtestock: '',
    imageart: '',
    scategorieID: ''
  });
  const [scategorie, setScategorie] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer l'article en fonction de l'ID
  const getArticle = async () => {
    try {
      const response = await axios.get(`http:localhost:13000/api/articles/${id}`);
      setArticle(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement de l\'article:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour récupérer les sous-catégories
  const getscategories = async () => {
    try {
      const response = await axios.get('http:localhost:13000/api/scategories');
      setScategorie(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des sous-catégories:', error);
    }
  };

  // Charge les données de l'article et des sous-catégories dès que le composant est monté
  useEffect(() => {
    getArticle();
    getscategories();
  }, [id]); // Le useEffect se déclenche lorsque l'ID change

  // Fonction pour mettre à jour l'article
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`http:localhost:13000/api/articles/${id}`, article);
      if (res.status === 200) {
        navigate('/articles'); // Redirige vers la liste des articles après la mise à jour
      } else {
        console.error('Erreur lors de la mise à jour de l\'article:', res);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'article:', error);
    } finally {
      setLoading(false);
    }
  };

  // Affiche un message de chargement si l'article est encore en cours de récupération
  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <Form onSubmit={handleUpdate}>
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h1>Modifier un article</h1>

          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Référence</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer votre Référence"
                value={article.reference}
                onChange={(e) => setArticle({ ...article, reference: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Désignation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer votre Désignation"
                value={article.designation}
                onChange={(e) => setArticle({ ...article, designation: e.target.value })}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrer votre Prix"
                value={article.prix}
                onChange={(e) => setArticle({ ...article, prix: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Marque</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer votre Marque"
                value={article.marque}
                onChange={(e) => setArticle({ ...article, marque: e.target.value })}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrer votre stock"
                value={article.qtestock}
                onChange={(e) => setArticle({ ...article, qtestock: e.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer votre Image"
                value={article.imageart}
                onChange={(e) => setArticle({ ...article, imageart: e.target.value })}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="12">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                as="select"
                value={article.scategorieID}
                onChange={(e) => setArticle({ ...article, scategorieID: e.target.value })}
              >
                <option>--sélectionner une sous catégorie</option>
                {scategorie.map((scat) => (
                  <option key={scat._id} value={scat._id}>
                    {scat.nomscategorie}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>

          <button type="submit" className="btn btn-success btn-sm">
            <i className="fa-solid fa-fl"></i> Update
          </button>
          &nbsp;
          <Link className="btn btn-danger mx-2" to="/articles">
            Annuler
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Editarticle;
