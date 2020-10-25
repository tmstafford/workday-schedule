// add current date
$("#currentDay").text(moment().format('dddd') + ", " + moment().format('MMMM Do'));

let tasks = {
    "9": [],
    "10": [],
    "11": [],
    "12": [],
    "13": [],
    "14": [],
    "15": [],
    "16": [],
    "17": []
};

// function to load tasks to the page from LS if saved
// create task in the rows based on the specified hour 
let loadTasks = function() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        tasks = savedTasks;

        $.each(tasks, function(hour, task) {
            let timeBlock = $("#" + hour);
            createTask(task, timeBlock);
        });
    };

    // put correct background color on each row 
    auditTasks();
};

// create task in each hour row 
let createTask = function(taskText, timeBlock) {
    let taskBlock = timeBlock.find(".task");
    let taskP = $("<p>").addClass("description").text(taskText);
    taskBlock.html(taskP);
};

// function to save tasks in LS
let saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// clicking on the task div will turn it into a textarea element 
$(".task").on("click", function() {
    let text = $(this).text();
    let textInput = $("<textarea>").addClass("form-control").val(text);

    $(this).html(textInput);
    textInput.trigger("focus");
});

// clicking away from task div will turn textarea back into a p element
// and persist the data to localStorage tasks 
$(".task").on("blur", "textarea", function() {
    // get current value/text and parent id attribute 
    let taskGroup = $(this).closest(".task-group");
    let textArea = taskGroup.find("textarea");
    let time = taskGroup.attr("id");
    let text = textArea.val().trim();

    // saves new entry to LS on blur too 
    tasks[time] = [text];
    saveTasks();

    // back to p 
    createTask(text, taskGroup);
});

// clicking save button will save tasks in localstorage
$(".saveBtn").on("click", function() {
    // get current value/text and parent id attribute for the hour 
    let taskGroup = $(this).closest(".task-group");
    let textArea = taskGroup.find("textarea");
    let time = taskGroup.attr("id");
    let text = textArea.val().trim();

    tasks[time] = [text];
    saveTasks();
});

// update background color based on current time (past, present, future)
let auditTasks = function() {
    let currentTime = moment().hour();
    $(".task-group").each(function() {
        let taskTime = parseInt($(this).attr("id"));
        if (taskTime < currentTime) {
            $(this).removeClass("present future").addClass("past");
        } else if (taskTime === currentTime) {
            $(this).removeClass("past future").addClass("present");
        } else {
            $(this).removeClass("past present").addClass("future");
        }
    });
};

// interval to update task background color every 10 minutes 
setInterval(function() {
    auditTasks();
}, 600000);

// init page with tasks 
loadTasks();
