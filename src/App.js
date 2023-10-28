import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
      fetchMoviesHandeler();
  }, [])
  function fetchMoviesHandeler() {
    setIsLoading(true);
    fetch('https://swapi.dev/api/films')
    .then(response => {
       return response.json();
    })
    .then(data => {
     const transformedMoives = data.results.map(movieData => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
     }) 
     setMovies(transformedMoives);
     setIsLoading(false);
    })
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandeler}>Fetch Movies</button>
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
