var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 50) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
const allFunctions=()=>{
    const numberContainer=document.getElementById('numberContainers');
    const headers=document.getElementById('select');
    const input=document.querySelector('.input');
    //spliting the names into their unique first name
    const seperate=(arr)=>{
        const seperator=","
        const rer=arr.split(seperator)
        const rer1=rer[0];
        return rer1
    }
    //Getting the unique city into the option container
    const optionContainer=(city)=>{
        const option=document.createElement('option');
        option.classList.add('headers')
        option.value=seperate(city);
        option.innerText=city;
        headers.appendChild(option);
        // console.log(option.value)
    }

    //For each of the uniquecity
    const citiesList=(cityList)=>{
        for(const city of cityList){
            optionContainer(city)
        }
    }
    //Sort the cities according to the pick of the users
    const citiesSorter=(cities,eachSortedCity)=>{
        const sortedCities=cities.filter(({name})=>seperate(name)===eachSortedCity);
        generateNumberData(sortedCities);
    }
    headers.addEventListener('change',(event)=>{
        if((event.target.value)==="all"){
            generateNumberData(numberData)
        }
        else{
            citiesSorter(numberData,event.target.value)
        }
    })
    const generateLists=({name,number})=>{
        const numberStores=document.createElement('section')
        numberStores.classList.add('numberStores')
            numberStores.innerHTML+=`
            <div class="numberStores">
               <a href=${number}>${name}
               </a>  
               <a href=${number}>
               <i class="fa fa-phone fa-2x"></i>
               </a>  
            </div>
            `;
        numberContainer.appendChild(numberStores)
    }
    input.addEventListener('input',()=>{
        const values=input.value;
        const datas=searchBox(values,numberData);
        generateNumberData(datas)
    })
    const generateNumberData=(numberData)=>{
        numberContainer.innerHTML='';
        for(const cities of numberData){
             generateLists(cities);
        }
    }
    //searching for the cities
    const searchBox=(value,data)=>{
        var searchData=[]
            for(var i=0;i< data.length;i++){
                var values=value.toLowerCase();
                var name=data[i].name.toLowerCase();
                if(name.includes(values)){
                    searchData.push(data[i])
                }
            }
        return searchData;
    }


    //Gotten the unique city in the data
    const filterUniqueState=(numberData)=>{
        const filterStates=numberData.map(eachState=>seperate(`${eachState.name}`))
        const uniqueCity=Array.from(new Set(filterStates))
        return uniqueCity.sort();
    }
    let numberData;
    const fetching=async()=>{
        try{
            const response=await fetch("https://emajency.com/js/numbers.json")
            numberData= await response.json();
            const gif=document.querySelector('.loader')
            setTimeout(() => {
                gif.style.display='block'
                generateNumberData(numberData)
                citiesList(filterUniqueState(numberData))
            }, 3000);
        }
        catch{
            alert("Sorry, an error occurred while fetching the data")
        }
        // console.log(numberData)
    }
    fetching();
}
allFunctions();