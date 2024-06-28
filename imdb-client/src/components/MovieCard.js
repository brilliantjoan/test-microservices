import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const MovieCard = (props) => {
    const { movie, index } = props;

    return (
        <div className="movie-card-container" key={index}>
            <img src={movie.cover_image} alt="" className="movie-card-image" />
            <div className="movie-card-description p-2">
                <div className="d-flex mt-1">
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faStar} className="movie-card-favourite" />
                    </div>
                    <div style={{ marginLeft: 10 }}>{movie.rating}</div>
                </div>
                <Link to={"/movie/" + movie.id} className="text-decoration-none" style={{ color: 'gray' }}>
                    <div className="movie-card-title mt-1">{movie.title}</div>
                    <div className="movie-card-button my-2">See more...</div>
                </Link>
            </div>
        </div>
    );
}

export default MovieCard;