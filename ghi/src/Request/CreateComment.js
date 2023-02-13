import React from "react";
import { useState } from "react";
import { useGetTokenQuery } from "../store/authApi";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";

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

export default function CreateComment(props) {
  const { data: tokenData, isLoading } = useGetTokenQuery();
  const [txt, setTxt] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const newCommentSubmitFn = props.setNewCommentSubmit;
  const baseUrl = process.env.REACT_APP_TRAVELSQUARED;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const CommentUrl = `${baseUrl}/api/comments`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify({
        txt: txt,
        request_id: props.request,
      }),
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(CommentUrl, fetchConfig);
    if (response.ok) {
      newCommentSubmitFn(true);
      setShow(false);
      setTxt("");
    }
  };

  if (isLoading) {
      return <progress className="progress is-primary" max="100"></progress>;
  }

  if (tokenData && tokenData.access_token) {
    return (
      <>
        <Button className="btn-hue" onClick={handleShow}>
          Make a Comment
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add your comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form onSubmit={handleSubmit}>
                <BootstrapInputFields
                  id="txt"
                  label="Write your comment"
                  value={txt}
                  onChange={(e) => setTxt(e.target.value)}
                  type="text"
                  placeholder="Suggest a place"
                />
                <button
                  type="submit"
                  className="btn btn-outline-success"
                  onClick={handleSubmit}
                >
                  Add!
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
