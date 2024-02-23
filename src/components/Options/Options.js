import React from 'react'
import Option from './Option';
import Card from 'react-bootstrap/Card';

function Options() {
    return (
        <div className='row me-0 pe-0 mt-5 pb-5'>
            <div className='col-lg-4'>
                <Card>
                    <Card.Body>
                        <Card.Title>Zacznij teraz</Card.Title>
                        <Card.Text>
                            Wybierz poziom trudności adekwatny do swoich umiejętności
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className='col-lg-4' >
                <Card>
                    <Card.Body>
                        <Card.Title>Dołącz do nas</Card.Title>
                        <Card.Text>
                            Twórz własne kursy i pomagaj innym zrozumieć ich zawartość
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className='col-lg-4'>
                <Card>
                    <Card.Body>
                        <Card.Title>Ucz się według swoich potrzeb</Card.Title>
                        <Card.Text>
                            Dobieraj kursy wedle swoich upodobań
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
export default Options;
