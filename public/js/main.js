const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_real = document.getElementById("temp_real");
const temp_status = document.getElementById("temp_status");
const datahide = document.querySelector(".middle_layer");

const currentDate = new Date();
const currentDayIndex = currentDate.getDay();
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDay = daysOfWeek[currentDayIndex];
const currentMonthIndex = currentDate.getMonth();
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const currentMonth = months[currentMonthIndex];
document.getElementById("day").innerText = currentDay;
document.getElementById("today_date").innerText = currentDate.getDate() + " " + currentMonth;


const getInfo = async (event) => {
    let cityVal = cityName.value;
    event.preventDefault();
    if (cityVal === "") {
        city_name.innerText = "Please enter the city name...";
        datahide.classList.add("data_hide");
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=b31763518972766a671041efbe075605&units=metric`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real.innerText = arrData[0].main.temp;

            const tempMood = arrData[0].weather[0].main;
            if (tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style: 'color: #eccc68;'></i>";
            }
            else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style: 'color: #f1f2f6;'></i>";
            }
            else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style: 'color: #a4b0be;'></i>";
            }
            else {
                temp_status.innerHTML = "<i class='fas fa-cloud' style: 'color: #f1f2f6;'></i>";
            }
            datahide.classList.remove("data_hide");
        }
        catch {
            city_name.innerText = "Please enter the city name properly...";
            datahide.classList.add("data_hide");
        }
    }
}

submitBtn.addEventListener('click', getInfo);