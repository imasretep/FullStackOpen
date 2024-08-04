import { useState, useEffect } from 'react'
import personService from './services/person'

const Notification = ({message, theme}) => {
  const style = {
    color: theme,
    borderStyle: 'solid',
    fontSize: 18,
    borderRadius: 2,
    padding: 5,
  }

  if(message === null){
    return null
  }

  return(
    <div style={style}>
      {message}
    </div>
  )
}

const Persons = ({persons, deletePerson}) => {
  return(
    <div>
      {persons.map(p => 
        <Person key={p.name} person={p} deletePerson={deletePerson}/>)}
    </div>
  )
}

const Person = ({person, deletePerson }) => {
  return(
    <div>
      {person.name} {person.number} <button onClick={() => deletePerson(person)}>Delete</button>
    </div>
  )
}

const Filter = ({text, handleFilterChange}) => {
  return( 
    <div>
      Filter <input value={text} onChange={handleFilterChange}/> 
    </div>  
  )
}

const PersonForm = ({add, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={add}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [theme, setTheme] = useState('')


  useEffect(() => {
    personService.getAll().then(list => {setPersons(list)})
  },[])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const add = (event) => {
    event.preventDefault()
    const isTrue = persons.some(p => p.name === newName)
    if(!isTrue){
      const person = {
        name: newName,
        number: newNumber
      }
      personService.create(person)
      .then(p => {setPersons(persons.concat(p),
        setTheme('green'),
        setNotification(`${person.name} was added to server`),
      )})
      .catch(error => {
        setTheme('red'),
        setNotification(error.response.data.error)
      })
      setNewName('')
      setNewNumber('')
    }
    else{
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){        
        const updatedPerson = numberUpdater() 
        personService.update(updatedPerson)
        .then(person => 
          {setPersons(
            persons.map(p => {
              if(p.id !== updatedPerson.id){
                return p
              }
              return person
            }),
            setTheme('green'),
            setNotification(`${person.name} was updated to server`),)}
        )
      }
      setNewName('')
      setNewNumber('') 
    }
    setTimeout(() => {
      setNotification(null),
      setTheme('')
    }, 5000)
  }


  const numberUpdater = () => {
    const personUpdate = persons.find(p => p.name === newName)
    const updatedPerson = {...personUpdate, number: newNumber}
    return updatedPerson
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.delete(person)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNotification(`Person '${person.name}' was deleted from server`)
          setTheme('green')
        })
        .catch(error => {
          setNotification(`Person '${person.name}' was already removed from server`)
          setTheme('red')
          setPersons(persons.filter(p => p.id !== person.id))
  
          setTimeout(() => {
            setNotification(null)
            setTheme('')
          }, 5000)
        })
    }
  }
  
  const getList = () => {
    if (filter.length === 0) {
      return persons
    } 
    else {
      return persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    }
  }
  const list = getList()  

  return (
    <div>
      <Notification message={notification} theme={theme}/>
      <h1>Phonebook</h1>
      <Filter text={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
      add={add} 
      newName={newName} 
      handleNameChange={handleNameChange} 
      newNumber={newNumber} 
      handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={list} deletePerson={deletePerson}/>
    </div>
  )
}

export default App