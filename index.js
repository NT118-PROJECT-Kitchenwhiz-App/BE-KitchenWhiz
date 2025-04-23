require("dotenv").config();
const app = require("./app");
const db = require("./config/database");
const UserModel = require("./models/user_model")


const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});