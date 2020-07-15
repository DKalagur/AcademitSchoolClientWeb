document.addEventListener("DOMContentLoaded", function () {
    var addTodoButton = document.getElementById("add-todo-button");
    var newTodoTextField = document.getElementById("new-todo-text");
    var todoList = document.getElementById("todo-list");

    addTodoButton.addEventListener("click", function () {
        var text = newTodoTextField.value;

        if ((text === "") || (text.trim().length === 0)) {
            alert('Введите значение');
        } else {
            var todoItem = document.createElement("li");
            switchToViewMode();
        }

        function switchToViewMode() {
            todoItem.innerHTML = "<span></span><button type='button' class='edit-button'>Редактировать</button><button type='button' class='delete-button'>Удалить</button>";
            todoItem.children[0].textContent = text;

            todoItem.querySelector(".delete-button").addEventListener("click", function () {
                todoItem.parentNode.removeChild(todoItem);
            });

            todoItem.querySelector(".edit-button").addEventListener("click", function () {
                todoItem.innerHTML = "<input type='text'><button type='button' class='save-button'>Сохранить</button><button type='button' class='cancel-button'>Отменить</button>";

                todoItem.children[0].value = text;

                todoItem.querySelector(".cancel-button").addEventListener("click", function () {
                    switchToViewMode();
                });

                todoItem.querySelector(".save-button").addEventListener("click", function () {
                    text = todoItem.children[0].value;
                    switchToViewMode();
                });
            });
        }

        todoList.appendChild(todoItem);
        newTodoTextField.value = "";
    });
});