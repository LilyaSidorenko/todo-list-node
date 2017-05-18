//
// document.getElementById("homeTask").addEventListener('click', function (e) {
//     console.log('eeee')
//     e.preventDefault();
//     fetch("/home-tasks", {
//         method: "get",
//         headers: {"Content-Type": "application/json"},
//
//     })
//         .then(res => {
//             if (res.ok) return res;
//
//         })
//         .then(data => {
//             location.replace(data.url)
//         })
// })