const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});