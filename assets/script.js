// add current date
$("#currentDay").text(moment().format('dddd') + ", " + moment().format('MMMM Do'));

let tasks = {};

// function to load tasks to page from storage or make tasks empty
// then create a task
let loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) {
        tasks = {};
    };

    createTask(tasks);
};

// creating the task p element for each hour, append to the hour div 
let createTask = function() {
    $.each(tasks, function(hour, arr) {
        let taskP = $("<p>")
        .addClass("description task-" + hour)
        .text(arr);

        $("#task-item-" + hour).append(taskP);
    })
};



loadTasks();
