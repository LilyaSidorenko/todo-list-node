function itemTemplate(data) {
    var item = '<li class="task todo-list__item">';
    item += '<button class="btn done">Done</button>&nbsp;';
    item += '<button class="todo-list__item-content">'+(data.item.title)+'</button>';
    item += '<button class="btn todo-list__item-remove delete"></button>';
    item += '</li>';

    return item;

}
var add = document.getElementById("todo");
var task = document.getElementById("taskItem");
var update = document.getElementsByClassName("done")
var del = document.getElementsByClassName("delete");
var taskList = document.getElementsByClassName("task");
var updateTask = function () {

    for (var j = 0; j < update.length; j++) {
        update[j].addEventListener("click", function () {
            fetch("/work-tasks/tasks", {
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

    for (var i = 0; i < del.length; i++) {
        del[i].addEventListener("click", function () {
            fetch("/work-tasks/tasks", {
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
                    task.removeChild(this.parentElement)
                })
        })
    }
};
add.addEventListener("submit", function (e) {
        e.preventDefault();
        fetch("/work-tasks/tasks", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": document.getElementById("title").value,
                "type": "work"
            })
        })
        .then(res => {
            if (res.ok) return res.json();
        })
        .then(data => {

            task.insertAdjacentHTML('afterbegin', itemTemplate(data));
            document.getElementById("title").value = '';
            removeTask();
            updateTask();
        })

});
removeTask();
updateTask();
