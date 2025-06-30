import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let students = [
    { id: 1, name: 'Alice Johnson', course: 'Mathematics' },
    { id: 2, name: 'Bob Smith', course: 'Physics' },
    { id: 3, name: 'Carol Lee', course: 'Computer Science' }
];

app.get('/students', (req, res) => {
    res.send(students);
});

app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).send('Student not found.');
    }

    res.send(student);
});

app.post('/students', (req, res) => {
    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).send('Both name and course are required.');
    }

    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;

    const newStudent = {
        id: newId,
        name,
        course
    };

    students.push(newStudent);
    res.status(201).send(`Student added: ${JSON.stringify(newStudent)}`);
});

app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const { name, course } = req.body;

    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).send('Student not found.');
    }

    if (name) student.name = name;
    if (course) student.course = course;

    res.send(`Student updated: ${JSON.stringify(student)}`);
});

app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === studentId);

    if (index === -1) {
        return res.status(404).send('Student not found.');
    }

    const deletedStudent = students.splice(index, 1)[0];
    res.send(`Student deleted: ${JSON.stringify(deletedStudent)}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});