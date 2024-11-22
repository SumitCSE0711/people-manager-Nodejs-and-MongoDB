// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const personRoutes = require('./routes/personRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Sumit:Sumit0711@cluster1.hbii8.mongodb.net/peopleDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes
app.use('/person', personRoutes);

// Serve static files
app.use(express.static(__dirname)); // Serve static files (HTML, CSS, JS)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
