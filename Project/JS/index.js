function showNav(){
    document.getElementsByClassName("header")[0].classList.toggle("active");
}
const allFunctions=()=>{
    const datas=document.querySelector('.datas');
    const electronics=document.querySelector('.elects');
    const all=document.querySelector('.all');
    const furniture=document.querySelector('.furn');
    const categoryPicker=document.getElementById('listed');
    const categoryHolder=(eachCategory)=>{
        const option=document.createElement('option');
        option.value=eachCategory;
        option.innerText=eachCategory;
        categoryPicker.appendChild(option);
    }
    const categoryTemplate=(categories)=>{
        for(const eachCategory of categories){
            categoryHolder(eachCategory)
        }
    }
    const categorySorter=(data)=>{
        const category=data.map(({itemCategory})=>itemCategory);
        const uniqueCategory=Array.from(new Set(category));
        return uniqueCategory;
    }
    const filterCategory=(data,filteredItem)=>{
        const filteredCategory=data.filter((({itemCategory})=>itemCategory===filteredItem));
        generateSuggestions(filteredCategory)
    }
    categoryPicker.addEventListener('change',(e)=>{
        if(e.target.value==='all'){
            generateSuggestions(allData)
        }
        else{
            filterCategory(allData,e.target.value)
            // console.log(allData,e.target.value)
        }
    })
    const generatedData=({id,itemName,itemCategory,itemDescription})=>{
        const eachData=document.createElement('section');
            eachData.innerHTML=`
            <div class="cards">
              <div class="heading">
              <p class="price">$150</p>
              <i class="fa fa-heart"></i></div>
              <p>${itemName}</p>
              <p>${itemCategory}</p>
              <p>${itemDescription}</p>
            </div>
        `
        datas.appendChild(eachData);
        datas.classList.add('datas');
    }
    const generateSuggestions=(data)=>{
        for(const country of data){
            generatedData(country)
        };
    }
    const navBar=document.querySelector('.nav-bar');
    const items=document.querySelector('.options');
    navBar.addEventListener('click',()=>{
        items.classList.toggle('toggler');
    });
    let allData;
    const fetchData=async ()=>{
        const response=await fetch('https://jsminnastore.herokuapp.com/suggested',{
            method:'GET',
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "Authorization":'Bearer ' + localStorage.getItem('token')
            }
        });
        response.json()
        .then(dats=>{
            allData=dats.payload.result;
            generateSuggestions(allData)
            categoryTemplate(categorySorter(allData))
            // console.log(allData)
        })
    }
    fetchData();
}
allFunctions();