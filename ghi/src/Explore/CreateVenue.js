import { useState, useEffect } from "react";
import { useGetTokenQuery } from "../store/authApi";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";

function BootstrapInputFields(props) {
  const { id, label, value, onChange, type, placeholder, maxLength, onInput } =
    props;
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
        maxLength={maxLength}
        onInput={onInput}
      />
    </div>
  );
}

const stateUppercase = (e) => {
  e.target.value = ("" + e.target.value).toUpperCase();
};

export function CreateVenue() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data: tokenData, isLoading } = useGetTokenQuery();
  const [venue_name, setVenue_name] = useState("");
  const [num_and_street, setNum_and_street] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [categories, setCategories] = useState([]);
  const [description_text, setDescription_text] = useState("");
  const baseUrl = process.env.REACT_APP_TRAVELSQUARED;

  useEffect(() => {
    async function getCategories() {
      const CategoriesUrl = `${baseUrl}/api/categories/`;
      const responseCategories = await fetch(CategoriesUrl);
      if (responseCategories.ok) {
        const data = await responseCategories.json();
        setCategories(data);
      }
    }
    getCategories();
  }, [setCategories, baseUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const VenueUrl = `${process.env.REACT_APP_TRAVELSQUARED}/api/venues/`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify({
        venue_name: venue_name,
        num_and_street: num_and_street,
        city: city,
        state: state,
        zip: zip,
        category_id: category_id,
        description_text: description_text,
      }),
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(VenueUrl, fetchConfig);
    if (response.ok) {
      setVenue_name("");
      setNum_and_street("");
      setCity("");
      setState("");
      setZip("");
      setCategory_id("");
      setDescription_text("");
      handleClose();
    }
  };

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  if (tokenData && tokenData.access_token) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <Button className="btn-hue" onClick={handleShow}>
            Submit New Venue
          </Button>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Venue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
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
                  id="state"
                  label="Enter State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                  maxLength="2"
                  onInput={stateUppercase}
                />
                <BootstrapInputFields
                  id="zip"
                  label="Enter 5-digit Zip Code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  type="text"
                  maxLength="5"
                />
                <div className="mb-3">
                  <label htmlFor="category_id" className="form-label">
                    Choose a Category
                  </label>
                  <select
                    required
                    className="form-select"
                    type="number"
                    name="category_id"
                    id="category_id"
                    aria-label="Choose a Category"
                    onChange={(e) => setCategory_id(e.target.value)}
                  >
                    <option value="">Available Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <BootstrapInputFields
                  id="description_text"
                  label="What is it like?"
                  value={description_text}
                  onChange={(e) => setDescription_text(e.target.value)}
                  type="text"
                />
                <button
                  disabled={categories.length === 0}
                  type="submit"
                  className="btn btn-outline-success"
                >
                  Submit
                </button>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  }
}
