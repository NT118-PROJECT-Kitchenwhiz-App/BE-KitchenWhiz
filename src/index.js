require("dotenv").config();
const express = require("express");
const app = require("./app");
const path = require("path");

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});