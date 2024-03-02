import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import MyCourses from '../MyCourses/MyCourses';
import ListGroup from 'react-bootstrap/ListGroup';
import './Profile.css'

function Profile() {
    const [whoAmI, setWhoAmI] = useState('');
    const [whoAmIData, setWhoAmIData] = useState({});
    const [showAddBio, setShowAddBio] = useState(false)
    const loginToken = localStorage.getItem('token');
    const fetchData = async () => {
        try {
            // Wysyłanie żądania GET do serwera
            const response = await axios.get(`http://34.136.176.140:8000/api/whoami/`, { headers: { "Authorization": `Bearer ${loginToken}` } });

            // Pobieranie danych z odpowiedzi
            setWhoAmI(response.data);
        } catch (error) {
            // Obsługa błędów
            console.error('Error fetching courses data:', error);
        }
    };
    useEffect(() => {
        fetchData();

    }, []);
    console.log()
    const handleSave = async () => {
        try {
            const newData = {
                ...whoAmIData,
                username: whoAmI.username, // Użyj obecnego username
                email: whoAmI.email, // Użyj obecnego email
            };
            console.log(newData)
            await axios.put(`http://34.136.176.140:8000/api/user/${whoAmI.id}/`, newData, { headers: { "Authorization": `Bearer ${loginToken}` } });
            fetchData();
        } catch (error) {
            console.error('Error saving lesson data:', error);
        }
    };

    const handleShowAddBio = () => { setShowAddBio(true) }
    return (
        <div>
            <div className='info list-group-container'>
                <ListGroup variant="flush" className='shadow'>
                    <ListGroup.Item>{whoAmI.username}</ListGroup.Item>
                    <ListGroup.Item>{whoAmI.email}</ListGroup.Item>
                    <ListGroup.Item>
                        {whoAmI.bio === null ? (
                            <>
                                <Button className='add-desc' variant='primary' onClick={handleShowAddBio}>Dodaj opis</Button>
                                {showAddBio && (
                                    <>
                                        <Form.Group controlId="description">
                                            <Form.Label>Napisz coś o sobie: </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Enter description"
                                                value={whoAmIData.bio || ''} // Dodaj warunek, aby uniknąć problemu z niezdefiniowaną wartością
                                                onChange={(e) => {
                                                    const newBio = e.target.value;
                                                    setWhoAmIData(prevState => ({
                                                        ...prevState,
                                                        bio: newBio // Zaktualizuj tylko bio, pozostałe wartości pozostaną niezmienione
                                                    }));
                                                }}
                                            />

                                        </Form.Group>
                                        <Button className='save-button' variant="primary" onClick={handleSave}>Zapisz</Button>

                                    </>
                                )}
                            </>
                        ) : (
                            <>{whoAmI.bio}</>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </div>
            <MyCourses />
        </div>
    );
}

export default Profile;