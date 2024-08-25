var inputvalue = document.querySelector('#cityinput')
var btn =  document.querySelector('#add')
var city = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')

apik = "63a90ae96d390ec37d6c1252f5a86e1a"

function convertion(val){
    return(val - 273).toFixed(3)
}

btn.addEventListener('click', function(){

   // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputvalue.value+'&appid='+apik
    .then(res => res.json())

    .then(data =>
        {
            var nameval = data['name']
            var descrip = data['weather']['0']['description']
            var temparature =  data['main']['temp']
            var wndspeed = data['wind']['speed']
        }
    )
)
})