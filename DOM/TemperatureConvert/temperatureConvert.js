document.addEventListener("DOMContentLoaded", function () {
    var convertButton = document.getElementById("convert-button");
    var temperatureTextField = document.getElementById("temperature");

    function convert() {
        var text = temperatureTextField.value;

        if (isNaN(Number(text)) || text.trim().length === 0) {
            alert("Необходимо ввести число. Повторите ввод");
            return;
        }

        // создаем текст с информацией о конвертированной температуре
        var convertToKelvinText = document.createElement("p");
        convertToKelvinText.textContent = "Температура по шкале Кельвина: " + (parseFloat(text) + 273.15).toFixed(2);

        var convertToFahrenheitText = document.createElement("p");
        convertToFahrenheitText.textContent = "Температура по шкале Фаренгейта: " + (parseFloat(text) * 9 / 5 + 32).toFixed(2);

        var convertToKelvinProposition = document.getElementById("convertToKelvinProposition");
        var convertToFahrenheitProposition = document.getElementById("convertToFahrenheitProposition");

        // если текстовых полей еще нет (первый ввод): создаем новые поля и присваим этим полям id. Если поля уже есть, то обновляем в них информацию
        if (convertToKelvinProposition === null) {
            convertToKelvinProposition = document.body.appendChild(convertToKelvinText);
            convertToKelvinProposition.id = "convertToKelvinProposition";
        } else {
            convertToKelvinProposition.textContent = convertToKelvinText.textContent;
        }

        if (convertToFahrenheitProposition === null) {
            convertToFahrenheitProposition = document.body.appendChild(convertToFahrenheitText);
            convertToFahrenheitProposition.id = "convertToFahrenheitProposition";
        } else {
            convertToFahrenheitProposition.textContent = convertToFahrenheitText.textContent;
        }

        convertToFahrenheitProposition.className = "convert";
        convertToKelvinProposition.className = "convert";
    }

    convertButton.addEventListener("click", convert);

    temperatureTextField.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            convert();
            e.preventDefault();
        }
    });
});