import React, {useState} from 'react';
//import useContactForm from './customHooks.js'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ListGroup from 'react-bootstrap/ListGroup'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const AddContact = props => {

    const defaultForm = { id: null, firstName: '', lastName: '', phoneNumber: '', email: '' }
    const [newContact, setNewContact] = useState(defaultForm)

    const handleInputChange = event => {
        const { name, value } = event.target 
        setNewContact({ ...newContact, [name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()

        if (!newContact.firstName || !newContact.lastName) return

        props.addContact(newContact)
        
        setNewContact(defaultForm)

    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Container>
                    <Row>
                        
                        <Col>
                            <Form.Group >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="firstName" onChange={handleInputChange} placeholder="First Name" value={newContact.firstName} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="lastName" onChange={handleInputChange} placeholder="Last Name" value={newContact.lastName} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" name="phoneNumber" onChange={handleInputChange} placeholder="Phone Number" value={newContact.phoneNumber} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email" onChange={handleInputChange} placeholder="email" value={newContact.email} />
                            </Form.Group>
                            <Button variant="primary" type="submit" block>Submit</Button>
                        </Col>
                        
                    </Row>
                   
                </Container>
            </Form> 
        </div>
    )
}

export default AddContact