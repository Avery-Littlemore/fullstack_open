import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({ person, remove }) => {
  return (
    <>
      <p>{person.name} {person.number} <button onClick={() => remove(person)}>delete</button></p>
    </>
  )
}

const Filter = ({ inputValue, onChange }) => {
  return (
    <div>
      filter shown with: <input value={inputValue} 

      onChange={onChange}
      />
    </div>
  )
}

const PersonForm = ({ onSubmit, nameValue, onNameChange, numberValue, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} 

        onChange={onNameChange}
        />
      </div>
      <div>
        number: <input value={numberValue} 

        onChange={onNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ peopleToShow, remove }) => {
  return (
    <>
      {peopleToShow.map(person =>
        <Person key={person.name} person={person} remove={remove} />
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  // console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault();
    if (newName === '') {
      return;
    }
    
    let existingNameFound = false;
    let existingNumFound = false;
    let existingID;

    persons.forEach(obj => {
      if (obj.name === newName) {
        existingNameFound = true;
        existingID = obj.id;
        console.log(obj.number)

        if (obj.number === newNumber || obj.number.length === 0 && newNumber.length === 0) {
          existingNumFound = true;
        }
      }
    })

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (existingNameFound && existingNumFound) {
      alert(`${newName} is already added to the phonebook with phone number ${newNumber}.`);
      return;
    } else if (existingNameFound) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
        .update(existingID, personObject)
        .then(updatedPerson => {
          setPersons(persons.map(note => note.id !== existingID ? note : updatedPerson))
          setNewName('');
          setNewNumber('');
        })
      }
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('');
        setNewNumber('');
      }) 
    }
  }

  const handleNameEntry = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberEntry = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    // console.log(event.target.value)
    setSearchName(event.target.value)
  }

  const peopleToShow = searchName === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));

  const remove = (personToRemove) => {
    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      console.log(persons)
      console.log(`Deleted ${personToRemove.name}`)
      
      personService
        .remove(personToRemove.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personToRemove.id ))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter inputValue={searchName} onChange={handleSearch} />

      <h3>add a new</h3>

      <PersonForm onSubmit={addPerson} 
        nameValue={newName} onNameChange={handleNameEntry}
        numberValue={newNumber} onNumberChange={handleNumberEntry} />

      <h3>Numbers</h3>
        
      <Persons peopleToShow={peopleToShow} remove={remove} />
      
      <div>debug: {newName}</div>
      {/* <div>debug: {persons}</div> */}

    </div>
    
  )
}

export default App