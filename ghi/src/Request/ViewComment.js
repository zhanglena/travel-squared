import { useState, useEffect } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CreateComment from "./CreateComment";

export default function ViewComment(props) {
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newCommentSubmit, setNewCommentSubmit] = useState(false);
  const baseUrl = process.env.REACT_APP_TRAVELSQUARED;

  useEffect(() => {
    fetchData();
    setNewCommentSubmit(false);
    // eslint-disable-next-line
  }, [newCommentSubmit]);

  const request = props.request.id;

  const fetchData = async () => {
    const data = props.request.id;
    const commentUrl = `${baseUrl}/api/requests/${data}/comments/`;
    const response = await fetch(commentUrl);
    const newData = await response.json();
    setComments(newData);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View Comments
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        {comments.map((comment) => {
          return (
            <Modal.Body key={comment.id}>
              {comment.username} {""}
              {comment.created_at} : {""}
              {comment.txt}
            </Modal.Body>
          );
        })}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <CreateComment
            request={request}
            setNewCommentSubmit={setNewCommentSubmit}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
