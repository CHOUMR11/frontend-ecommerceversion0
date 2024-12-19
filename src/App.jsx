import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Editscategorie from './components/admin/scategories/Editscategorie';
import Insertscategorie from './components/admin/scategories/Insertscategorie';
import Listscategorie from './components/admin/scategories/Listscategorie';
import Editcategorie from './components/admin/categories/Editcategorie';
import Insertcategorie from './components/admin/categories/Insertcategorie';
import Listarticle from './components/admin/articles/Listarticle'; // Correction
import Insertarticle from './components/admin/articles/Insertarticle';
import Editarticle from './components/admin/articles/Editarticle';
import Menu from './components/admin/Menu';
import Home from './components/admin/Home';

const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        {/* Routes pour les articles */}
        <Route path="/articles" element={<Listarticle />} />
        <Route path="/articles/add" element={<Insertarticle />} />
        <Route path="/articles/edit/:id" element={<Editarticle />} />

        {/* Route pour la page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Routes pour les catégories */}
        <Route path="/categories" element={<Listarticle />} />
        <Route path="/categories/add" element={<Insertcategorie />} />
        <Route path="/categories/edit/:id" element={<Editcategorie />} />

        {/* Routes pour les sous-catégories */}
        <Route path="/scategories" element={<Listscategorie />} />
        <Route path="/scategories/add" element={<Insertscategorie />} />
        <Route path="/scategories/edit/:id" element={<Editscategorie />} />
      </Routes>
    </Router>
  );
};

export default App;
