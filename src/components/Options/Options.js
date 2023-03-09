import React from 'react'
import Option from './Option';
import Card from 'react-bootstrap/Card';

function Options() {
    return (
        <div className='row me-0 pe-0 mt-5 pb-5'>
            <div className='col-lg-4 option'>
                <Card>
                    <Card.Body>
                        <Card.Title>Start now!</Card.Title>
                        <Card.Text>
                            Choose difficulty depends on your skills.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className='col-lg-4 option' >
                <Card>
                    <Card.Body>
                        <Card.Title>Join us!</Card.Title>
                        <Card.Text>
                            Create your own courses to help other to understand content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className='col-lg-4 option'>
                <Card>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
export default Options;
