const express = require('express'); //external module for using express
const { Client } = require('pg') //external module for using postgres with node
const config = require('./config.js'); // internal module for connecting to our config file

const app = express();
const port = 3000;

app.use(express.json());

const client = new Client(config); //creating our database Client with our config values

//NEW CODE
const getCities = async () => {
  await client.connect() //connecting to our database
  const result = await client.query('SELECT * FROM saved_city');
  console.log(result.rows);
  await client.end() //ending the connection to our database
  return result.rows;
}

app.get('/get-cities', async (req, res) => {
  const cities = await getCities();
   // This will allow us to connect our localhost frontend to make the API call. Check to see if your port is the same. Without this extra code, the browser will throw an error because it will think there is a security risk.
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500').send(cities);
});

const getCity = async (id) => {
  await client.connect() 
  const result = await client.query(`SELECT * FROM saved_city WHERE id = ${id}`)
  console.log(result.rows);
  await client.end() 
  return result.rows; 
}

app.get('/get-city/:id', async (req, res) => {
  const city = await getCity(req.params.id);
  res.send(city);
});

const addCity = async (id, city_name) => {
  await client.connect()
  const maxIdResult = await client.query('SELECT MAX(id) AS max_id FROM saved_city');
  const maxId = maxIdResult.rows[0].max_id || 0;
  const nextId = maxId + 1;
  const result = await client.query(
      `INSERT INTO saved_city (id, city_name) 
      VALUES (${nextId}, '${city_name}')`
  );
  console.log(result.rows);
  await client.end()
  return result.rows;
}
app.post('/add-city', async (req, res) => {
  await addCity(
      req.body.city_name
  );  
  res.send("City data added");
});

const deleteCity = async (id) => {
  await client.connect()
  const query = {
  text: 'DELETE FROM saved_city WHERE id = $1',
  values: [id],
  };

  const result = await client.query(query);
  console.log(result.rows);
  await client.end()
  return result.rows;
};


app.delete("/delete-city/:id", async (req, res) => {
  const id = Number(req.params.id);
  await deleteCity(id);
  res.send("City with " + id + " has been deleted.");
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});