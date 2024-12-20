import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Editscategorie from './components/admin/scategories/Editscategorie';
import Insertscategorie from './components/admin/scategories/Insertscategorie';
import Listscategorie from './components/admin/scategories/Listscategorie';
import Editcategorie from './components/admin/categories/Editcategorie';
import Insertcategorie from './components/admin/categories/Insertcategorie';
import Listcategorie from './components/admin/categories/Listcategorie'; // Corrected route
import Listarticle from './components/admin/articles/Listarticle'; 
import Insertarticle from './components/admin/articles/Insertarticle';
import Editarticle from './components/admin/articles/Editarticle';
import Menu from './components/admin/Menu';
import Home from './components/admin/Home';
import "@fortawesome/fontawesome-free/css/all.css";

const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        {/* Routes for articles */}
        <Route path="/articles" element={<Listarticle />} />
        <Route path="/articles/add" element={<Insertarticle />} />
        <Route path="/articles/edit/:id" element={<Editarticle />} />

        {/* Route for the homepage */}
        <Route path="/" element={<Home />} />

        {/* Routes for categories */}
        <Route path="/categories" element={<Listcategorie />} /> {/* Corrected route */}
        <Route path="/categories/add" element={<Insertcategorie />} />
        <Route path="/categories/edit/:id" element={<Editcategorie />} />

        {/* Routes for subcategories */}
        <Route path="/scategories" element={<Listscategorie />} />
        <Route path="/scategories/add" element={<Insertscategorie />} />
        <Route path="/scategories/edit/:id" element={<Editscategorie />} />

        {/* Wildcard route for handling invalid paths */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
