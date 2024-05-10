const countryName = new URLSearchParams(location.search).get('name')
const borderCountries = document.querySelector('.border-countries p')
const flagImg = document.querySelector('.country-details img')
const country = document.querySelector('.details-text h1')
const nativeName= document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const td = document.querySelector('.tld')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.language')
const backBtn = document.querySelector('.back-btn')
const body = document.querySelector('body')

 

backBtn.addEventListener('click' , ()=>{
    history.back()
})

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res) => res.json()).then((data) => {
    console.log(data[0])
    flagImg.src = data[0].flags.svg
    country.innerText = data[0].name.common

    if(data[0].name.nativeName){
        nativeName.innerText = Object.values(data[0].name.nativeName)[0].common
    }else {
        nativeName.innerText = data[0].name.common
    }

    if(data[0].currencies){
        const currencie = Object.values(data[0].currencies)
        currencies.innerText = Object.values(currencie[0]).join(', ')
    }else{
        currencies.innerText = '-'
    }

    if(data[0].subregion){
        subRegion.innerText = data[0].subregion
    }else{
        subRegion.innerText = '-'
    }

    if( data[0].capital){
        capital.innerText = data[0].capital
    }else{
        capital.innerText = '-'
    }

    if(data[0].languages){
        languages.innerText = Object.values(data[0].languages).join(', ')
    }else{
        languages.innerText = '-'
    }
    population.innerText = data[0].population.toString()
    region.innerText = data[0].region
    
    td.innerText = data[0].tld
    
    if(data[0].borders){
        data[0].borders.forEach(border => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res) => res.json()).then(([borderdata]) => {
                console.log(borderdata)
                const bordertag = document.createElement('a')
                bordertag.innerText = borderdata.name.common
                bordertag.href = `country.html?name=${borderdata.name.common}`
                console.log(bordertag)
                borderCountries.append(bordertag)
            })
        });
    }
}) 


