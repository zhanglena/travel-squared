import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal"
import ErrorNotification from "../ErrorNotification";
import { useNavigate } from "react-router-dom";
import { useLogInMutation } from "../store/authApi";
import { useSignUpMutation } from "../store/authApi";
import "./Accounts.css";

function BootstrapInputFields(props) {
  const { id, label, value, onChange, type, placeholder } = props;
  return (
    <div className="mb-3">
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

export function SignupModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const [login] = useLogInMutation();
    const [signup, result] = useSignUpMutation();
    const [username, setUsername] = useState("");
    const [full_name, setFull_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        signup({ username, full_name, email, password});
    }

    useEffect(() => {
        if (result.isSuccess) {
            login({ username, password })
            setError("");
            setUsername("");
            setFull_name("");
            setEmail("");
            setPassword("");
            handleClose();
            navigate("/");
        } else if (result.isError) {
            setError(result.error.data.detail)
        }
    }, [result, login, navigate, password, username]);

    return (
        <>
            <Button className="btn-hue" onClick={handleShow}>
                Sign Up
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header className="modal-header" closeButton>
                    <Modal.Title>Create Your Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    <ErrorNotification props={error}/>
                    <form onSubmit={handleSubmit}>
                        <BootstrapInputFields
                            id="username"
                            label="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="RileyCodes"
                        />
                        <BootstrapInputFields
                            id="full_name"
                            label="Enter Your Name"
                            value={full_name}
                            onChange={(e) => setFull_name(e.target.value)}
                            type="text"
                            placeholder="Riley Dallas"
                        />
                        <BootstrapInputFields
                            id="email"
                            label="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="riley@example.com"
                        />
                        <BootstrapInputFields
                            id="password"
                            label="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="**********"
                        />
                        <button type="submit" className="btn btn-outline-success">
                            Create
                        </button>
                    </form>
                </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer"></Modal.Footer>
            </Modal>
        </>
    )
}
