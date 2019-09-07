import React, { useState, useEffect} from 'react'
import Contact from './Contact';
import Form from './Form';
import './App.css';
import { getAll, create, update , remove} from './ServerCall';
const App = () => {
  const [ persons, setPersons] = useState([]) ;
  const [notification, setNotification] = useState("");
  useEffect(()=>{
    getAll().then(allPersons => {setPersons(allPersons)})
  }, []);
  const seeIfPersonExist=(name) =>{
    return persons.find((element)=>{
       return element.name === name;
    });
  };
  const removeContact = (event)=> {
    event.preventDefault();
    const id = event.target.value;
    remove(id);
    let copy = [...persons]
    copy = copy.filter(person=> person.id!==id)
    setPersons(copy)
  }
  const updatePhonebook = (newName, newPhone)=>{
    let existed = seeIfPersonExist(newName);
    let data = {name:newName, number:newPhone};
    if(existed){
      let replace = window.confirm("Do you want to replace an existing number?");
      if(replace){
        update(existed.id, data).then(() => {getAll().then(datas =>setPersons(datas))})
      }
    }
    else{
      let copy = [...persons];
      create(data).then(newData => {copy.push(newData); setPersons(copy)}).then(
        ()=>{
          setNotification(`Added ${newName} to contacts`)
          setTimeout(()=>{
            setNotification("");

          }, 5000);
        }
      );
    }
  }
  const createListOfContacts = ()=>{
    let allPersons = persons.map((element)=>{ return (<Contact id={element.id} key={element.id} name={element.name} 
      removeFunction={removeContact}
      phone={element.number}/>)});
    return allPersons;
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && 
      <div className="notification">
        {notification}
      </div>}
        <Form updateFunction={updatePhonebook}/>
      <h2>Numbers</h2>
      <div>{createListOfContacts()}</div>
    </div>
  )
}

export default App