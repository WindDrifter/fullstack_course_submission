import React, { useState } from 'react'
const Form = ({updateFunction}) => {
    const [ newName, setNewName ] = useState('')
    const [ newPhone, setNewPhone ] = useState('')

    const updateName = (event)=>{
        setNewName(event.target.value);
    }
    const updatePhone = (event)=>{
        setNewPhone(event.target.value);
    }
    const submitPhoneNumber=(event)=>{
        event.preventDefault();
        updateFunction(newName, newPhone);
            // if successfully added all fields will be gone
        setNewName("");
        setNewPhone("");    
    }
    return(<form>
        <div>
          name: <input value={newName} onChange={updateName}/>
        </div>
        <div>
          Phone: <input value={newPhone} onChange={updatePhone}/>
        </div>
        <div>
          <button type="submit" onClick={submitPhoneNumber}>add</button>
        </div>
      </form>);
}

export default Form;