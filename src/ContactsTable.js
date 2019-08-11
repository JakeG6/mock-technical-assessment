import React, {useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ContactEditForm from './ContactEditForm';

const ContactsTable = props => {

    //contact editor displayed?
    const [displayEditor, setEditDisplay] = useState(false);

    //default contact for editing form
    const defaultEditState = {
        id: null, firstName: '', lastName: '', phoneNumber: '', email: ''
    }
        
    const [currentContact, setCurrentContact] = useState(defaultEditState)

    //when set clicked contact for the edit form
    const editContact = contact => {
        setEditDisplay(true)
        setCurrentContact({
            id: contact.id, firstName: contact.firstName, lastName: contact.lastName, phoneNumber: contact.phoneNumber, email: contact.email 
        })
    }

    //submit updated contact
    const updateContact = (id, updatedContact) => {
        setEditDisplay(false) 
        props.setContacts(props.contacts.map(contact => (contact.id === id ? updatedContact : contact)))
    }
    
    return (
        <div>
            <Row>
                <Col>
                    <Button onClick={() => props.setCurrentGroup([])} size="md" variant="success" block>Show All</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                <ListGroup>
                {/* Shows the Contact Editor Form, current Contacts in a selected group, or all contacts  */}
                {
                    props.contacts.length > 0 ?
                        displayEditor ? (
                            <ContactEditForm 
                                currentContact={currentContact} 
                                setCurrentContact={setCurrentContact} 
                                setEditDisplay={setEditDisplay} 
                                updateContact={updateContact} 
                            />
                        )
                        :
                        props.currentGroup.length > 0 ? (
                            props.contacts.filter(contact => props.currentGroup.includes(contact.id)).map(contact => (
                                <ListGroup.Item key={contact.id}>                           
                                    <p>{contact.firstName} {contact.lastName}</p>
                                    <p>{contact.phoneNumber ? contact.phoneNumber : "No number provided"}</p>
                                    <p>{contact.email ? contact.email : "No email provided"}</p>
                                    <Container>
                                        <Row>
                                            <Col xs={2} md={4} lg={6} xl={8}></Col>
                                            <Col xs={5} md={4} lg={3} xl={2}><Button variant="outline-info" onClick={() => editContact(contact)}>Edit</Button></Col>
                                            <Col xs={5} md={4} lg={3} xl={2}><Button variant="outline-danger" onClick={() => props.deleteContact(contact.id)}>Delete</Button></Col>
                                        </Row>
                                    </Container>
                                </ListGroup.Item>
                            ))
                        )
                        :
                        props.contacts.map(contact => (
                            <ListGroup.Item key={contact.id}>                           
                                <p>{contact.firstName} {contact.lastName}</p>
                                <p>{contact.phoneNumber ? contact.phoneNumber : "No number provided"}</p>
                                <p>{contact.email ? contact.email : "No email provided"}</p>
                                <Container>
                                    <Row>
                                        <Col xs={2} md={4} lg={6} xl={8}></Col>
                                        <Col xs={5} md={4} lg={3} xl={2}><Button variant="outline-info" onClick={() => editContact(contact)}>Edit</Button></Col>
                                        <Col xs={5} md={4} lg={3} xl={2}><Button variant="outline-danger" onClick={() => props.deleteContact(contact.id)}>Delete</Button></Col>
                                    </Row>
                                </Container>
                            </ListGroup.Item>
                        ))
                    :
                    <h2>There are no contacts</h2>
                }
            </ListGroup>
                </Col>
            </Row>
            
        </div>
    )   
}

export default ContactsTable