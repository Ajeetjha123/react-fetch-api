import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  function fetchMoviesHandler() {
    setIsLoading(true);
    fetch('https://swapi.dev/api/films')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const transformedMovies = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Fetching Error...', error);
        setIsLoading(false);
        if (retrying) {
          setTimeout(fetchMoviesHandler, 5000);
        }
      });
  }

  function handleRetry() {
    setRetrying(true);
    fetchMoviesHandler();
  }

  function handleCancelRetry() {
    setRetrying(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={retrying ? handleCancelRetry : handleRetry}>
          {retrying ? 'Cancel Retry' : 'Retry Fetch'}
        </button>
      </section>
      <section>
        {isLoading ? (
          <div className='loader'>Loading...</div>
        ) : (
          <MoviesList movies={movies} />
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
