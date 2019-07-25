import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const EditForm = props => {

    const handleInputChange = event => {
        const { name, value } = event.target 
        props.setCurrentContact({ ...props.currentContact, [name]: value })
    }

    return (
        <div>
            
            <Form onSubmit={event => { 
                event.preventDefault();
                props.updateContact(props.currentContact.id, props.currentContact)
            }}>
                <Form.Group >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" onChange={handleInputChange} placeholder="First Name" value={props.currentContact.firstName} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" onChange={handleInputChange} placeholder="Last Name" value={props.currentContact.lastName} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" name="phoneNumber" onChange={handleInputChange} placeholder="Phone Number" value={props.currentContact.phoneNumber} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" onChange={handleInputChange} placeholder="email" value={props.currentContact.email} />
                </Form.Group>
                <button className="button muted-button">Update</button>
                <button onClick={() => props.updateContact(props.currentContact.id, props.currentContact)} className="button muted-button">Cancel</button>
            </Form>
        </div>
    )
}

export default EditForm