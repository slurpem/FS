import express from 'express';

const app = express();
const port = 3000;

app.use(express.json())
let users = [
    {id:1,name:"jude",email:"jude@hotmail.com"},
    {id:2,name:"carlo",email:"carlo@gmail.com"}
];

app.get('/users',(req,res) => {
    res.send(users);
});

app.post('/users', (req,res)=>{
    const {name, email} = req.body
    const newUser = {
        id:users.length+1,
        name,
        email
    }
    users.push(newUser);
    res.status(201).send(`Users added: ${JSON.stringify(newUser)}`)
});

app.put('/users/:id',(req,res)=>{
    const userID = parseInt(req.params.id);
    const {name, email} = req.body
    const user = users.find(u=> u.id===userID);

    if(!user){
        return res.status(404).send("User not found")
    }

    user.name = name || user.name;
    user.email = email || user.email;
    
    res.send(`User updated: ${JSON.stringify(user)}`)
});

app.delete('/users/:id',(req,res)=>{
    const userID = parseInt(req.params.id);
    const index = users.findIndex(u=>u.id === userID)

    if(index === -1){
        return res.status(404).send("User not found")
    }

    const deleteUser = users.splice(index,1)
    res.send(`User deleted: ${JSON.stringify(deleteUser[0])}`)
});


app.listen(port,()=>{
    console.log(`Port running on http://localhost:${port}`);
});