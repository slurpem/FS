import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

let users = [
  { id: 1, name: 'muesli', stock: 25 ,price:600},
  { id: 2, name: 'milk', stock: 50,price:600 },
];

// Get all users
app.get('/users', (req, res) => {
  res.send(users);
});

// Add new user
app.post('/users', (req, res) => {
  const { name, stock } = req.body;

  if (!name || !stock) {
    return res.status(400).send('Name and stock are required');
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1, 
    name,
    stock,
  };

  users.push(newUser);
  res.status(201).send(`User added: ${JSON.stringify(newUser)}`);
});


app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, stock } = req.body;

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).send('User not found');
  }


  if (name) user.name = name;
  if (price) user.price = price;
  if (stock) user.stock = stock;

  res.send(`User updated: ${JSON.stringify(user)}`);
});


app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return res.status(404).send('User not found');
  }

  const deletedUser = users.splice(index, 1);

  res.send(`User deleted: ${JSON.stringify(deletedUser[0])}`);
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
