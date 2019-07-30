import React, {useState} from 'react'

import CreateGroupForm from './CreateGroupForm'

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Groups = props => {

    const displayGroupList = 'displayGroupList'
    const displayCreateGroup = 'displayCreateGroup'
    const displayGroupEditor = 'displayGroupEditor'



    const [groups, setGroups] = useState([])
    const [groupDisplay, setGroupDisplay] = useState(displayGroupList)
    //const [currentEditorGroup]

    const addGroup = group => {
        group.id = groups.length + 1
        console.log(group)
        setGroups([...groups, group])
    }

    const deleteGroup = id => {
        props.setCurrentGroup([])
        setGroups(groups.filter(group => group.id !== id))
    }

    const showGroupEditor = group => {
        setGroupDisplay(displayGroupEditor)

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
                                        <Button variant="outline-info">Edit</Button>
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