import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetails } from '../services/api';
import { Card, Typography, Button, Spin } from 'antd'; 
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

const Details = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const data = await getPokemonDetails(id);
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f0f2f5',
        }}
      >
        <Spin size="large" /> 
      </div>
    );
  }

  if (!pokemon) {
    return <div>No Pokémon found.</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
        padding: '12px',
        minHeight: '84vh',
      }}
    >
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{
          position: 'fixed',
          top: '84px',
          left: '20px',
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      />

      <Card
        style={{
          width: '300px',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          border: '2px solid #e8e8e8',
          textAlign: 'center',
        }}
        cover={
          <img
            src={pokemon.sprites.other.home.front_default}
            alt={pokemon.name}
            style={{ width: '100%', height: 'auto', padding: '10px' }}
          />
        }
      >
        <Title level={3} style={{ textTransform: 'capitalize', marginBottom: '0' }}>
          {pokemon.name}
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Nº {String(pokemon.id).padStart(3, '0')}
        </Text>

        <div style={{ margin: '10px 0' }}>
          {pokemon.types.map((type) => (
            <Text
              key={type.type.name}
              style={{
                display: 'inline-block',
                margin: '0 5px',
                padding: '5px 10px',
                borderRadius: '15px',
                backgroundColor: typeColors[type.type.name] || '#f0f0f0',
                color: '#fff',
                textTransform: 'capitalize',
              }}
            >
              {type.type.name}
            </Text>
          ))}
        </div>

        <div style={{ textAlign: 'left', marginTop: '10px' }}>
          <Text strong>Weight:</Text> {pokemon.weight / 10} kg <br />
          <Text strong>Height:</Text> {pokemon.height / 10} m <br />
          <Text strong>Abilities:</Text>{' '}
          {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
        </div>
      </Card>
    </div>
  );
};

export default Details;