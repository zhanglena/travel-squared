import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useGetTokenQuery } from "../store/authApi";

export function CreateRequest() {
  const { data: tokenData, isLoading } = useGetTokenQuery();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [txt, setTxt] = useState("");
  const baseUrl = process.env.REACT_APP_TRAVELSQUARED;


  const handleSubmit = async (event) => {
    event.preventDefault();
    const RequestUrl = `${baseUrl}/api/requests/`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify({
        txt: txt,
      }),
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(RequestUrl, fetchConfig);
    if (response.ok) {
      setTxt("");
      handleClose();
    }
  };

  if (isLoading) {
    return <progress className="progress is-primary" max="100"></progress>;
  }

  if (tokenData && tokenData.access_token) {
    return (
      <>
        <div className="btn-padding" style={{ marginTop: "30px" }}>
          <Button className="btn-hue" onClick={handleShow}>
            Create a New Request
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create a New Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <Form onSubmit={handleSubmit} style={{ marginTop: "5px" }}>
                  <Form.Group className="mb-3" id="request">
                    <Form.Control
                      value={txt}
                      onChange={(e) => setTxt(e.target.value)}
                      as="textarea"
                      placeholder="Request a location"
                      rows={3}
                      required
                    />
                  </Form.Group>
                  <button type="submit" className="btn-hue">
                    Submit
                  </button>
                </Form>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}
