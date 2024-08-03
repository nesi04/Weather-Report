const weatherForm=document.querySelector(".weatherForm");
const cityName=document.getElementById("cityName");
const container =document.querySelector(".container");
const apiKey="9d7eeddf3f2cab7033f4adc071c84037";

weatherForm.addEventListener("submit", async event=>{
    event.preventDefault();
    const city = cityName.value;
    if(city){
        try {
            const data = await getData(city);
            displayInfo(data); 
            
        } catch (error) {
            displayError(error);
            
        }
    }
    else{
        displayError("Please Enter a city");
    }
});
async function getData(city) {
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Error");
    }
    return await response.json();
}
function displayInfo(data){
    const { name :city,main:{temp,humidity},weather:[{description,id}]}=data;
    container.textContent="";
    container.style.display="flex";

    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descriptionDisplay=document.createElement("p");
    const emoji=document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent=` Temperature : ${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent=`Humidity : ${humidity}%`;
    descriptionDisplay.textContent=description;
    emoji.textContent=getEmoji(id);

    tempDisplay.classList.add("tempDisplay");
    cityDisplay.classList.add("cityDisplay");
    humidityDisplay.classList.add("tempDisplay");
    descriptionDisplay.classList.add("descDisplay");
    emoji.classList.add("emoji");

    container.appendChild(cityDisplay);
    container.appendChild(tempDisplay);
    container.appendChild(humidityDisplay);
    container.appendChild(descriptionDisplay);
    container.appendChild(emoji);

}
function getEmoji(weatherID){
    switch (true) {
        case (weatherID>=200&& weatherID<300):
            return "⛈️"
            break;
        case (weatherID>=300&& weatherID<400):
            return "🌧️"
            break;
        case (weatherID>=500&& weatherID<600):
           return "☔"
           break; 
        case (weatherID>=600&& weatherID<700):
            return "☃️"
            break;  
        case (weatherID>=700&& weatherID<800):
            return "🌫️"
            break;
        case (weatherID>=700&& weatherID<800):
            return "🌫️"
            break; 
        case (weatherID==800):
           return "😎"
           break;
        case (weatherID>=800&& weatherID<900):
         return "😶‍🌫️"
        break        
        default:
            return"🌈"
            break;
    }
}
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");

    container.textContent="";
    container.style.display="flex";
    container.appendChild(errorDisplay);
    
    
}