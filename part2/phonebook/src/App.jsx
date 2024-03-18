import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <>
      <p>{person.name} {person.number}</p>
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

const Persons = ({ peopleToShow }) => {
  return (
    <>
      {peopleToShow.map(person =>
        <Person key={person.name} person={person} />
      )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(obj => obj.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    } else if (newName === '') {
      return;
    }
    
    const personObject = {
      name: newName,
      number: newNumber
    }
  
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  }

  const handleNameEntry = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberEntry = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearchName(event.target.value)
  }

  const peopleToShow = searchName === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter inputValue={searchName} onChange={handleSearch} />

      <h3>add a new</h3>

      <PersonForm onSubmit={addPerson} 
        nameValue={newName} onNameChange={handleNameEntry}
        numberValue={newNumber} onNumberChange={handleNumberEntry} />

      <h3>Numbers</h3>
        
      <Persons peopleToShow={peopleToShow} />
      
      <div>debug: {newName}</div>
      {/* <div>debug: {persons}</div> */}

    </div>
    
  )
}

export default App