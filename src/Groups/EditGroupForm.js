import React, {useState} from 'react'

const EditGroupForm = props => {
    
    const defaultForm = { id: null, groupName: '', groupContacts: [] }
    
    const [newGroup, setNewGroup] = useState(defaultForm)

    const handleInputChange = event => {
        const { name, value } = event.target 
        setNewGroup({ ...newGroup, [name]: value })
    }

    const handleCheckbox = event => {
        const { value } = event.target;
        console.log(value);
        const intValue = parseInt(value, 10);
        let newGroupContacts = [...newGroup.groupContacts];

        //Making Adjustments
        const contactExists = newGroupContacts.find(contactId => contactId === intValue);
      
        if (contactExists) {
          newGroupContacts = newGroupContacts.filter(contactId => contactId !== intValue);
        } 
        else {
          const contact = intValue;
          newGroupContacts = [...newGroupContacts, contact];
        }
      
        setNewGroup({...newGroup, groupContacts: newGroupContacts });
    }

    const handleSubmit = event => {
        event.preventDefault()

        console.log(newGroup.groupName, ' firing')
        console.log(newGroup)
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
