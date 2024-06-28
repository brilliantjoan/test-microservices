import { useEffect, useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import MovieEditModal from "../components/MovieEditModal";
import config from "../config/config";
import MovieCreateModal from "../components/MovieCreateModal";
import { useCookies } from "react-cookie";

const MovieListDashboard = () => {
    const [movie, setMovie] = useState();
    const [showEditModal, setShowEditModal] = useState(false);
    const [editModalData, setEditModalData] = useState(null);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [cookies] = useCookies(['token']);

    useEffect(() => {
        getAllMovies();
    }, [])

    const getAllMovies = async () => {
        let response = await axios.get(config.gatewayUrl + 'movie')
        if (response.status === 200) {
            setMovie(response.data.data);
        }
    }

    const deleteMovie = async (id) => {
        let response = await axios.delete(config.gatewayUrl + 'movie/' + id, { headers: { "Authorization": "Bearer " + cookies.token } })
        if (response.status === 200) {
            getAllMovies();
        }
    }

    const editClick = (movie) => {
        setShowEditModal(true);
        setEditModalData(movie);
    }

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditModalData(null);
    }

    const createClick = () => {
        setShowCreateModal(true);
    }

    const closeCreateModal = () => {
        setShowCreateModal(false);
    }

    const movieListTable = () => {
        return (
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">no</th>
                        <th scope="col">Title</th>
                        <th scope="col">Director</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Release Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {movie && movie.map((mov, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{mov.title}</td>
                                <td>{mov.director}</td>
                                <td>{mov.rating}</td>
                                <td>{mov.release_date}</td>
                                <td>
                                    <span className="btn btn-warning" style={{ color: 'black', padding: '3px 10px 3px 10px' }} onClick={() => editClick(mov)}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </span>
                                    <span className="btn btn-danger" style={{ marginLeft: 15, color: 'black', padding: '3px 10px 3px 10px' }} onClick={() => deleteMovie(mov.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
    return (
        <>
            <div className="container mt-4">
                <div className="d-flex justify-content-between">
                    <div className="h5 d-flex align-items-end" style={{ marginBottom: 0 }}>
                        Movie List
                    </div>
                    <div className="btn btn-warning" style={{ padding: '3px 10px', height: 33 }} onClick={createClick}>Create New</div>
                </div>
                <div className="mt-3">
                    {movieListTable()}
                </div>
            </div>
            {showCreateModal && (
                <MovieCreateModal
                    isShowing={showCreateModal}
                    closeModal={closeCreateModal}
                    getAllMovies={getAllMovies}
                />
            )}
            {showEditModal && (
                <MovieEditModal
                    isShowing={showEditModal}
                    movie={editModalData}
                    closeModal={closeEditModal}
                    getAllMovies={getAllMovies}
                />
            )}
        </>
    )
}

export default MovieListDashboard;