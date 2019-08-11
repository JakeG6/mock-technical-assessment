import React, {useState} from 'react'

import CreateGroupForm from './CreateGroupForm'
import EditGroupForm from './GroupEditForm'

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Groups = props => {

    const displayGroupList = 'displayGroupList'
    const displayCreateGroup = 'displayCreateGroup'
    const displayGroupEditor = 'displayGroupEditor'

        
    //Default group for editing form
    const defaultGroupEditorState = {
        id: null, groupName: '', groupContacts: []
    }

    //All the contact groups
    const [groups, setGroups] = useState([])
        
    //Display the groups, group creator, or group editor
    const [groupDisplay, setGroupDisplay] = useState(displayGroupList)
    
    //The group that is displayed within the group editor
    const [currentEditorGroup, setCurrentEditorGroup] = useState(defaultGroupEditorState)

    //create a group
    const addGroup = group => {
        group.id = groups.length + 1
        console.log(group)
        setGroups([...groups, group])
    }

    //delete group
    const deleteGroup = id => {
        props.setCurrentGroup([])
        setGroups(groups.filter(group => group.id !== id))
    }

    //Display group editor
    const editGroup = group => { 
        console.log(group)
        setCurrentEditorGroup(group)
        setGroupDisplay(displayGroupEditor)  
    }

    //submit updated group
    const updateGroup = (id, updatedGroup) => {
        setGroupDisplay(displayGroupList)
        setGroups(groups.map(group => (group.id === id ? updatedGroup : group)))
    }

    return (
        <div>
            <ListGroup>
                {
                    groupDisplay === displayCreateGroup ? 
                    <div>
                        <CreateGroupForm addGroup={addGroup} contacts={props.contacts} setGroupDisplay={setGroupDisplay} displayGroupList={displayGroupList} />
                    </div>
                    :
                    groupDisplay === displayGroupEditor ?
                    <div>
                        <EditGroupForm 
                            currentEditorGroup={currentEditorGroup}
                            setCurrentEditorGroup={setCurrentEditorGroup}
                            defaultGroupEditorState={defaultGroupEditorState}
                            setGroupDisplay={setGroupDisplay}
                            updateGroup={updateGroup}
                            contacts={props.contacts}
                        />
                    </div>
                    :
                    groups.length > 0 ?
                        <div>
                            {
                            groups.map(group => (
                            <ListGroup.Item action onClick={() => props.setCurrentGroup(group.groupContacts)} key={group.id}>                           
                                <Row>
                                    <Col>
                                        {group.groupName}
                                    </Col>
                                    <Col>
                                        <Button onClick={() => editGroup(group)} variant="outline-info">Edit</Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={() => deleteGroup(group.id)} variant="outline-danger">Delete</Button>
                                    </Col>
                                </Row>
                                
                            </ListGroup.Item>
                            ))
                            }
                            <Button onClick={() => setGroupDisplay(displayCreateGroup)}>Create a Group</Button>
                        </div>
                    :
                    <div>
                        <p>There are no groups made.</p>
                        <Button onClick={() => setGroupDisplay(displayCreateGroup)}>Create a Group</Button>
                    </div>
                }
            </ListGroup>
        </div>
    )
}

export default Groups