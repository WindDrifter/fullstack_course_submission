import React from 'react'
const Contact = ({name,phone, id, removeFunction}) => {
    
    return(<div id={id}>{name} {phone} <button onClick={removeFunction} value={id}>Delete</button></div>);
}

export default Contact;