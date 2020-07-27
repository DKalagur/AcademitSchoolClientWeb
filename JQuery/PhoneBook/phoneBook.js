$(document).ready(function () {
    var addButton = $("add-new-people");

    $("#add-new-people").click(function () {
        var errorList = $("#error-list");
        $("li").remove();
        $("#all-list").hide();
        $("input").removeClass("emptyField");
        var error = false;
        var values = [];
        var emptyFieldsName = [];
        var number = $(".number").length;

        $("input").each(function (index) {
            values.push($(this).val());
            if ($.trim($(this).val()).length === 0) {
                //кладем в список название незаполненных полей
                emptyFieldsName.push($(this).closest('label').text());
                $(this).addClass("emptyField");
                error = true;
            }
        });

        if (error === true) {
            //показываем блок про ошибку и отображаем названия незаполненных полей
            $("#all-list").show();
            for (var i = 0; i < emptyFieldsName.length; ++i) {
                var emptyFieldName = $("<li></li>").addClass("error");
                emptyFieldName.text(emptyFieldsName[i]);
                errorList.append(emptyFieldName);
            }
        } else {
            //формируем строку для добавления в таблицу в контактами
            var newLine = $("<tr></tr>");

            //добавляем поле-номер
            var cell = $("<td class='number'></td>");
            cell.text(number + 1);
            newLine.append(cell);

            // добавляем остальные поля (кроме кнопки "удалить")
            $(values).each(function (index, element) {
                cell = $("<td></td>");
                cell.text(element);
                newLine.append(cell);
            });

            // добавляем кнопку "удалить"
            newLine.append("<td><button type='button' class ='close'>X</button></td>");

            $("#tbody").append(newLine);

            //навешиваем обработчик на кнопку "удалить"
            $(".close").click(function () {
                $(this).closest("tr").remove();
                $(".number").each(function (i) {
                    $(this).text(i + 1);
                });
            });
            $("input").val("");
        }
    });
});