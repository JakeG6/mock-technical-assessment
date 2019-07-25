import {useState} from 'react';

const useContactForm = (callback) => {
    const [contacts, setContacts] = useState([]);
    
    const handleSubmit = (event) => {
        if (event) { event.preventDefault(); }
     
        callback();
    }

    const handleInputChange = (event) => {
      event.persist();
      setContacts(contacts => ({...contacts, [event.target.name]: event.target.value}))
    }
    
  return {
      handleSubmit,
      handleInputChange,
      contacts
    };

}

export default useContactForm