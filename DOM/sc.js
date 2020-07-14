document.addEventListener("DOMContentLoaded", function () {
    var convertButton = document.getElementById("convert-button");
    var temperatureTextField = document.getElementById("temperature");

    convertButton.addEventListener("click", convert);

    function convert() {
        var text = temperatureTextField.value;

        if (isNaN(Number(text))) {
            alert("Необходимо ввести число. Повторите ввод");
            temperatureTextField.value = "";
        } else {
            var kelvinValue = document.createElement("p");
            kelvinValue.textContent = (parseFloat(text) + 273.15).toFixed(1);

            var fahrenheitValue = document.createElement("p");
            fahrenheitValue.textContent = (parseFloat(text) * 9 / 5 + 32).toFixed(1);

            var convertToKelvinText = document.createElement("p");
            convertToKelvinText.textContent = "Температура по шкале Кельвина: " + kelvinValue.textContent;

            var convertToFahrenheitText = document.createElement("p");
            convertToFahrenheitText.textContent = "Температура по шкале Фаренгейта: " + fahrenheitValue.textContent;

            temperatureTextField.value = "";

            var convertToKelvinProposition = document.getElementById("element1");
            var convertToFahrenheitProposition = document.getElementById("element2");

            if (convertToKelvinProposition == null) {
                var element1 = document.body.appendChild(convertToKelvinText);
                element1.setAttribute("id", "element1");
            } else {
                convertToKelvinProposition.textContent = "Температура по шкале Кельвина: " + kelvinValue.textContent;
            }

            if (convertToFahrenheitProposition === null) {
                var element2 = document.body.appendChild(convertToFahrenheitText);
                element2.setAttribute("id", "element2");
            } else {
                convertToFahrenheitProposition.textContent = "Температура по шкале Фаренгейта: " + fahrenheitValue.textContent;
            }
        }
    }

    temperatureTextField.addEventListener("keydown", function (e) {
        if (e["keyCode"] === 13) {
            convert();
            e.preventDefault();
        }
    });
});