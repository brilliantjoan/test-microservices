import axios from 'axios';
import { useEffect, useState } from 'react';

import MovieCard from "../components/MovieCard";
import config from '../config/config';

const Home = () => {
  const [movie, setMovie] = useState();

  useEffect(() => {
    getAllMovies();
  }, [])

  const getAllMovies = async () => {
    let response = await axios.get(config.gatewayUrl + 'movie')
    if (response.status === 200) {
      setMovie(response.data.data);
    }
  }

  return (
    <div className="container">
      <div className="my-4 h3" style={{ fontWeight: 'bold', color: 'orange' }}>
        Top Picks
      </div>
      <div className="movie-container">
        {movie && movie.map((mov, index) => {
          return (
            <MovieCard movie={mov} key={index} />
          )
        })}
      </div>
    </div>
  );
}

export default Home;
