const allFunctions=()=>{
    const timer=()=>{
        const day_year=document.querySelector('#day_year span');
        const weekInfoNo=document.querySelector('#week_number span');
        const day_week=document.querySelector('#day_week span');
        const nigeriaTime=()=>{
            var timeInterval=document.getElementById('clock');
            timeInterval.innerHTML=new Date().toLocaleString("en-US",{timeZone:'Africa/Lagos',timeStyle:'short',hourCycle:'h24'});
            timeInterval.innerHTML+=`<sub>WAT</sub>`
        }
        nigeriaTime();
        setInterval(nigeriaTime,1000)
        const dayInfo=(date)=>{
            const day_info=Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
            day_year.innerHTML=day_info
        }
        dayInfo(new Date());
        const dayWeek=()=>{
            const weekInfo=new Date().getDay()
            day_week.innerHTML=weekInfo
        }
        dayWeek();

        const timeZones=()=>{
            const hour=new Date().getHours();
            const weatherP=document.querySelector('.sun p')
            const sun=document.querySelector('.fa-sun-o')
            const moon=document.querySelector('.fa-moon-o')
            const section=document.querySelector('.section')
            const textChange=document.getElementById('textChange')
            const body=document.querySelector('body')
            console.log(hour)
            if(hour<='12'){
                body.classList.remove('nightView')
                body.classList.add('dayView')
                weatherP.innerText='Good Morning'
                moon.style.display='none'
                sun.style.display='flex'
                section.classList.add('section')
                section.classList.remove('sectionColorNight')
                textChange.innerText="GOOD MORNING, IT'S CURRENTLY"
            }
            else if(hour>='12' && hour<='17'){
                body.classList.remove('nightView')
                body.classList.add('dayView')
                weatherP.innerText='Good Afternoon'
                moon.style.display='none'
                sun.style.display='flex'
                section.classList.add('section')
                section.classList.remove('sectionColorNight')
                textChange.innerText="GOOD AFTERNOON, IT'S CURRENTLY"
            }
            else{
                body.classList.add('nightView')
                body.classList.remove('dayView')
                weatherP.innerText='Good Evening'
                moon.style.display='flex'
                sun.style.display='none'
                section.classList.add('sectionColorNight')
                textChange.innerText="GOOD EVENING, IT'S CURRENTLY"
            }
        }
        timeZones()
        // const timeOffSet=()=>{
        //     const timer=new Date().getTimezoneOffset();
        //     console.log(timer)
        //     console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
        // }
        // timeOffSet();
        Date.prototype.getWeek = function() {
            var onejan = new Date(this.getFullYear(), 0, 1);
            return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
        }
        var weekNumber = (new Date()).getWeek();
        weekInfoNo.innerHTML=weekNumber  
        
        const toggle=()=>{
            const toggleButton=document.querySelector('button')
            const toggler=document.querySelector('button span');
            const section=document.querySelector('.section');
            const fa_icons_down=document.querySelector('button .fa-chevron-circle-down');
            const fa_icons_up=document.querySelector('.fa-chevron-circle-up');
            toggleButton.addEventListener('click',()=>{
                section.classList.toggle('sectionToggler')
                if(toggler.innerText=='More'){
                    toggler.innerText='Less';
                    fa_icons_down.style.display='flex'
                    fa_icons_up.style.display='none'
                }
                else{
                    toggler.innerText='More'
                    fa_icons_down.style.display='none'
                    fa_icons_up.style.display='flex'
                }
            })
        }
        toggle();
        const weatherToggler=()=>{
            const weather=document.querySelector('.sun')
            const weatherP=document.querySelector('.sun p')
            const sun=document.querySelector('.fa-sun-o')
            const moon=document.querySelector('.fa-moon-o')
            const body=document.querySelector('body')
            const section=document.querySelector('.section')
            const textChange=document.getElementById('textChange')
            weather.addEventListener('click',()=>{
                if(weatherP.innerText=='Good Morning'){
                    weatherP.innerText='Good Evening'
                    moon.style.display='flex'
                    sun.style.display='none'
                    body.classList.add('nightView')
                    body.classList.remove('dayView')
                    section.classList.add('sectionColorNight')
                    textChange.innerText="GOOD EVENING, IT'S CURRENTLY"
                }
                else{
                    weatherP.innerText='Good Morning'
                    moon.style.display='none'
                    sun.style.display='flex'
                    body.classList.remove('nightView')
                    body.classList.add('dayView')
                    section.classList.add('section')
                    section.classList.remove('sectionColorNight')
                    textChange.innerText="GOOD MORNING, IT'S CURRENTLY"
                }
            })
        }
        weatherToggler();
    }
    timer();
}
allFunctions();