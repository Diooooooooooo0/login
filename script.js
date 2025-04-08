document.addEventListener("DOMContentLoaded", function () {
    let failedAttempts = 0;
    const loginForm = document.getElementById("loginForm");
    const loginButton = document.getElementById("loginButton");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let countdown = 10;

            if (failedAttempts >= 3) return; // Prevents further input during cooldown

            if (username !== "admin123" || password !== "admin123") {
                failedAttempts++;
                if (failedAttempts === 3) {
                    alert("Too many failed attempts. Try again in 10 seconds.");


                    setTimeout(function () {
                        alert("You can try again now.");
                        location.reload();
                    }, 10000);

                } else {
                    alert(`Incorrect login. Attempt ${failedAttempts} of 3.`);
                }
            } else {
                alert("Login successful!");
                window.location.href = "home.html";
            }
        });
    }

    document.getElementById("taskForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const taskText = document.getElementById("taskInput").value.trim();
        const minutes = parseInt(document.getElementById("timerInput").value.trim());
        const timeInSeconds = minutes * 60;

        if (taskText === "" || isNaN(minutes) || minutes <= 0) return;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap";

        const taskName = document.createElement("span");
        taskName.textContent = taskText;

        const display = document.createElement("span");
        display.className = "badge bg-secondary mx-2";
        display.textContent = `⏳ ${formatTime(timeInSeconds)}`;

        const startButton = document.createElement("button");
        startButton.className = "btn btn-success btn-sm";
        startButton.textContent = "Start";

        startButton.addEventListener("click", function () {
            startButton.disabled = true;
            startTimer(display, timeInSeconds, () => {
                startButton.disabled = false;
                display.classList.remove("bg-secondary");
                display.classList.add("bg-success");
                display.textContent = "✅ Done";
            });
        });

        li.appendChild(taskName);
        li.appendChild(display);
        li.appendChild(startButton);

        document.getElementById("taskList").appendChild(li);

        document.getElementById("taskInput").value = "";
        document.getElementById("timerInput").value = "";
    });

    function formatTime(seconds) {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
    }

    function startTimer(display, time, onComplete) {
        const interval = setInterval(() => {
            if (time <= 0) {
                clearInterval(interval);
                onComplete();
            } else {
                display.textContent = `⏳ ${formatTime(time)}`;
                time--;
            }
        }, 1000);
    }
    
    function startTimer(timerId, seconds) {
        const display = document.getElementById(timerId);
        let time = seconds;
    
        const interval = setInterval(() => {
            time--;
            if (time <= 0) {
                clearInterval(interval);
                display.textContent = "✅ Time's up!";
            } else {
                display.textContent = `⏳ ${time}s`;
            }
        }, 1000);
    }

    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskForm && taskInput && taskList) {
        taskForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const taskText = taskInput.value.trim();
            if (taskText === "") return;

            const listItem = document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between align-items-center";
            listItem.textContent = taskText;

            const deleteButton = document.createElement("button");
            deleteButton.className = "btn btn-danger btn-sm";
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () {
                taskList.removeChild(listItem);
            });

            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
            taskInput.value = "";
        });
    }
});
