import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ErrorNotification from "../ErrorNotification";
import { useDeleteVenueMutation } from "../store/adminApi";

export function DeleteVenueModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [deleteVenue, result] = useDeleteVenueMutation();
    const venue_id = props.venue.id;
    const name = props.venue.venue_name;
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        deleteVenue({venue_id})
    }

    useEffect(() => {
        if (result.isSuccess) {
            setError("");
            handleClose();
        } else if (result.isError) {
            setError(result.error.data.detail)
        }
    }, [result])

    return (
        <>
        <Button variant="danger" onClick={handleShow}>
            Delete
        </Button>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {name} from venues?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ErrorNotification props={error}/>
                    <div className="container">
                        <div className="columns is-centered">
                        <div className="column is-one-third">
                            <button className="btn btn-danger" onClick={handleSubmit}>
                                Delete
                            </button>
                        </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteVenueModal;
