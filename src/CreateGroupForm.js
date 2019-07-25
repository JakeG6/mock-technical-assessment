import React, {useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const CreateGroupForm = props => {

    const defaultForm = { id: null, groupName: '', groupContacts: [] }
    
    const [newGroup, setNewGroup] = useState(defaultForm)

    const handleInputChange = event => {
        const { name, value } = event.target 
        setNewGroup({ ...newGroup, [name]: value })
    }

    const handleCheckbox = event => {

        const { value } = event.target;
        let newGroupContacts = [...newGroup.groupContacts];
        const contactExists = newGroupContacts.includes(value);

        if (contactExists) {
            newGroupContacts = newGroupContacts.filter(contact => contact !== value);
        } else {
            newGroupContacts = [...newGroupContacts, value];
        }

        setNewGroup({...newGroup, groupContacts: newGroupContacts });

    }

    const handleSubmit = event => {
        event.preventDefault()

        console.log(newGroup.groupName, ' firing')
        

        if (!newGroup.groupName || !newGroup.groupContacts) return

        props.addGroup(newGroup)
        
        setNewGroup(defaultForm)
        props.setGroupDisplay('displayGroupList')
        

    }

    return (
        <div>
            <h2>Create a Group</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group >
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="groupName" 
                        onChange={handleInputChange} 
                        placeholder="First Name" 
                        value={newGroup.groupName} 
                    />
                </Form.Group>
                <Form.Group >
                {props.contacts.map(contact => (
                    <div className="mb-3" key={contact.id}>
                        <Form.Check 
                            onChange={handleCheckbox}
                            type='checkbox'
                            label={`${contact.firstName} ${contact.lastName}`}
                            value={contact.id}
                        />
                    </div>
                ))}
                </Form.Group>
                <Button type="submit">Submit</Button>
                <Button onClick={() => props.setGroupDisplay(props.displayGroupList)}>Cancel</Button>
            </Form>
            
        </div> 
    )
}

export default CreateGroupForm