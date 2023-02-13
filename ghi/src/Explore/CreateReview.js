import React from "react";
import { useState } from "react";
import { useGetTokenQuery } from "../store/authApi";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { Widget } from "@uploadcare/react-widget";

function maxFileSize(size) {
  return function(fileInfo) {
    if (fileInfo.size !== null && fileInfo.size > size) {
      throw new Error("fileMaximumSize");
    }
  };
}

const validators = [maxFileSize(5 * 1024 * 1024)]

function BootstrapInputFields(props) {
  const { id, label, value, onChange, type, placeholder, maxLength } = props;
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
      />
    </div>
  );
}

export default function CreateReview(props) {
  const { data: tokenData, isLoading } = useGetTokenQuery();
  const [review_description, setReview_description] = useState("");
  const [rating, setRating] = useState("");
  const [picture, setPicture] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const newCommentSubmitFn = props.setNewCommentSubmit;
  const PUBLIC_KEY = process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY;
  const baseUrl = process.env.REACT_APP_TRAVELSQUARED;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ReviewUrl = `${baseUrl}/api/reviews`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify({
        review_description: review_description,
        rating: rating,
        picture: picture,
        venue_id: props.venue,
      }),
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(ReviewUrl, fetchConfig);
    if (response.ok) {
      newCommentSubmitFn(true);
      setShow(false);
      setReview_description("");
    }
  };

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  if (tokenData && tokenData.access_token) {
    return (
      <>
        <Button
          className="btn-hue"
          onClick={handleShow}
        >
          Add a Review
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form onSubmit={handleSubmit}>
                <BootstrapInputFields
                  id="review_description"
                  label="Write your review"
                  value={review_description}
                  onChange={(e) => setReview_description(e.target.value)}
                  type="text"
                  placeholder="The vibes were immaculate!"
                />
                <BootstrapInputFields
                  id="rating"
                  label="Rate this place"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  type="text"
                  placeholder="between 1 and 5"
                  maxLength="1"
                />
                <p>
                  <label htmlFor="picture">(Optional) Add a picture: </label>{" "}
                  <Widget
                    publicKey={PUBLIC_KEY}
                    validators={validators}
                    id="picture"
                    name="picture"
                    value={picture}
                    tabs="file camera url facebook gdrive gphotos dropbox onedrive"
                    clearable
                    previewStep="true"
                    onChange={(file) => setPicture(file.cdnUrl)}
                  />
                </p>
                <button
                  type="submit"
                  className="btn btn-outline-success"
                  onClick={handleSubmit}
                >
                  Add
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

//  test
