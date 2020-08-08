$(document).ready(function () {
    // навешиваем обработчик на кнопку "Добавить запись"
    $("#add-new-people").click(function () {
        // очищаем старую информацию и стили
        var inputForms = $(".form-control");
        inputForms.removeClass("is-valid is-invalid");
        $("#invalid-phone").text("Пожалуйста введите номер телефона");

        // блок проверки на незаполненные поля       
        var inputFieldsValues = []; // заводим массив, в которой будем хранить введенные значения

        $(".block-right input").each(function () {
            inputFieldsValues.push($(this).val());
            if ($.trim($(this).val()).length === 0) {
                $(this).addClass("is-invalid");
            } else {
                $(this).addClass("is-valid");
            }
        });

        // блок проверки, что контакт с таким номером уже существует
        var inputPhone = $("#form-phone");

        $(".phone").each(function () {
            if ($(this).text() === inputPhone.val()) {
                inputPhone.removeClass("is-valid");
                $("#invalid-phone").text("Телефон с таким номером уже существует!");
                inputPhone.addClass("is-invalid");
            }
        });

        if (!inputForms.hasClass("is-invalid")) {
            // формируем строку для добавления в таблицу в контактами
            var newLine = $("<tr></tr>");

            // добавляем поле-чек бокс
            newLine.append($("<td class='notInfoCell'><input type='checkbox' class='check'></td>"));

            // добавляем поле-номер
            newLine.append($("<th class='number' scope='row'></td>").text($(".number").length + 1));

            // добавляем информативные поля
            var fieldClasses = ["name", "surname", "phone"];
            $(inputFieldsValues).each(function (index, element) {
                $("<td></td>")
                    .text(element)
                    .addClass(fieldClasses[index])
                    .addClass("infoCell")
                    .appendTo(newLine);
            });

            // добавляем кнопку "удалить"
            newLine.append("<td class='notInfoCell'><button type='button' class ='close align-middle'>х</button></td>");

            $("#tbody").append(newLine);

            // навешиваем обработчик на кнопку "удалить"
            $(".close:last").click(function () {
                var self = $(this);

                // выводим сообщение-confirmation
                $.confirm({
                    title: 'Предупреждение',
                    content: 'Вы уверены?',
                    boxWidth: '300px',
                    useBootstrap: false,
                    buttons: {
                        yes: function () {
                            self.closest("tr").remove();
                            recalculateNumbersAfterDel();
                        },
                        cancel: function () {
                        },
                    }
                });
            });
            $("input").val("");
            inputForms.removeClass("is-valid is-invalid");
        }
    });

    function recalculateNumbersAfterDel() {
        $(".number").each(function (i) {
            $(this).text(i + 1);
        });
    }

    // навешиваем обработчик на чек-бокс в шапке
    $("#main-checkbox").change(function () {
        if ($(this).is(':checked')) {
            $(".check").prop('checked', true);
        } else {
            $(".check").prop('checked', false);
        }
    });

    // навешиваем обработчик на кнопку "Удалить выделенное"
    $("#del-selected-row").click(function () {
        // confirmation-form
        $.confirm({
            title: 'Предупреждение',
            content: 'Вы уверены?',
            boxWidth: '300px',
            useBootstrap: false,
            buttons: {
                yes: function () {
                    // удаляем все выделенные строки (кроме шапки таблицы)
                    $(":checked:not(#main-checkbox)").closest("tr").remove();
                    // скидываем чекбокс в шапке таблицы
                    $("#main-checkbox").prop('checked', false);
                    // после удаления строки пересчитываем номера оставшихся строк
                    recalculateNumbersAfterDel();
                },
                cancel: function () {
                },
            }
        });
    });

    var searchForm = $("#search");

    function search() {
        var substring = searchForm.val();

        // находим ячейки таблицы, текст которых содержит искомую подстроку
        var includingSubstringCells = $(".infoCell").filter(function () {
            var self = $(this);
            return self.text().includes(substring);
        });

        var bodyTr = $("tbody tr");

        bodyTr.not($("tr").has(includingSubstringCells)).hide();
        bodyTr.has(includingSubstringCells).show();
        searchForm.val("");
    }

    // навешиваем обработчик на кнопку "Поиск"
    $("#do-search").click(search);

    // навешиваем обработчик на ввод в поле "Поиск"
    $('#search').keydown(function (e) {
        if (e.key === "Enter") {
            search();
            e.preventDefault();
        }
    });

    // навешиваем обработчик на кнопку "Отмена поиска"
    $("#cancel-search").click(function () {
        $("tr").show();
        searchForm.val("");
    });
});