import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const EditGroupForm = props => {
        
    const handleInputChange = event => {
        const { name, value } = event.target 
        props.setCurrentEditorGroup({ ...props.currentEditorGroup, [name]: value })
    }

    const handleCheckbox = event => {
        const { value } = event.target;
        console.log(value);
        const intValue = parseInt(value, 10);
        let editorGroupContacts = [...props.currentEditorGroup.groupContacts];

        //Making Adjustments
        const contactExists = editorGroupContacts.find(contactId => contactId === intValue);
      
        if (contactExists) {
          editorGroupContacts = editorGroupContacts.filter(contactId => contactId !== intValue);
        } 
        else {
          const contact = intValue;
          editorGroupContacts = [...editorGroupContacts, contact];
        }
      
        props.setCurrentEditorGroup({...props.currentEditorGroup, groupContacts: editorGroupContacts });
    }

    // const handleSubmit = event => {
    //     event.preventDefault()

    //     console.log(props.currentEditorGroup.groupName, ' firing')
    //     console.log(props.currentEditorGroup)
    //     if (!props.currentEditorGroup.groupName || !props.currentEditorGroup.groupContacts) return

    //     props.addGroup(props.currentEditorGroup)
        
    //     props.setCurrentEditorGroup(props.defaultGroupEditorState)
    //     props.setGroupDisplay('displayGroupList')
        
    // }

    return (
        <div>
            <h2>Group Editor</h2>
            <Form onSubmit={event => {
                event.preventDefault();
                props.updateGroup(props.currentEditorGroup.id, props.currentEditorGroup)
            }}>
                <Form.Group >
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="groupName" 
                        onChange={handleInputChange} 
                        placeholder="First Name" 
                        value={props.currentEditorGroup.groupName} 
                    />
                </Form.Group>
                <Form.Group>
                {props.contacts.map(contact => (
                    <div className="mb-3" key={contact.id}>
                        <Form.Check 
                            onChange={handleCheckbox}
                            type='checkbox'
                            label={`${contact.firstName} ${contact.lastName}`}
                            value={contact.id}
                            checked={props.currentEditorGroup.groupContacts.some(
                                //changed to .some from .find
                                    groupContact => {
                                        console.log(
                                            props.currentEditorGroup,
                                            props.currentEditorGroup.groupContacts,
                                            groupContact,
                                            groupContact.id,
                                            contact.id
                                            )
                                        
                                        console.log("do they match? ", groupContact === contact.id)
                                        return (groupContact === contact.id)
                                    } ) ? true : false
                            }
                        />
                    </div>
                ))}
                </Form.Group>
                <Button type="submit">Update</Button>
                <Button onClick={() => props.setGroupDisplay(props.displayGroupList)}>Cancel</Button>
            </Form>
            
        </div> 
    )
    
}

export default EditGroupForm;