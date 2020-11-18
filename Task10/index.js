const allFunctions=()=>{
const lightToggle=document.querySelector('i');
const body=document.querySelector('body');
const navBar=document.querySelector('nav')
const input=document.querySelector('input');
const cards=document.querySelector('.country-information')
const filter=document.querySelector('.region')
const section=document.getElementById('countries')
const sections=section.getElementsByTagName('div')
const sesh=section.getElementsByClassName('country-information')
console.log(sesh)
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
    //if the data isn't giving set it to Not set
    const dataUnset=(propertyUnset)=>{
        if(propertyUnset!==""){
           return propertyUnset
        }
        else{
           return 'Not set'
        }
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
                    <h4 class="name">${name}</h4>
                    <p class="population">Population: ${dataUnset(addCommas(population))}</p>
                    <p class="region">Region: ${dataUnset(region)}</p>
                    <p class="capital">Capital: ${dataUnset(capital)}</p>
                </div>
            </div>
        `;
        countriesContainer.appendChild(country_info);
    }
    //RegionSelector and Filtering based on picks
    const regionPickList=document.getElementById('regions');
    const regionListHolder=(region)=>{
        const option=document.createElement('option');
        option.classList.add('input')
        option.value=region;
        option.innerText=region;
        regionPickList.appendChild(option);
    }
    const regionTemplate=(regionSort)=>{
        for(const region of regionSort){
            regionListHolder(region)
        }
    }
    const regionSorter=(countriesList)=>{
        const regionSorterTemplate=countriesList.map(({region})=>dataUnset(region))
        const uniqueRegionPicker=Array.from(new Set(regionSorterTemplate));
        return uniqueRegionPicker.sort();
    }
    //Redirecting to the single page
    section.addEventListener('click',()=>{
        location.replace('indexb.html')
    })
    //Filtering based on the pick of the users
    const filteringRegions=(countriesList,eachCountryList)=>{
        const filteredRegion=countriesList.filter((({region})=>dataUnset(region)===eachCountryList));
        generateCountriesList(filteredRegion)
    }
    regionPickList.addEventListener('change',(event)=>{
        if((event.target.value)==="all"){
          generateCountriesList(countriesData)
        }
        else{
            filteringRegions(countriesData,event.target.value)
        }
    })
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
            regionTemplate(regionSorter(countriesData));
            // for(var i=0;i<countriesData.length;i++){
            //     console.log(countriesData[i].name)
            // }
        }
        catch{
            alert("Something went wrong, please try again later")
        }
    }
    fetchCountriesData();
}
allFunctions();