var update = document.getElementsByClassName("done")
for (var j = 0; j < update.length; j++) {

    update[j].addEventListener("click", function () {
        fetch("/work-tasks/tasks", {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "task": this.nextElementSibling.innerHTML,
                "classDone": "class-done"

            })
        })
            .then(res => {
                if (res.ok) return res.json();
            })
            .then(data => {
                console.log(data);
                window.location.reload(true)
            })
    });
}
var del = document.getElementsByClassName("delete");

for (var i = 0; i < del.length; i++) {
    del[i].addEventListener("click", function () {
        fetch("/work-tasks/tasks", {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "task": this.previousElementSibling.innerHTML
            })

        })
            .then(res => {
                if (res.ok) return res.json()
            })
            .then(data => {
                console.log(data);
                window.location.reload(true)
            })
    })
}



