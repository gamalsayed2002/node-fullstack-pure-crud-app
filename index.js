// express and open port
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
// علشان يقري ملف ال html  و نكتب جوواه جافا
app.set("view engine", "ejs");
// عشان يقري الملفات الي بترتبط مع ملف ال html
app.use(express.static("public"));
// علشان ياخد البيانات من الفورم
app.use(express.urlencoded({ extended: true }));
// مكتبة الوقت
var moment = require("moment");
// for delete data
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
const port = 4000;

// conect to data base

mongoose
  .connect(
    "mongodb+srv://gamalsayedccss:sadisbac@full-stack-crud-app.eqacpmb.mongodb.net/all-data?retryWrites=true&w=majority&appName=full-stack-crud-app"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`port open on ${port} `);
    });
  });
// start routering
const Customer = require("./models/customerSchema");

// post req

app.post("/user/add.html", (req, res) => {
  Customer.create(req.body)
    .then(() => {
      console.log(req.body);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/search", (req, res) => {
  Customer.find({
    $or: [
      { firstName: req.body.searchText },
      { lastName: req.body.searchText },
    ],
  })
    .then((result) => {
      res.render("user/search", { arr: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
// get req

// get all data

app.get("/", (req, res) => {
  Customer.find()
    .then((result) => {
      res.render("index", { result: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});
// add data
app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});
// edit page
app.get("/view/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { result: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});
// show one data
app.get("/user/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((result) => {
      console.log(result);
      res.render("user/view", { customer: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});
// put req
app.put("/edit/:id", (req, res) => {
  Customer.updateOne({ _id: req.params.id }, req.body)
    .then((params) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
// delete

app.delete("/delete/:id", (req, res) => {
  Customer.deleteOne({ _id: req.params.id })
    .then((params) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
