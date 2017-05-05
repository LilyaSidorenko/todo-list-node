module.exports = function(app, passport) {
    var db;
    const MongoClient = require("mongodb").MongoClient;

    MongoClient.connect("mongodb://lilya.sidorenko1:Testing88@ds137090.mlab.com:37090/todo-list", (err, database) => {
        if (err) return console.log(err);
        db = database;

    });
    app.get('/', function(req, res) {
        res.render('index.ejs', { message: req.flash('loginMessage') });
    });
    app.get('/categories', isLoggedIn, function(req, res) {
        res.render('categories.ejs', { message: req.flash('loginMessage') });
    });

    //home tasks
    app.get('/home-tasks', isLoggedIn, function(req, res) {
        db.collection("homeTasks").find().sort({n : -1}).toArray((err, result) => {
            if (err) return console.log(err);
            res.render("home-tasks.ejs", {homeTasks: result})
        })
    });
    app.post("/home-tasks/tasks", (req, res) => {
        db.collection("homeTasks").save(req.body, (err) => {
            if (err) return console.log(err);
            res.redirect("/home-tasks")
        });
    });

    app.put("/home-tasks/tasks", (req, res) => {

        db.collection("homeTasks")
            .findOneAndUpdate({task: req.body.task}, {
                $set: {
                    task: req.body.task,
                    classDone: req.body.classDone
                }
            }, {sort: {_id: -1},
                upsert: true
            }, (err, result) => {
                if (err) return res.send(err);
                res.send(result)
         })
    })
    app.delete("/home-tasks/tasks", (req, res) => {
        db.collection("homeTasks")
            .findOneAndDelete({task: req.body.task},
                (err) => {
                    if (err) return res.send(500, err)
                    res.json("Task was deleted")
                })
    });
    //work tasks
    app.get('/work-tasks', isLoggedIn, function(req, res) {
        db.collection("workTasks").find().sort({n : -1}).toArray((err, result) => {
            if (err) return console.log(err);
            res.render("work-tasks.ejs", {workTasks: result})
        })
    });
    app.post("/work-tasks/tasks", (req, res) => {
        db.collection("workTasks").save(req.body, (err) => {
            if (err) return console.log(err);
            res.redirect("/work-tasks")
        });
    });

    app.put("/work-tasks/tasks", (req, res) => {

        db.collection("workTasks")
            .findOneAndUpdate({task: req.body.task}, {
                $set: {
                    task: req.body.task,
                    classDone: req.body.classDone
                }
            }, {sort: {_id: -1},
                upsert: true
            }, (err, result) => {
                if (err) return res.send(err);
                res.send(result)
            })
    });
    app.delete("/work-tasks/tasks", (req, res) => {
        db.collection("workTasks")
            .findOneAndDelete({task: req.body.task},
                (err) => {
                    if (err) return res.send(500, err)
                    res.json("Task was deleted")
                })
    });

    // logout

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.post('/', passport.authenticate('local-login', {
        successRedirect : '/categories',
        failureRedirect : '/',
        failureFlash : true
    }));

    //Singup
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/categories',
        failureRedirect : '/signup',
        failureFlash : true
    }));
};
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
