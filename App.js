const express = require("express");

const app = express();

let PORT = 10000;
const  mysql = require("./connection").con
// app.use(express.urlencoded())
// app.use(express.json())

//configuration
app.set("view engine","hbs");
app.set("views","./view")
app.use(express.static(__dirname + "/public"))//for css configuration
//routing
app.get("/",(req,res)=>{
    // res.send("jiiiiiii--khkjbjkbgbhjb")
    res.render("index");
});

app.get("/add",(req,res)=>{
    // res.send("jiiiiiii--khkjbjkbgbhjb")
    res.render("add");
});


app.get("/search",(req,res)=>{
    // res.send("jiiiiiii--khkjbjkbgbhjb")
    res.render("search");
});


app.get("/update",(req,res)=>{
    // res.send("jiiiiiii--khkjbjkbgbhjb")
    res.render("update");
});

// app.get("/delete",(req,res)=>{
//     // res.send("jiiiiiii--khkjbjkbgbhjb")
//     res.render("delete");
// });

// app.get("/view",(req,res)=>{
//     // res.send("jiiiiiii--khkjbjkbgbhjb")
//     res.render("view");
// });


app.get("/addstudent", (req, res) => {
    // fetching data from form
    const { name, phone, email, gender } = req.query

    // Sanitization XSS...//for seaurity
    let qry = "select *FROM `adi-node`.test where email=? or phoneno=?";//eamil or phone no already same or save na ho...
    
    mysql.query(qry, [email, phone], (err, results) => {
        if (err)
            throw err
        else {

            if (results.length > 0) {
                res.render("add", { checkmesg: true })
            } else {

                // insert query
                let qry2 = "insert into `adi-node`.test values(?,?,?,?)";
               const query = mysql.query(qry2, [name, phone, email, gender], (err, results) => {
                    if (results.affectedRows > 0) {
                        res.render("add", { mesg: true })
                    }
                })
                console.log(query.sql);
            }
        }
    })
});


app.get("/searchstudent", (req, res) => {
    // fetch data from the form
     const { phone } = req.query;

    let qry = "select * from test where phoneno=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("search", { mesg1: true, mesg2: false })
            } else {

                res.render("search", { mesg1: false, mesg2: true })

            }

        }
    })
});




app.get("/updatesearch", (req, res) => {

    const { phone } = req.query;

    let qry = "select * from test where phoneno=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("update", { mesg1: true, mesg2: false, data: results })
            } else {

                res.render("update", { mesg1: false, mesg2: true })

            }

        }
    });
})

app.get("/updatestudent", (req, res) => {
    // fetch data

    const { phone, name, email ,gender} = req.query;
    let qry = "update test set username=? , email=? , gender=?  where phoneno=?";

    mysql.query(qry, [name,email, gender, phone], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("update", { umesg: true })
            }
        }
    })

});

app.get("/delete", (req, res) => {
    res.render("delete")

});


app.get("/removestudent", (req, res) => {

    // fetch data from the form


    const { phone } = req.query;

    let qry = "delete from test where phoneno=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("delete", { mesg1: true, mesg2: false })
            } else {

                res.render("delete", { mesg1: false, mesg2: true })

            }

        }
    });
});

app.get("/view", (req, res) => {
    console.log("check--here")
    let qry = "select * from test ";
    mysql.query(qry, (err, results) => {
        console.log("if--check--to")
        if (err) throw err
        else {
            console.log(results);
            res.render("view", { data: results });

        }

    });

});



app.listen(PORT,"0.0.0.0");// create server