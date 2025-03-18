import React, { useContext, useState } from 'react';
import { Row, Col, Card, Typography, Button, Spin, Divider, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { PokemonContext } from '../context/PokemonContext';
import { FavoriteContext } from '../context/FavoriteContext';

const { Title, Text } = Typography;
const { Option } = Select;

const PokemonList = ({ pokemons: propPokemons }) => {
  const { pokemons: contextPokemons, isLoading } = useContext(PokemonContext);
  const { favorites, toggleFavorite } = useContext(FavoriteContext);

  const [searchName, setSearchName] = useState(''); 
  const [selectedType, setSelectedType] = useState(''); 

  const pokemons = propPokemons || contextPokemons;

  // Función para filtrar Pokémon por nombre y tipo
  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesName = pokemon.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesType = selectedType ? pokemon.types.some((type) => type.type.name === selectedType) : true;
    return matchesName && matchesType;
  });

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className='pokemon-list-container'>
      {/* Filtros */}
      <div className="filters-container">
        <Input
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="filter-input"
        />
        <Select
          placeholder="Filter by type"
          value={selectedType}
          onChange={(value) => setSelectedType(value)}
          className="filter-select"
          allowClear
        >
          <Option value="fire">Fire</Option>
          <Option value="water">Water</Option>
          <Option value="grass">Grass</Option>
          <Option value="electric">Electric</Option>
          <Option value="ice">Ice</Option>
          <Option value="fighting">Fighting</Option>
          <Option value="poison">Poison</Option>
          <Option value="ground">Ground</Option>
          <Option value="flying">Flying</Option>
          <Option value="psychic">Psychic</Option>
          <Option value="bug">Bug</Option>
          <Option value="rock">Rock</Option>
          <Option value="ghost">Ghost</Option>
          <Option value="dragon">Dragon</Option>
          <Option value="dark">Dark</Option>
          <Option value="steel">Steel</Option>
          <Option value="fairy">Fairy</Option>
        </Select>
      </div>

      {/* Lista de Pokémon filtrados */}
      <Row gutter={[16, 16]}>
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <Col key={pokemon.name} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Link to={`/details/${pokemon.id}`}>
                <Card
                  hoverable
                  className="pokemon-card"
                  cover={
                    <>
                      <img
                        src={pokemon.sprites.other.home.front_default}
                        alt={pokemon.name}
                        className="pokemon-image"
                      />
                      <Divider style={{ margin: '0' }} />
                    </>
                  }
                >
                  <Button
                    type="text"
                    shape="circle"
                    icon={
                      favorites.includes(pokemon.id) ? (
                        <HeartFilled style={{ color: '#ff4d4f', fontSize: '18px' }} />
                      ) : (
                        <HeartOutlined style={{ color: '#ff4d4f', fontSize: '18px' }} />
                      )
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toggleFavorite(pokemon.id);
                    }}
                    className="favorite-button"
                  />
                  <Text type="secondary" className="pokemon-id">
                    Nº {String(pokemon.id).padStart(3, '0')}
                  </Text>
                  <Title level={4} className="pokemon-name">
                    {pokemon.name}
                  </Title>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <div className="message">
            <p>No results found.</p>
          </div>
        )}
      </Row>
    </div>
  );
};

export default PokemonList;