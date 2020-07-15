$(document).ready(function() {
    var addTodoButton = $("#add-todo-button");
    var newTodoTextField = $("#new-todo-text");
    var todoList = $("#todo-list");

    addTodoButton.click(function() {
        var text = newTodoTextField.val();

        if ((text === "") || (text.trim().length === 0)) {
            alert('Введите значение');
        } else {
            var todoItem = $("<li></li>");
            switchToViewMode();
        }

        function switchToViewMode() {
            todoItem.html("<span class='text'></span><button type='button' class='edit-button'>Редактировать</button><button type='button' class='delete-button'>Удалить</button>");
            todoItem.find(".text").text(text);

            todoItem.find(".delete-button").click(function () {
                todoItem.remove();
            });

            todoItem.find(".edit-button").click(function () {
                todoItem.html("<input class='text-field' type='text'><button type='button' class='save-button'>Сохранить</button><button type='button' class='cancel-button'>Отменить</button>");

                todoItem.find(".text-field").val(text);

                todoItem.find(".cancel-button").click(function () {
                    switchToViewMode();
                });

                todoItem.find(".save-button").click(function () {
                    text = todoItem.find(".text-field").val();
                    switchToViewMode();
                });
            });
        }

        todoList.append(todoItem);
        newTodoTextField.val("");
    });
});