import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import config from "../config/config";

const MovieEditModal = (props) => {
    const { isShowing, movie, closeModal, getAllMovies } = props;

    const [cookies] = useCookies(['token']);
    const navigate = useNavigate();

    const [title, setTitle] = useState(movie.title);
    const [description, setDescription] = useState(movie.description);
    const [coverImage, setCoverImage] = useState(movie.cover_image);
    const [director, setDirector] = useState(movie.director);
    const [language, setLanguage] = useState(movie.language);
    const [rating, setRating] = useState(movie.rating);
    const [errorMessage, setErrorMessage] = useState("");

    const saveClick = async () => {
        if (!title || !description || !coverImage || !director || !language || !rating) {
            setErrorMessage("field cannot be empty");
        } else {
            setErrorMessage("");
            const data = {
                title,
                description,
                director,
                cover_image: coverImage,
                release_date: movie.release_date,
                language,
                rating: parseFloat(rating).toFixed(1)
            }

            try {
                let response = await axios.put(config.gatewayUrl + 'movie/' + movie.id, data, { headers: { "Authorization": "Bearer " + cookies.token } })
                if (response.status === 200) {
                    getAllMovies();
                    closeModal();
                }
            } catch (error) {
                if (error.response.data.errors) {
                    setErrorMessage(error.response.data.errors[0].defaultMessage);
                } else {
                    setErrorMessage(error.response.data.message);
                }
            }
        }
    }

    return (
        <div className="modal-wrapper" style={isShowing ? { display: 'block' } : null} onClick={closeModal}>
            <div className="modal-container" style={{ width: '40%' }} onClick={(e) => e.stopPropagation()}>
                <div className="p-3" style={{ fontWeight: 'bold', fontSize: 20 }}>Edit Movie</div>
                <div style={{ borderBottom: '1px solid grey' }} />
                <div className="p-3">
                    <div className="login-input">
                        <div className="mb-1" style={{ fontWeight: 'bold' }}>Title</div>
                        <input type="text" className="form-control" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="login-input mt-3">
                        <div className="mb-1" style={{ fontWeight: 'bold' }}>Description</div>
                        <textarea type="textarea" className="form-control" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="login-input mt-3">
                        <div className="mb-1" style={{ fontWeight: 'bold' }}>Cover Image</div>
                        <input type="text" className="form-control" placeholder="Enter cover image" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
                    </div>

                    <div className="login-input mt-3">
                        <div className="mb-1" style={{ fontWeight: 'bold' }}>Director</div>
                        <input type="text" className="form-control" placeholder="Enter director" value={director} onChange={(e) => setDirector(e.target.value)} />
                    </div>

                    <div className="login-input mt-3">
                        <div className="mb-1" style={{ fontWeight: 'bold' }}>Language</div>
                        <input type="text" className="form-control" placeholder="Enter language" value={language} onChange={(e) => setLanguage(e.target.value)} />
                    </div>

                    <div className="login-input mt-3">
                        <div className="mb-1" style={{ fontWeight: 'bold' }}>Rating</div>
                        <input type="number" step="0.1" min="0" max="10" className="form-control" placeholder="Enter rating" value={rating} onChange={(e) => setRating(e.target.value)} />
                    </div>

                    <div className="text-danger" style={errorMessage ? { visibility: 'visible' } : { visibility: 'hidden' }}>{errorMessage}</div>

                    <div className="d-flex justify-content-between mt-4">
                        <div className="btn btn-warning" onClick={saveClick}>Save Movie</div>
                        <div className="btn btn-danger" onClick={closeModal}>Cancel</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieEditModal;