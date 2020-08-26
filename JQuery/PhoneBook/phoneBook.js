$(document).ready(function () {
    var errorListBlock = $("#error-list-block");
    // навешиваем обработчик на кнопку "Добавить запись"
    $("#add-new-people").click(function () {
        // очищаем старую информацию и стили
        $("#error-list li").remove();
        errorListBlock.hide();
        $(".block-right input").removeClass("empty-field");

        // блок проверки, что контакт с таким номером уже существует
        var samePhoneIsExistError = false;
        var inputPhone = $("#form-phone").val();

        $(".phone").each(function () {
            if ($(this).text() === inputPhone) {
                samePhoneIsExistError = true;
                return false;
            }
        });

        // блок проверки на незаполненные поля
        var notAllFieldsEnteredError = false;
        var inputFieldsValues = []; // заводим массив, в которой будем хранить введенные значения
        var emptyFieldsName = [];

        $(".block-right input:not(:checkbox)").each(function () {
            inputFieldsValues.push($(this).val());
            if ($.trim($(this).val()).length === 0) {
                // кладем в массив название незаполненных полей
                emptyFieldsName.push($(this).closest("label").text());
                $(this).addClass("empty-field");
                notAllFieldsEnteredError = true;
            }
        });

        if (notAllFieldsEnteredError) {
            errorListBlock.show();
            emptyFieldsName.forEach(function (element) {
                $("#error-list").append($("<li></li>").text(element)).addClass("error");
            })
        } else if (samePhoneIsExistError) {
            $.alert({
                title: "Ошибка!",
                content: "Контакт с таким телефоном уже существует!",
                boxWidth: "300px",
                useBootstrap: false,
            });
        } else {
            // формируем строку для добавления в таблицу в контактами
            var newLine = $("<tr></tr>");

            // добавляем поле-чек бокс
            newLine.append($("<td class='not-info-cell'><input type='checkbox' class='check'></td>"));

            // добавляем поле-номер
            newLine.append($("<td class='number'></td>").text($(".number").length + 1));

            // добавляем информативные поля
            var fieldClasses = ["name", "surname", "phone"];
            $(inputFieldsValues).each(function (index, element) {
                $("<td></td>")
                    .text(element)
                    .addClass(fieldClasses[index])
                    .addClass("info-cell")
                    .appendTo(newLine);
            });

            // добавляем кнопку "удалить"
            newLine.append("<td class='not-info-cell'><button type='button' class ='close'>X</button></td>");

            $("#tbody").append(newLine);

            // навешиваем обработчик на кнопку "удалить"
            $(".close:last").click(function () {
                var self = $(this);

                // выводим сообщение-confirmation
                $.confirm({
                    title: "Предупреждение",
                    content: "Вы уверены?",
                    boxWidth: "300px",
                    useBootstrap: false,
                    buttons: {
                        Да: function () {
                            self.closest("tr").remove();
                            recalculateNumbersAfterDel();
                        },
                        Отмена: function () {
                        }
                    }
                });
            });
            $(".block-right input").val("");
        }
    });

    function recalculateNumbersAfterDel() {
        $(".number").each(function (i) {
            $(this).text(i + 1);
        });
    }

    // навешиваем обработчик на чек-бокс в шапке
    $("#main-checkbox").change(function () {
        var isChecked = $(this).is(":checked");
        $(".check:visible").prop("checked", isChecked);
    });

    // навешиваем обработчик на кнопку "Удалить выделенное"
    $("#del-selected-row").click(function () {
        // confirmation-form
        $.confirm({
            title: "Предупреждение",
            content: "Вы уверены?",
            boxWidth: "300px",
            useBootstrap: false,
            buttons: {
                Да: function () {
                    // удаляем все выделенные строки (кроме шапки таблицы)
                    $(":checked:not(#main-checkbox)").closest("tr").remove();
                    // скидываем чекбокс в шапке таблицы
                    $("#main-checkbox").prop("checked", false);
                    // после удаления строки пересчитываем номера оставшихся строк
                    recalculateNumbersAfterDel();
                },
                Отмена: function () {
                }
            }
        });
    });

    function search() {
        var substring = $("#search").val();

        // находим ячейки таблицы, текст которых содержит искомую подстроку
        var includingSubstringCells = $(".info-cell").filter(function () {
            var self = $(this);
            return self.text().includes(substring);
        });

        var bodyTr = $(".contacts-table tbody tr");

        bodyTr.not($("tr").has(includingSubstringCells)).hide();
        bodyTr.has(includingSubstringCells).show();
        $("#search").val("");
    }

    // навешиваем обработчик на кнопку "Поиск"
    $("#do-search").click(search);

    // навешиваем обработчик на ввод в поле "Поиск"
    $("#search").keydown(function (e) {
        if (e.key === "Enter") {
            search();
            e.preventDefault();
        }
    });

    // навешиваем обработчик на кнопку "Отмена поиска"
    $("#cancel-search").click(function () {
        $(".contacts-table tbody tr").show();
        $("#search").val("");
    });
});