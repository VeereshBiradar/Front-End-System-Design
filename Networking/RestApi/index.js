import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.all('/', (req, res)=> {
    console.log('Request', req);
    console.log('Response', res);
    res.send("You've received the response");
})

const todos = [
    {
        id: 1,
        todo: "Do something nice for someone I care about",
        completed: true,
        userId: 26
    },
    {
        id: 2,
        todo: "Practice gratitude and meditation",
        completed: true,
        userId: 34
    }
]

//READ 
app.get('/todos', (req, res)=> {
    res.json(todos)
});

//CREATE
app.post('/todos', (req, res)=> {
    //data is in the body
    const newTodo = req.body;
    todos.push(newTodo);
    res.json({
        message: 'data added'
    })
});

//UPDATE
app.put('/todos/:id', (req, res)=> {
    const newTodoData = req.body;
    const reqParamsId = Number(req.params.id);

    const todoIndex = todos.findIndex(todo => todo.id === reqParamsId);

    if(todoIndex !== -1) {
        todos[todoIndex] = {
            id: reqParamsId,
            ...newTodoData
        }
    }

    res.json({
        message: 'Todos updated successfully'
    })
});


//DELETE 
app.delete('/todos/:id', (req, res)=> {
    const reqParamsId = Number(req.params.id);

    const todoIndex = todos.find(todo => todo.id === reqParamsId);

    if(todoIndex !== -1)
        todos.splice(todoIndex, 1);

    res.json({
        message: 'Todo deleted succesfully'
    })
})

const PORT = 9000;

app.listen(PORT, ()=> {
    console.log(`Server Running on the port ${PORT}`)
});
