require("dotenv").config();
const app = require("./app");


const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});