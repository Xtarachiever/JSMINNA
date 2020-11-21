const functions=()=>{
    const input=document.querySelector('.inputs')
    const button=document.querySelector('button')
    const numberContainer=document.querySelector('.numberContainer')
    button.addEventListener('click',()=>{
        const values=input.value;
        const datas=searchBox(values,numberData);
        generateNumberData(datas)
        if(input.value===""){
          numberContainer.style.display="none"
        }
        else{
            numberContainer.style.display="block"
        }
    })
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
    const generateLists=({name,number})=>{
        const numberStores=document.createElement('section')
        numberStores.classList.add('numberStores')
            numberStores.innerHTML+=`
            <div>
               <a href="tel:${number}">${name}
               <i class="fa fa-phone fa-2x"></i>
               </a>  
            </div>
            `;
        numberContainer.appendChild(numberStores)
    }
    const generateNumberData=(numberData)=>{
        numberContainer.innerHTML='';
        for(const cities of numberData){
             generateLists(cities);
        }
    }
    let numberData;
    const fetching=async()=>{
        try{
            const response=await fetch("https://emajency.com/js/numbers.json")
            numberData= await response.json();
            generateNumberData(numberData)
        }
        catch{
            alert("Sorry, an error occurred while fetching the data")
        }
    }
    fetching();
}
functions();