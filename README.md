# Code Snippets

## Run the frontend
```html
cd react
npm install
npm start
```

## Run the backend
```html
cd express
npm install
npm start
```

## UI setup (App.js)
```html
<div className="response-box">Response here</div>
<div className="request-box">
  <button>Simple Get</button>
</div>
```

```html
.response-box {
  width: 400px;
  background-color: white;
  height: 100px;
  color: black;
  margin-bottom: 10px;
}
```

```html
.request-box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
}
```

## Conecting React to Express API
```html
import axios from 'axios';
```
```html
const handleSimpleGet = async () => {
  try {
    const res = await axios.get('http://localhost:5001/v1/simple-get');
  } catch (error) {
    
  }
};
```

## Making simple-get responsive
```html
const [response, setResponse] = useState('')
```
```html
const handleSimpleGet = async () => {
  try {
    const res = await axios.get('http://localhost:5001/v1/simple-get');
    setResponse(res.data);
  } catch (error) {
    setResponse('Error in Simple Get: ' + error);
  }
};
```
```html
<div className="response-box">{response}</div>
```
```html
<button onClick={handleSimpleGet}>Simple Get</button>
```

## Implementing dynamic-get
```html
const [text, setText] = useState('')
```
```html
const handleDynamicGet = async () => {
  try {
    const res = await axios.get('http://localhost:5001/v1/dynamic-get/' + text);
    setResponse(res.data);
  } catch (error) {
    setResponse('Error in Dynamic Get: ' + error);
  }
};
```
```html
<div className="request-box">
  <input type="text" value={text} onChange={(e) => handleChange(e, "text")} placeholder="text" />
  <button onClick={handleDynamicGet}>Dynamic Get</button>
</div>
```
```html
function handleChange(e, target){
  if (target == "text") {
    setText(e.target.value)
  }
}
```

## Implementing pokemon
```html
const [pokemon, setPokemon] = useState('')
```
```html
const handlePokemonGet = async () => {
  try {
    const res = await axios.get('http://localhost:5001/v1/pokemon/' + pokemon);
    const { name, id, height, weight } = res.data;
    setResponse('Name: ' + name + ' ID: ' + id + ' Height: ' + height + ' Weight: ' + weight);
  } catch (error) {
    setResponse('Error fetching Pokemon: ' + error);
  }
};
```
```html
<div className="request-box">
  <input type="text" value={pokemon} onChange={(e) => handleChange(e, "pokemon")} placeholder="pokemon" />
  <button onClick={handlePokemonGet}>Pokemon</button>
</div>
```
```html
function handleChange(e, target){
  if (target == "text") {
    setText(e.target.value)
  } else if (target == "pokemon") {
    setPokemon(e.target.value)
  }
}
```

## Implementing add-user
```html
const [name, setName] = useState('')
```
```html
const handleAddUser = async () => {
    try {
      const res = await axios.post('http://localhost:5001/v1/users', { name });
      setResponse(JSON.stringify(res.data));
    } catch (error) {
      console.error('Error adding user:', error);
      setResponse('Error adding user');
    }
};
```
```html
<div className="request-box">
  <input type="text" value={name} onChange={(e) => handleChange(e, "name")} placeholder="name" />
  <button onClick={handleAddUser}>Add User</button>
</div>
```
```html
function handleChange(e, target){
  if (target == "text") {
    setText(e.target.value)
  } else if (target == "pokemon") {
    setPokemon(e.target.value)
  } else if (target == "name") {
    setName(e.target.value)
  }
}
```

## Implementing get-users
```html
const [name2, setName2] = useState('')
```
```html
const handleGetUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/v1/users/" + name2);
      setResponse(JSON.stringify(res.data));
    } catch (error) {
      console.error('Error fetching users:', error);
      setResponse('Error fetching users');
    }
};
```
```html
<div className="request-box">
  <input type="text" value={name2} onChange={(e) => handleChange(e, "name2")} placeholder="name2" />
  <button onClick={handleGetUsers}>Get Users</button>
</div>
```
```html
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
```
