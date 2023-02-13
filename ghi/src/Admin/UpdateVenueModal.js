import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal"
import ErrorNotification from "../ErrorNotification";
import { useUpdateVenueMutation } from "../store/adminApi";

function BootstrapInputFields(props) {
  const { id, label, value, onChange, type, placeholder } = props;
  return (
    <div className="mb-3 ">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        required
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

export function UpdateVenueModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [updateVenue, result] = useUpdateVenueMutation();
    const venue_id = props.venue.id;
    const oldName = props.venue.venue_name;
    const oldStreet = props.venue.num_and_street;
    const oldCity = props.venue.city;
    const oldState = props.venue.state;
    const oldZip = props.venue.zip;
    const oldCategory_id = props.venue.category_id;
    const oldDescription = props.venue.description_text;
    const added_by = props.venue.added_by;
    const [venue_name, setVenue_name] = useState(oldName);
    const [num_and_street, setNum_and_street] = useState(oldStreet);
    const [city, setCity] = useState(oldCity);
    const [state, setState] = useState(oldState);
    const [zip, setZip] = useState(oldZip);
    const [category_id, setCategory_id] = useState(oldCategory_id);
    const [description_text, setDescription_text] = useState(oldDescription)
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        updateVenue({
            venue_id,
            venue_name,
            num_and_street,
            city,
            state,
            zip,
            category_id,
            description_text,
            added_by
        })
    }

    useEffect(() => {
        if (result.isSuccess) {
            setError("");
            setVenue_name("");
            setNum_and_street("");
            setCity("");
            setState("");
            setZip("");
            setCategory_id("");
            setDescription_text("");
            handleClose();
        } else if (result.isError) {
            setError(result.error.data.detail)
        }
    }, [result]);

    return (
        <>
        <Button variant='primary' onClick={handleShow}>
            Approve
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Review Submitted Venue</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <ErrorNotification props={error}/>
                    <form onSubmit={handleSubmit}>
                        <BootstrapInputFields
                            id="venue_name"
                            label="Enter Name"
                            value={venue_name}
                            onChange={(e) => setVenue_name(e.target.value)}
                            type="text"
                        />
                        <BootstrapInputFields
                            id="num_and_street"
                            label="Enter Street"
                            value={num_and_street}
                            onChange={(e) => setNum_and_street(e.target.value)}
                            type="text"
                        />
                        <BootstrapInputFields
                            id="city"
                            label="Enter City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                        />
                        <BootstrapInputFields
                            id="State"
                            label="Enter State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            type="text"
                        />
                        <BootstrapInputFields
                            id="zip"
                            label="Enter Zip Code"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            type="text"
                        />
                        <BootstrapInputFields
                            id="category_id"
                            label="Enter Category ID"
                            value={category_id}
                            onChange={(e) => setCategory_id(e.target.value)}
                            type="number"
                        />
                        <BootstrapInputFields
                            id="description_text"
                            label="Enter Description"
                            value={description_text}
                            onChange={(e) => setDescription_text(e.target.value)}
                            type="text"
                        />
                        <button type="submit" className="btn btn-outline-success">
                            Update and Approve
                        </button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default UpdateVenueModal;
