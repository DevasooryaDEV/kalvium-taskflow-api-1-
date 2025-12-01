const { error } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/tasks.json');
const router = express.Router();

const readTasks = () => {
   const tasks = fs.readFileSync(filePath);
    return JSON.parse(tasks);
}

const writeTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

router.get('/', (req, res) => {
    try{
    const tasks = readTasks();
    res.json(tasks);
    }catch(err) {
        return res.status(404).json({error: 'Task not found!!'});
    }
});

router.post('/', (req, res) => {
    const {title, description, priority} = req.body;
    if(!title || !priority) {
        return res.status(404).json({error: 'Invalid credentials'});
    }
    const validPriorities = ["low", "medium", "high", "urgent"];
    if(!validPriorities.includes(priority)) {
        return res.status(404).json({error: 'Invalid Priority'});
    }
    const newTask = {
        id: "TASK-" + Date.now(),
        title,
        description: description || "",
        priority,
        status: "pending",
        createdAt: new Date().toISOString(),
    };
    tasks = readTasks();
    tasks.push(newTask);
    writeTasks(newTask);

    res.status(201).json(newTask);
});

module.exports = router;