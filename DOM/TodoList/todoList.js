document.addEventListener("DOMContentLoaded", function () {
    var addTodoButton = document.getElementById("add-todo-button");
    var newTodoTextField = document.getElementById("new-todo-text");
    var todoList = document.getElementById("todo-list");

    function addTask() {
        var text = newTodoTextField.value;
        var todoItem = document.createElement("li");
        var isNeedToAddNewChild = true;

        if (text.trim().length === 0) {
            alert('Введите значение');
        } else {
            switchToViewMode();
        }

        function switchToViewMode() {
            todoItem.innerHTML = "<span class='item'></span><button type='button' class='edit-button my-button'>Редактировать</button><button type='button' class='delete-button my-button'>Удалить</button>";
            todoItem.children[0].textContent = text;

            todoItem.querySelector(".delete-button").addEventListener("click", function () {
                todoItem.parentNode.removeChild(todoItem);
            });

            todoItem.querySelector(".edit-button").addEventListener("click", function () {
                todoItem.innerHTML = "<input type='text' class='todo-text'><button type='button' class='save-button my-button'>Сохранить</button><button type='button' class='cancel-button my-button'>Отменить</button>";
                todoItem.children[0].value = text;

                var initialText = text;

                todoItem.querySelector(".cancel-button").addEventListener("click", function () {
                    isNeedToAddNewChild = false;
                    if (text === "") {
                        text = initialText;
                    }
                    switchToViewMode();
                });

                function save() {
                    text = todoItem.children[0].value;
                    if (text.trim().length === 0) {
                        alert('Введите значение');
                    } else {
                        isNeedToAddNewChild = false;
                        switchToViewMode();
                    }
                }

                todoItem.querySelector(".save-button").addEventListener("click", save);

                todoItem.children[0].addEventListener("keypress", function (event) {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        save();
                    }
                });
            });

            if (isNeedToAddNewChild) {
                todoList.appendChild(todoItem);
            }
        }

        newTodoTextField.value = "";
    }

    addTodoButton.addEventListener("click", addTask);

    newTodoTextField.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            addTask();
            e.preventDefault();
        }
    });
});