// ======================================
// WEATHER DASHBOARD
// ======================================



// Отримання елементів

const cityInput =
    document.getElementById(
        "cityInput"
    );

const result =
    document.getElementById(
        "result"
    );

const logs =
    document.getElementById(
        "logs"
    );



// ======================================
// ДОДАВАННЯ ЛОГІВ
// ======================================

function addLog(text) {

    const li =
        document.createElement("li");

    li.textContent = text;

    logs.appendChild(li);
}



// ======================================
// API 1
// ======================================

function fetchFromAPI1(city) {

    return new Promise(
        (resolve, reject) => {

            // Випадкова затримка
            const delay =
                Math.floor(
                    Math.random() * 1500
                ) + 500;

            setTimeout(() => {

                addLog(
                    `API 1 відповіло за ${delay} мс`
                );

                resolve({

                    api: "API 1",

                    city,

                    temp: 20
                });

            }, delay);
        }
    );
}



// ======================================
// API 2
// ======================================

function fetchFromAPI2(city) {

    return new Promise(
        (resolve, reject) => {

            const delay =
                Math.floor(
                    Math.random() * 1500
                ) + 500;

            setTimeout(() => {

                addLog(
                    `API 2 відповіло за ${delay} мс`
                );

                resolve({

                    api: "API 2",

                    city,

                    temp: 22
                });

            }, delay);
        }
    );
}



// ======================================
// API 3
// ======================================

function fetchFromAPI3(city) {

    return new Promise(
        (resolve, reject) => {

            const delay =
                Math.floor(
                    Math.random() * 1500
                ) + 500;

            setTimeout(() => {

                addLog(
                    `API 3 відповіло за ${delay} мс`
                );

                resolve({

                    api: "API 3",

                    city,

                    temp: 18
                });

            }, delay);
        }
    );
}



// ======================================
// TIMEOUT
// ======================================

function timeoutPromise() {

    return new Promise(
        (resolve, reject) => {

            setTimeout(() => {

                reject(
                    "Timeout: більше 3 секунд"
                );

            }, 3000);
        }
    );
}



// ======================================
// ОТРИМАННЯ ПОГОДИ
// ======================================

document
    .getElementById("getWeather")
    .addEventListener("click", () => {

        // Очищення логів
        logs.innerHTML = "";

        // Отримання міста
        const city =
            cityInput.value.trim();

        // Валідація
        if (!city) {

            result.textContent =
                "Введіть місто";

            return;
        }

        // Promise.race
        Promise.race([

            fetchFromAPI1(city),

            fetchFromAPI2(city),

            fetchFromAPI3(city),

            timeoutPromise()

        ])

        // Успіх
        .then(data => {

            result.textContent =

                `Найшвидше відповіло:
                 ${data.api}
                 | Місто:
                 ${data.city}
                 | Температура:
                 ${data.temp}°C`;

        })

        // Помилка
        .catch(error => {

            result.textContent =

                `Помилка:
                 ${error}`;

            addLog(
                `Помилка:
                 ${error}`
            );

        });

    });