import React, {useState} from 'react';
import EditForm from './EditForm'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
            id: contact.id, firstName: contact.firstName, lastName: contact.lastName, phoneNumber: contact.phoneNumber, email: contact.email })
    }

    //submit updated contact
    const updateContact = (id, updatedContact) => {
        setEditDisplay(false) 
        props.setContacts(props.contacts.map(contact => (contact.id === id ? updatedContact : contact)))
    }
    
    return (
        <div>
            <p>Contacts:</p>
            <ListGroup>
                {
                    props.contacts.length > 0 ?
                        displayEditor ? (
                            <EditForm 
                                currentContact={currentContact} 
                                setCurrentContact={setCurrentContact} 
                                setEditDisplay={setEditDisplay} 
                                updateContact={updateContact} 
                            />
                        )
                        :
                        props.currentGroup.length > 0 ? (
                            props.currentGroup.map(contact => (
                                <ListGroup.Item key={contact.id}>                           
                                    <p>{contact.firstName} {contact.lastName}</p>
                                    <p>{contact.phoneNumber ? contact.phoneNumber : "No number provided"}</p>
                                    <p>{contact.email ? contact.email : "No email provided"}</p>
                                    <Container>
                                        <Row>
                                            <Col xs={8}></Col>
                                            <Col xs={2} ><Button variant="outline-info" onClick={() => editContact(contact)}>Edit</Button></Col>
                                            <Col xs={2} ><Button variant="outline-danger" onClick={() => props.deleteContact(contact.id)}>Delete</Button></Col>
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
                                        <Col xs={8}></Col>
                                        <Col xs={2} ><Button variant="outline-info" onClick={() => editContact(contact)}>Edit</Button></Col>
                                        <Col xs={2} ><Button variant="outline-danger" onClick={() => props.deleteContact(contact.id)}>Delete</Button></Col>
                                    </Row>
                                </Container>
                            </ListGroup.Item>
                        ))
                    :
                    
                    <p>There are no contacts</p>
                }
            </ListGroup>
        </div>
    )
    
}

export default ContactsTable