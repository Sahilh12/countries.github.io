const countriesContainer = document.querySelector('.countries-container')
const filterBar = document.querySelector('#select-bar')
const inputCountry = document.querySelector('.search-bar input')
let allCountries 

fetch('https://restcountries.com/v3.1/all').then((res) => res.json()).then((data) => {
    renderCountries(data)
    allCountries = data
})

filterBar.addEventListener('change' , (e) => {  
    fetch(`https://restcountries.com/v3.1/region/${filterBar.value}`).then((res) => res.json()).then(renderCountries)
})



inputCountry.addEventListener('input' , (e) => {
   const filteredCountry = allCountries.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
   renderCountries(filteredCountry)
})


function renderCountries(data){
    countriesContainer.innerHTML = ''

    data.forEach((country) => {

        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href = `country.html?name=${country.name.common}`

        const cardHTML = `<img src='${country.flags.svg}' alt="flag">
                        <div class="country-text">
                            <h3 class="country-title">${country.name.common}</h3>
                            <p><b>Population : </b>${country.population}</p>
                            <p><b>Region : </b>${country.region}</p>
                            <p><b>Capital : </b>${country.capital}</p>
                        </div>`

        countryCard.innerHTML = cardHTML

        countriesContainer.append(countryCard)
    })
    
}