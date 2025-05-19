const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const md5 = require("md5");
const app = express();
app.use(cors());
const con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: ""
});
con.connect((err) => {
   if (err) {
       console.log("Błąd połączenia z bazą:", err);
       return;
   }
});
//logowanie
const login = req.params.login;
   const password = req.params.password;
   const sql = `SELECT * FROM users WHERE login = "${login}" AND password = "${md5(password)}"`;
   con.query(sql, (err, result) => {
       if (err) throw err;
       console.log(md5(password));
       res.json(result);
   });
//rejestracja
app.get("/rejestracja/:login/:password", (req, res) => {
   const login = req.params.login;
   const password = req.params.password;
   const sql = `SELECT login FROM users WHERE login = "${login}" `;
   con.query(sql, (err, result) => {
       if (err) throw err;
       if(result.length > 0){
           res.status(302)
           res.json({error: 'Login juz instnieje'})
           return
       } else {
           const sql = `INSERT INTO users (login, password, uprawnienia) VALUES ('${login}','${md5(password)}', 'user')`;
           con.query(sql, (err,result)=>{
               if(err) throw err;
               res.json(result);
           })
       }
       console.log(md5(password));
   });
});