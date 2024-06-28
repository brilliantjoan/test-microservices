import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import config from "../config/config";

const MovieDetail = () => {
    const { id } = useParams();

    const [detail, setDetail] = useState();

    useEffect(() => {
        getMovieDetail();
    }, [id])

    const getMovieDetail = async () => {
        let response = await axios.get(config.gatewayUrl + 'movie/' + id)
        if (response.status === 200) {
            setDetail(response.data.data);
        }
    }

    return (
        <div className="container mt-4">
            {detail && (
                <>
                    <div className="h2">
                        {detail.title}
                    </div>
                    <div className="d-flex mt-4">
                        <div className="detail-card-container">
                            <img src={detail.cover_image} alt="" className="detail-card-image" />
                        </div>
                        <div>
                            <div className="detail-subtitle">
                                Description
                            </div>
                            <div className="detail-card-content text-wrap">
                                {detail.description}
                            </div>

                            <div className="detail-subtitle mt-3">
                                Director
                            </div>
                            <div>
                                {detail.director}
                            </div>

                            <div className="detail-subtitle mt-3">
                                Release Date
                            </div>
                            <div>
                                {detail.release_date}
                            </div>

                            <div className="detail-subtitle mt-3">
                                Language
                            </div>
                            <div>
                                {detail.language}
                            </div>

                            <div className="detail-subtitle mt-3">
                                Rating
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faStar} className="movie-card-favourite" /> {detail.rating} / 10
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default MovieDetail;