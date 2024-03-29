import React, {useState} from 'react'
import AddContact from './AddContact'
import ContactsTable from './ContactsTable'
import Groups from './Groups/Groups'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tabs'

const Home = () => {

    const [contacts, setContacts] = useState([])
    const [currentGroup, setCurrentGroup] = useState([])
    const [tableDisplay, setTable] = useState([])

    //add a contact to the contacts table
    const addContact = contact => {
        contact.id = contacts.length + 1
        setContacts([...contacts, contact])
    }

    //delete contact
    const deleteContact = id => {
        setContacts(contacts.filter(contact => contact.id !== id))
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>Contacts</h1>
                    </Col>
                </Row>
                <Row>            
                    <Col xs={12} sm={6} >
                        <Tabs defaultActiveKey="addContact">
                            <Tab eventKey="addContact" title="Add Contact">
                                <AddContact addContact={addContact} /> 
                            </Tab>
                            <Tab eventKey="groups" title="Groups">
                                <Groups contacts={contacts} tableDisplay={tableDisplay}  setCurrentGroup={setCurrentGroup} />
                            </Tab>
                        </Tabs>
                    </Col>
                    <Col xs={12} sm={6} >                        
                        <ContactsTable 
                            contacts={contacts} 
                            setContacts={setContacts} 
                            deleteContact={deleteContact} 
                            tableDisplay={tableDisplay} 
                            currentGroup={currentGroup}
                            setCurrentGroup={setCurrentGroup}
                        />
                    </Col>
                </Row>
            </Container>
            

        </div>
    )
    
}

export default Home