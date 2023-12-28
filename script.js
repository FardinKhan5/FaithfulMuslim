
function showPages(){
    let pp = fetch("https://api.alquran.cloud/v1/quran/en.asad")
    pp.then((res)=>{
        return res.json()
    }).then((v)=>{
        var i
    var j
    for ( i = 0; i < v.data.surahs.length; i++) {
        let atag=document.createElement("tr")
        atag.innerHTML=`<th scope="row">${i+1}</th><td><a class="ch" href="page.html">${v.data.surahs[i].englishName}</a></td>`
        // atag.classList.add("ch")
        // atag.setAttribute("href","page.html")
        document.getElementById("chapters").appendChild(atag)
    }
    })
}

showPages()
let ch=document.getElementById("chapters")

ch.addEventListener("click",(e)=>{
    if(e.target.classList.contains("ch")){
        // let index = Array.from(e.target.parentElement.children).indexOf(e.target);
        var parentTR = e.target.closest('tr');
        var thValue = parentTR.querySelector('th').textContent
        let index = thValue-1
        // alert(index)
        localStorage.setItem("index",index)
        // let divOfPage=document.getElementById("chapter")
        // alert(index)
        // window.location.href = e.target.href;
    }
    
})

function getTimings(city, country) {
    try {
        p = fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=1&school=1`)
        return p
    } catch (error) {
        return -1
    }

}
let calc = document.getElementById("calc")
calc.addEventListener("click", (e) => {
    e.preventDefault()
    var timejson
    var city = document.getElementById("city").value
    var country = document.getElementById("country").value
    var p = getTimings(city, country)
    if (p == -1) {
        document.getElementById("added").classList.remove("d-none")
        setTimeout(() => {
            document.getElementById("added").classList.add("d-none")
            document.getElementById("city").value = ""
            document.getElementById("country").value = ""
        }, 1000)
    } else {
        p.then((response) => {
            return response.json()
        }).then((json) => {
            function convertTo12HourFormat(time24) {
                // Parse the input time string
                const [hours, minutes] = time24.split(':');
                
                // Convert the hours to a 12-hour format
                let hours12 = parseInt(hours, 10) % 12;
                hours12 = hours12 === 0 ? 12 : hours12; // Handle midnight (00:00) as 12 AM
                
                // Determine whether it's AM or PM
                const period = parseInt(hours, 10) < 12 ? 'AM' : 'PM';
                
                // Create the 12-hour format time string
                const time12 = `${hours12}:${minutes} ${period}`;
                
                return time12;
              }
            

            let fajr = document.getElementById("f").innerText = convertTo12HourFormat(json.data.timings["Fajr"])
            let duhur = document.getElementById("d").innerText = convertTo12HourFormat(json.data.timings["Dhuhr"])
            let asr = document.getElementById("a").innerText = convertTo12HourFormat(json.data.timings["Asr"])
            let maghrib = document.getElementById("m").innerText = convertTo12HourFormat(json.data.timings["Maghrib"])
            let isha = document.getElementById("i").innerText = convertTo12HourFormat(json.data.timings["Isha"])

            let table = document.getElementById("table")
            if (table.classList.contains("d-none")) {
                table.classList.remove("d-none")
            }

        })
    } 
})


    // let pp = fetch("https://api.alquran.cloud/v1/quran/en.asad")
    // pp.then((res)=>{
    //     return res.json()
    // }).then((v)=>{
    //     var i
    // var j
    // for ( i = 0; i < v.data.surahs.length; i++) {
    //     let h=document.createElement("h1")
    //     h.innerText=v.data.surahs[i].englishName
    //     document.getElementById("quran").appendChild(h)
    //     // console.log(v.data.surahs[i].englishName) 
    //     for (j = 0; j < v.data.surahs[i].ayahs.length; j++) 
    //     { 
    //         let a=document.createElement("p")
    //         a.innerText=v.data.surahs[i].ayahs[j].text
    //         document.getElementById("quran").appendChild(a)
    //         // console.log(v.data.surahs[i].ayahs[j].text) 
    //     }
    // }
    // })
    
