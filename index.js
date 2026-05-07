const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"])

const express = require("express");

const app = express();
app.use(express.json());

const connectDB = require("./db");



require("dotenv").config();

const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

app.get("/", (req,res) => {
    res.send("Welcome to the Posts API");
});

// user routes
app.use("/users", userRoutes);

// post routes
app.use("/posts", postRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})

connectDB();