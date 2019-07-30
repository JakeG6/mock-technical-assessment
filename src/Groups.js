import React, {useState} from 'react'

import CreateGroupForm from './CreateGroupForm'

import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'


const Groups = props => {

    const displayGroupList = 'displayGroupList'
    const displayCreateGroup = 'displayCreateGroup'

    const [groups, setGroups] = useState([])
    const [groupDisplay, setGroupDisplay] = useState(displayGroupList)

    const addGroup = group => {
        group.id = groups.length + 1
        console.log(group)
        setGroups([...groups, group])
    }

    return (
        <div>
            <ListGroup>
                {
                    groupDisplay == displayCreateGroup ? 
                    <div>
                        <CreateGroupForm addGroup={addGroup} contacts={props.contacts} setGroupDisplay={setGroupDisplay} displayGroupList={displayGroupList} />
                    </div>
                    :
                    groups.length > 0 ?
                        <div>
                            {
                            groups.map(group => (
                            <ListGroup.Item action onClick={() => props.setCurrentGroup(group.groupContacts)} key={group.id}>                           
                                {group.groupName}
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