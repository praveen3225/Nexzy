import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import pkg from "pg"; 
import { dir } from "console";
const { Pool } = pkg;  
import bcrypt from "bcryptjs"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config({});
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const _dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


async function hashPassword(password) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}


let accountDetails = [];
async function loadAccountDetails() {
    try {
        const res = await pool.query("SELECT * FROM userdetails");
        accountDetails = res.rows;
    } catch (err) {
        console.error("Error fetching data", err.stack);
    }
}
loadAccountDetails();

app.get("/", (req, res) => {
    res.sendFile(`${_dirname}/views/authenticationPage.html`);
});

app.get("/createAccount", (req, res) => {
    res.sendFile(`${_dirname}/views/createAccountPage.html`);
});

app.get("/changePassword", (req,res)=>{
    res.sendFile(`${_dirname}/views/passwordChangePage.html`)
})

app.post("/submit", async(req, res) => {
    const username = req.body.username;
    const found = accountDetails.find((samp) => samp.username === username);
    
    if (!found) {
        return res.status(400).json({ message: "Username not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, found.password);

    const role = found.role;

    if (isMatch) {
        res.cookie('userData', JSON.stringify({ username, role }), { httpOnly: false, maxAge: 3600000, secure: false, sameSite:'lax' });
        res.status(200).json({ message: role === 'admin' ? "Admin Login successful" : "Login successful", role });
    } else {
        res.status(400).json({ message: "Invalid password" });
    }
});

app.post("/create", async (req, res) => {
    const { username, email, password, confirmpassword} = req.body;
    const hashedpassword = await hashPassword(password);
    const foundUserName = accountDetails.find((samp) => samp.username === username);
    const foundEmail = accountDetails.find((samp) => samp.email === email);

    if (foundEmail || foundUserName) {
        return res.status(400).json({ message: "Username or email already exists" });
    }

    try {
        if(confirmpassword===password){
            await pool.query("INSERT INTO userdetails (email, username, password) VALUES ($1, $2, $3)", [email, username, hashedpassword]);
            await loadAccountDetails();
            res.status(201).json({ message: "Account created successfully. Redirecting ...", redirect:true });
        }
        else if(confirmpassword!==password) 
        {
            res.status(201).json({ message: "Passwords do not match" });
        }
    } catch (err) {
        console.error("Error inserting data", err);
        res.status(500).json({ message: "Error creating account" });
    }
    console.log(accountDetails)
});

app.post("/verify", async (req,res)=>{
    const {email} = req.body
    const find = accountDetails.find((test)=>test.email===email)
    if(find)
    {
        res.status(200).json({message:"Email matched."})
    }
    else
    {
        res.status(201).json({message:"Not a valid email"})
    }
})

app.patch("/change", async(req, res)=>{
    const {password , email} = req.body
    const hashedpassword = await hashPassword(password);
    const find = accountDetails.find((temp)=> temp.email===email)
    const id = find.id;
    try{
        await pool.query(`UPDATE userdetails SET password = $1 WHERE id = $2`, [hashedpassword, id]);
        console.log(hashedpassword);
        res.status(200).json({ message: "Password updated successfully. Redirecting..." });
        await loadAccountDetails();
    }
    catch (err) {
        console.error("Error inserting data", err);
        res.status(500).json({ message: "Error updating password" });
    }
})

app.listen(port, () => {
    console.log("Server started successfully on port " + port);
});
