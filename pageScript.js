function displayText(i){
    let pp = fetch("https://api.alquran.cloud/v1/quran/en.asad")
    pp.then((res)=>{
        return res.json()
    }).then((v)=>{
    var j
        let h=document.createElement("p")
        h.classList.add("h1","bg-light","text-center","text-dark","shadow","rounded")
        h.innerText=v.data.surahs[i].englishName
        h.classList.add("mb-3")
        document.getElementById("pageDiv").appendChild(h)
        // console.log(v.data.surahs[i].englishName) 
        for (j = 0; j < v.data.surahs[i].ayahs.length; j++) 
        { 
            let a=document.createElement("p")
            // a.classList.add("h6")
            a.innerText=v.data.surahs[i].ayahs[j].text
            document.getElementById("pageDiv").appendChild(a)
            // console.log(v.data.surahs[i].ayahs[j].text) 
        }
    
    })
}
let index=localStorage.getItem("index")
index=Number.parseInt(index)
displayText(index)