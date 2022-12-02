import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import './filme.css';

function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: 'd63a2fd538d6bdc3430cdf7ac9d4c628',
            language: 'pt-BR',
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {});
    }
    loadFilme();

    return () => {
      console.log('Componente desmontado');
    };
  }, []);

  if (loading) {
    return (
      <div className="filme-info">
        <div className="c-loader"></div>
        {/* <h2>Carregando o filme...</h2> */}
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
        alt="{filme.title}"
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <br />
      <strong>Avaliação: {filme.vote_average} /10</strong>

      <div className="area-buttons">
        <button>Salvar</button>
        <button>
          <a href="#">Trailer</a>
        </button>
      </div>
    </div>
  );
}
export default Filme;
