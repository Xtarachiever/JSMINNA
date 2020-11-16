const lightToggle=document.querySelector('i');
const body=document.querySelector('body');
const navBar=document.querySelector('nav')
const input=document.querySelector('input');
const cards=document.querySelector('.country-information')
const filter=document.querySelector('.region')
const allFunctions=()=>{
    const toGgle=()=>{
        lightToggle.addEventListener('click',()=>{
            body.classList.toggle('light-mode');
            navBar.classList.toggle('light-mode');
            if(lightToggle.innerText=='Dark Mode'){
                lightToggle.innerText=' Light Mode';
            }
            else{
                lightToggle.innerText='Dark Mode';
            }
        })
    }
    const EmptyProperties = (propertyValue) =>
    propertyValue ? propertyValue : 'Not set';
    console.log(lightToggle.innerText)
    toGgle();
    const addCommas=(numberCount)=>{
        if(!Number.isInteger(numberCount)){
            throw new TypeError("This is an integer")
        }
        numberCount=numberCount.toString();
        let lenNumberCount=numberCount.length;
        let nCommas;
        if(Number.isInteger(lenNumberCount/3)){
            nCommas=((lenNumberCount/3)-1);
        }
        else{
            nCommas=Math.floor(lenNumberCount/3)
        }
        //adding the Commas
        for(let i=1;i<=nCommas;i++){
            numberCount=numberCount.slice(0,lenNumberCount-(3*i))+ "," +
            numberCount.slice(lenNumberCount-(3*i));
        }
        return numberCount;
    }
    const countriesContainer = document.getElementById('countries');
    const generateLists=({name,capital,population,region,demonym,flag})=>{
        const country_info=document.createElement('section');
        country_info.classList.add('country-wrapper');
        country_info.innerHTML=`
            <div class="country-information">
                <div class="country-flag">
                    <img src=${flag} alt="${demonym} flag"/>
                </div>
                <div class="details">
                    <h4 class="name">${EmptyProperties(name)}</h4>
                    <p class="population">Population: ${EmptyProperties(addCommas(population))}</p>
                    <p class="region">Region: ${EmptyProperties(region)}</p>
                    <p class="capital">Capital: ${EmptyProperties(capital)}</p>
                </div>
            </div>
        `;
        countriesContainer.appendChild(country_info);
    }
    const regionSelectElement=document.getElementById('regions');
    const generateRegionTemplate=(region)=>{
        const option=document.createElement('option');
        option.value=region;
        option.innerText=region;
        option.classList.add('input');
        regionSelectElement.appendChild(option);
    }
    const generateRegionOptions=(regionList)=>{
        for(const region of regionList){
            generateRegionTemplate(region);
        }
        // console.log(regionList)
    }
    const getCountriesRegions=(countriesList)=>{
        const countriesRegion=countriesList.map(({region})=>(EmptyProperties(region)));
        const uniquecountriesRegion=Array.from(new Set(countriesRegion))
            return uniquecountriesRegion.sort();
    }
    const filterCountriesByRegion=(countriesList,functions)=>{
        const filteredCountriesByRegion=countriesList.filter(({region})=>EmptyProperties(region)===functions());
        generateCountriesList(filteredCountriesByRegion)
    };
    regionSelectElement.addEventListener('change', ({ target }) => {
        if (target.value === 'all') {
            generateCountriesList(countriesData);
        } else {
            filterCountriesByRegion(countriesData, () => target.value);
        }
        // searchCountryInput.value = '';
    });
    const generateCountriesList=(countriesList)=>{
        countriesContainer.innerHTML='';
        for(const country of countriesList){
             generateLists(country);
        }
    }
    input.addEventListener('input',()=>{
        const values=input.value;
        const datas=searchBox(values,countriesData);
        generateCountriesList(datas)
    })
    const searchBox=(value,data)=>{
        var searchData=[]
            for(var i=0;i< data.length;i++){
                var values=value.toLowerCase();
                var name=data[i].name.toLowerCase();
                var region=data[i].region.toLowerCase();
                if(name.includes(values)||region.includes(values)){
                    searchData.push(data[i])
                }
            }
        return searchData;
    }
    let countriesData;
    const fetchCountriesData=async ()=>{
        try{
            const response=await fetch("https://restcountries.eu/rest/v2/all");
            countriesData= await response.json();
            generateCountriesList (countriesData);
            generateRegionOptions(getCountriesRegions(countriesData));
        }
        catch{
            alert("Something went wrong, please try again later")
        }
        // console.log(countriesData)
    }
    fetchCountriesData();
}
allFunctions();