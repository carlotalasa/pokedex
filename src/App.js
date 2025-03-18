import React from 'react';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import FavoritesPage from './pages/FavoritesPage';
import { FavoriteProvider } from './context/FavoriteContext'; 
import { PokemonProvider } from './context/PokemonContext';

const { Content } = Layout;

function App() {
  return (
    <PokemonProvider>
      <FavoriteProvider> 
        <Router>
          <Layout>
            <Navbar />
            <Content style={{ padding: '24px' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/favorites" element={<FavoritesPage />} />
              </Routes>
            </Content>
          </Layout>
        </Router>
      </FavoriteProvider>
    </PokemonProvider>
  );
}

export default App;