import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import ErrorNotification from "../ErrorNotification";
import { useCreateCategoryMutation } from "../store/adminApi";

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

export function AddCategoryModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [createCategory, result] = useCreateCategoryMutation();
  const [category_name, setCategory_name] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    createCategory({ category_name });
  }

  useEffect(() => {
    if (result.isSuccess) {
      setError("");
      setCategory_name("");
      handleClose();
    } else if (result.isError) {
      setError(result.error.data.detail);
    }
  }, [result]);

  return (
    <>
      <Button className="btn-hue" onClick={handleShow}>
        Create a Category
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <ErrorNotification props={error}/>
            <form onSubmit={handleSubmit}>
              <BootstrapInputFields
                id="category_name"
                label="Enter Category Name"
                value={category_name}
                onChange={(e) => setCategory_name(e.target.value)}
                type="text"
              />
              <button type="submit" className="btn btn-outline-success">
                Create
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddCategoryModal;
