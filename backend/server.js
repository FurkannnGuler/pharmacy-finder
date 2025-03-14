const express = require('express');
const cors = require('cors');
const pharmacyRoutes = require('./routes/pharmacyRoutes');
const drugRoutes = require('./routes/drugRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/pharmacies', pharmacyRoutes);
app.use('/drugs', drugRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));