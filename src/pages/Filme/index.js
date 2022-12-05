import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme.css';

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
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
        .catch(() => {
          console.log('Filme não encontrado');
          navigate('/', { replace: true });
          return;
        });
    }

    loadFilme();

    return () => {
      console.log('Componente desmontado');
    };
  }, [navigate, id]);

  function salvaFilme() {
    const minhaLista = localStorage.getItem('@primeflix');

    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id,
    );
    if (hasFilme) {
      alert('Filme Já está na lista');
      return;
    }
    filmesSalvos.push(filme);
    localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
    alert('Filme salvo com sucesso');
  }

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
        <button onClick={salvaFilme}>Salvar</button>
        <button>
          <a
            href={`https://youtube.com/results?search_query=${filme.title} trailer`}
            target="blank"
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
export default Filme;
