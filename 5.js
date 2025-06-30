import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let tasks = [
    { id: 1, title:'Express', description: 'Topics', status :'pending'},
    { id: 2, title:'Java', description: 'Multi Threading', status :'in-progress'},
    { id: 3, title:'CN', description: 'IP', status :'completed'},
];

app.get('/tasks', (req, res) => {
    res.send(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const Id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === Id);

    if (!task) {
        return res.status(404).send('task not found.');
    }

    res.send(task);
});

app.post('/tasks', (req, res) => {
    const { title, description, status} = req.body;

    if (!title || !description || !status) {
        return res.status(400).send('Both title and description and status are required.');
    }

    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

    const newTask = {
        id: newId,
        title,
        description,
        status
    };

    tasks.push(newTask);
    res.status(201).send(`tasks added: ${JSON.stringify(newTask)}`);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, status} = req.body;

    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).send('tasks not found.');
    }

    task.title = title || tasks.title;
    task.description= description || tasks.description;
    task.status = status || tasks.status;

    res.send(`tasks updated: ${JSON.stringify(tasks)}`);
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(s => s.id === taskId);

    if (index === -1) {
        return res.status(404).send('task not found.');
    }

    const deletedTask = tasks.splice(index, 1)[0];
    res.send(`task deleted: ${JSON.stringify(deletedTask)}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});