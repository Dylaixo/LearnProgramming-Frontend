import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
function RegisterForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = event => {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/register', formData)
            .then(response => {
                console.log(response.data);
                // Tutaj możesz wykonać odpowiednią akcję po rejestracji
            })
            .catch(error => {
                console.error(error);
                // Tutaj możesz wyświetlić komunikat o błędzie rejestracji
            });
            window.location.reload();
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Username" name="username" value={formData.username} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                <Form.Text className="text-muted">
                    We'll never share your password with anyone else.
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default RegisterForm;