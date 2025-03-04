import './App.css';
import React from 'react'
import { useState } from 'react'
import axios from 'axios';

function App() {
  const [text, setText] = useState('')
  const [pokemon, setPokemon] = useState('')
  const [name, setName] = useState('')
  const [name2, setName2] = useState('')
  const [response, setResponse] = useState('')

  function handleChange(e, target){
    if (target == "text") {
      setText(e.target.value)
    } else if (target == "pokemon") {
      setPokemon(e.target.value)
    } else if (target == "name") {
      setName(e.target.value)
    } else if (target == "name2") {
      setName2(e.target.value)
    }
  }

  const handleSimpleGet = async () => {
    try {
      const res = await axios.get('http://localhost:5001/v1/simple-get');
      setResponse(res.data);
    } catch (error) {
      setResponse('Error in Simple Get: ' + error);
    }
  };

  const handleDynamicGet = async () => {
    try {
      const res = await axios.get('http://localhost:5001/v1/dynamic-get/' + text);
      setResponse(res.data);
    } catch (error) {
      setResponse('Error in Dynamic Get: ' + error);
    }
  };

  const handlePokemonGet = async () => {
    try {
      const res = await axios.get('http://localhost:5001/v1/pokemon/' + pokemon);
      const { name, id, height, weight } = res.data;
      setResponse('Name: ' + name + ' ID: ' + id + ' Height: ' + height + ' Weight: ' + weight);
    } catch (error) {
      setResponse('Error fetching Pokemon: ' + error);
    }
  };

  const handleAddUser = async () => {
    try {
      const res = await axios.post('http://localhost:5001/v1/users', { name });
      setResponse(JSON.stringify(res.data));
    } catch (error) {
      console.error('Error adding user:', error);
      setResponse('Error adding user');
    }
  };

  const handleGetUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/v1/users/" + name2);
      setResponse(JSON.stringify(res.data));
    } catch (error) {
      console.error('Error fetching users:', error);
      setResponse('Error fetching users');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="response-box">{response}</div>
        <div className="request-box">
          <button onClick={handleSimpleGet}>Simple Get</button>
        </div>
        <div className="request-box">
          <input type="text" value={text} onChange={(e) => handleChange(e, "text")} placeholder="text" />
          <button onClick={handleDynamicGet}>Dynamic Get</button>
        </div>
        <div className="request-box">
          <input type="text" value={pokemon} onChange={(e) => handleChange(e, "pokemon")} placeholder="pokemon" />
          <button onClick={handlePokemonGet}>Pokemon</button>
        </div>
        <div className="request-box">
          <input type="text" value={name} onChange={(e) => handleChange(e, "name")} placeholder="name" />
          <button onClick={handleAddUser}>Add User</button>
        </div>
        <div className="request-box">
          <input type="text" value={name2} onChange={(e) => handleChange(e, "name2")} placeholder="name2" />
          <button onClick={handleGetUsers}>Get Users</button>
        </div>
      </header>
    </div>
  );
}

export default App;