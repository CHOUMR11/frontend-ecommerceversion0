import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Insertarticle = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  const [scategorie, setScategorie] = useState([]);

  const getscategories = async () => {
    try {
      const response = await axios.get("http://localhost:13000/api/scategories");
      setScategorie(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des sous-catégories:", error);
    }
  };

  useEffect(() => {
    getscategories();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:13000/api/articles",
        article
      );
      if (response.status === 201) {
        navigate("/articles");
      } else {
        console.error("Erreur lors de la création de l'article", response);
      }
    } catch (error) {
      console.error("Erreur lors de la requête", error);
    }
  };

  return (
    <div>
      <Form>
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h1>Insérer un article</h1>

          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Référence</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer votre Référence"
                value={article.reference || ""}
                onChange={(e) =>
                  setArticle({ ...article, reference: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Désignation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer votre Désignation"
                value={article.designation || ""}
                onChange={(e) =>
                  setArticle({ ...article, designation: e.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrer votre Prix"
                value={article.prix || ""}
                onChange={(e) =>
                  setArticle({ ...article, prix: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Marque</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer votre Marque"
                value={article.marque || ""}
                onChange={(e) =>
                  setArticle({ ...article, marque: e.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrer votre stock"
                value={article.qtestock || ""}
                onChange={(e) =>
                  setArticle({ ...article, qtestock: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer votre Image"
                value={article.imageart || ""}
                onChange={(e) =>
                  setArticle({ ...article, imageart: e.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="12">
              <Form.Label>Sous-catégorie</Form.Label>
              <Form.Control
                as="select"
                value={article.scategorieID || ""}
                onChange={(e) =>
                  setArticle({ ...article, scategorieID: e.target.value })
                }
              >
                <option value="">-- Sélectionner une sous-catégorie --</option>
                {scategorie.map((scat, index) => (
                  <option key={index} value={scat._id}>
                    {scat.nomscategorie}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>

          <button
            type="submit"
            className="btn btn-success btn-sm"
            onClick={handleSave}
          >
            <i className="fa-solid faz-fl"></i> Enregistrer
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

export default Insertarticle;
