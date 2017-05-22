function itemTemplate(data) {
    var item = '<li class="task todo-list__item">';
    item += '<button class="btn done">Done</button>&nbsp;';
    item += '<button class="todo-list__item-content">'+(data.item.title)+'</button>';
    item += '<button class="btn todo-list__item-remove delete"></button>';
    item += '</li>';

    return item;
}

function todoTemplate(data) {
    var template = '<div class="app" id="todo-app">';
    template += '<form action="/add-task" method="POST" class="form"  id="todo">';
    template += '<input class="input form__input" name="title" id="title">';
    template += '<button class="btn form__submit-btn" type="submit">Add</button>';
    template += '</form>';

        template += '<ul class="tasks todo-list" id="taskItem">';
    for(var i = 1; i < data.result.length; i++) {
        template += '<li class="task todo-list__item '  +(data.result[i].classDone)+'" >';
        template += '<button class="btn done">Done</button>';
        template += '<button class="todo-list__item-content">'+(data.result[i].title)+'</button>';
        template += '<button class="btn todo-list__item-remove delete" id=""></button>';
        template += '</li>';
    }
        template += '</ul>';


    template += '</div>';
    return template;
}

document.getElementById("login-button").addEventListener("click", function (e) {
    e.preventDefault();


    fetch("/auth", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": document.getElementById("user").value,
            "password": document.getElementById("pass").value,
        })
    })
        .then(res => {

            if (res.ok) return res.json();
        })
        .then(data => {
            document.getElementById("main-container").innerHTML = (todoTemplate(data));

            var add = document.getElementById("todo");
            var task = document.getElementById("taskItem");

            add.addEventListener("submit", function (e) {
                e.preventDefault();

                fetch("/add-task", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "title": document.getElementById("title").value,
                        "type": "home"
                    })
                })
                    .then(res => {

                        if (res.ok) return res.json();
                    })
                    .then(data => {

                        task.insertAdjacentHTML('afterbegin', itemTemplate(data));
                        document.getElementById("title").value = '';


                        removeTask();
                        updateTask()

                    })

            removeTask();
            updateTask()

        })

    })
});
document.getElementById("singup-button").addEventListener("click", function (e) {
    e.preventDefault();


    fetch("/singup", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": document.getElementById("user").value,
            "password": document.getElementById("pass").value,
        })
    })
        .then(res => {

            if (res.ok) return res.json();
        })
        .then(data => {
            document.getElementById("main-container").innerHTML = (todoTemplate(data));

            var add = document.getElementById("todo");
            var task = document.getElementById("taskItem");

            add.addEventListener("submit", function (e) {
                e.preventDefault();

                fetch("/add-task", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "title": document.getElementById("title").value,
                        "type": "home"
                    })
                })
                    .then(res => {

                        if (res.ok) return res.json();
                    })
                    .then(data => {

                        task.insertAdjacentHTML('afterbegin', itemTemplate(data));
                        document.getElementById("title").value = '';


                        removeTask();
                        updateTask()

                    })

                removeTask();
                updateTask()

            })

        })
});
var updateTask = function () {
    var update = document.getElementsByClassName("done");

    for (var j = 0; j < update.length; j++) {
        update[j].addEventListener("click", function () {
            fetch("/update", {
                method: "put",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    "title": this.nextElementSibling.innerHTML,
                    "classDone": "class-done"
                })
            })
                .then(res => {
                    if (res.ok) return res.json();
                })
                .then(data => {
                    this.parentElement.classList.add('class-done');
                })
        });
    }
};
var removeTask = function () {

    var del = document.getElementsByClassName("delete");

    for (var i = 0; i < del.length; i++) {
        del[i].addEventListener("click", function () {
            fetch("/remove", {
                method: "delete",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "title": this.previousElementSibling.innerHTML
                })

            })
                .then(res => {
                    if (res.ok) return res.json()
                })
                .then(data => {
                    this.parentElement.classList.add('class-delete');
                })
        })
    }
};
document.getElementById("singup").addEventListener("click", function () {
    var form = document.getElementById('form');
    document.getElementById('singup-button').classList.remove('hidden');
    document.getElementById('login-button').classList.add('hidden');
    form.action = '/singup';
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
});


