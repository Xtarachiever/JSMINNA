const function2=()=>{
    const eachCountry=document.querySelector('.eachCountry')
    const select=document.getElementById('countries')
    eachCountry.addEventListener('change',(event)=>{
        // console.log(event.target.value)
        displayEachData(event.target.value)
})
    let countriesData;
    const generateCountriesList=(countryList)=>{
        let option=""
        country=countryList;
        for(var i=0;i<country.length;i++){
            option+=`<option value="${country[i].alpha3Code}">${country[i].name} (+${country[i].callingCodes})</option>`
        }
        select.innerHTML=option;
        displayEachData("AFG")
    }
    const displayEachData=(countryCode)=>{
        const countryData=countriesData.find(countries=>countries.alpha3Code===countryCode)
        // console.log(countryData)
        document.getElementById('name').innerHTML=countryData.name
        document.getElementById('population').innerHTML=countryData.population
        document.getElementById('capital').innerHTML=countryData.capital
        document.getElementById('region').innerHTML=countryData.region
        document.getElementById('subregion').innerHTML=countryData.subregion
        document.getElementById('currencies').innerHTML=countryData.currencies.filter(r=>r.name).map(r=>`${r.name} ${r.code}`).join(", ")
        document.querySelector('.countryFlag img').src=countryData.flag
        document.querySelector('.countryFlag img').alt=`flag of ${countriesData.name}`
    }
    const fetching=async ()=>{
        try{
            const response=await fetch("https://restcountries.eu/rest/v2/all");
            countriesData= await response.json();
            generateCountriesList (countriesData);
        }
        catch{
            alert("Hello, an error occured")
        }
        // console.log(countriesData)
    }
    fetching();
}
function2();