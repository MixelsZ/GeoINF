var clockInterval;
async function getCountryInfo() {
    const countryName = document.getElementById('searczer').value.trim();
    if (countryName == '') {
        alert('Please enter a country name');
        return;
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const countryData = await response.json();
        console.log(countryData);
        if (Array.isArray(countryData)) {
            const countryInfo = countryData[0];
            let mln = countryInfo.population;
            let ile;
            if(mln>=1000000){
                ile = "M";
                mln = ((countryInfo.population)/1000000).toFixed(1);
            }
            else{
                ile = "k";
                mln = ((countryInfo.population)/1000).toFixed(1);
            }
            if(countryInfo.coatOfArms.png != undefined){
                document.getElementById('countryInfo').innerHTML = `
                <div id="wyszukane">
                    <div style="margin-left: 20px;">
                        <h1>${countryInfo.name.common}</h1>
                        <div class="info" style="margin-left: 10px;">
                            <p><strong>Official Name:</strong> ${countryInfo.name.official}</p>                            
                            <p><strong>Capital City:</strong> ${countryInfo.capital[0]}</p>
                            <p><strong>Region:</strong> ${countryInfo.region}</p>
                            <p><strong>Population:</strong> ${mln}${ile}</p>
                            <p><strong>Area:</strong> ${countryInfo.area} km</p>
                            <p><strong>Languages:</strong> ${Object.values(countryInfo.languages).join(", ")}</p>
                        </div>
                    </div>
                    <div class="zdj">
                        <h1 style="margin-bottom: 10px">Flag:</h1>
                        <img src="${countryInfo.flags.png}" alt="Flag" class="flag1">
                    </div>
                    <div class="zdj">
                         <h1 style="margin-bottom: 10px">Coat Of Arms:</h1>
                         <img src="${countryInfo.coatOfArms.png}" alt="Coat Of Arms" class="godlo">
                    </div>
                </div>
            `;
            }
            else{
                document.getElementById('countryInfo').innerHTML = `
                <div id="wyszukane">
                    <div style="margin-left: 20px;">
                        <h1>${countryInfo.name.common}</h1>
                        <div class="info" style="margin-left: 10px;">
                            <p><strong>Official Name:</strong> ${countryInfo.name.official}</p>                            
                            <p><strong>Capital City:</strong> ${countryInfo.capital[0]}</p>
                            <p><strong>Region:</strong> ${countryInfo.region}</p>
                            <p><strong>Population:</strong> ${mln}${ile}</p>
                            <p><strong>Area:</strong> ${countryInfo.area} km</p>
                            <p><strong>Languages:</strong> ${Object.values(countryInfo.languages).join(", ")}</p>
                        </div>
                    </div>
                    <div class="zdj">
                        <h1 style="margin-bottom: 10px">Flag:</h1>
                        <img src="${countryInfo.flags.png}" alt="Flag" class="flag1">
                    </div>
                </div>
            `;
            }
        } else {
            document.getElementById('countryInfo').innerHTML = 'Country not found.';
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('countryInfo').innerHTML = 'Pojawił się';
    }
}   $(".tit").siblings().hide();
    $("li").hide();
    $(".tit").on("click", function(){
        $(this).siblings().toggle(1000);
    });
    let continent = "all";
    let lang = "all";
let ile_if_lang = 0;
let if_lang;
let table_language = [];
    $(".region").on("click", async function(){
        if ($(this).css("color") == "rgb(173, 216, 230)") {
               $(this).css({"color": "black"});
                continent = "all";
               
                
               
            } 
            else {
                $(".region").css({"color": "black"});
                $(this).css({"color": "lightblue"});
                continent = this.textContent;
               
            }
       
        try {
            if(table_language.length == 0){
                lang = "all";
            }
        if_lang = false;
            ile_if_lang = 0;
        let response;
      if(continent == "all"){
          response = await fetch(`https://restcountries.com/v3.1/all?fullText=true`);  
            
       }
        else{
           response = await fetch(`https://restcountries.com/v3.1/region/${continent}?fullText=true`); 
        }
        

        const countryData = await response.json();
        
        document.getElementById("countryInfo").innerHTML ="";
        selFil.innerHTML = `Selected Filters:
                                <p class="selected">Region: ${continent}</p> 
                                <p class="selected">Languages: ${lang}</p>`
        for(let i = 0; i<countryData.length;i++){
        if (Array.isArray(countryData)) {
            ile_if_lang = 0;
            if_lang = false; 
            const countryInfo = countryData[i];
        if(countryInfo.name.common != "Antarctica"){
        for (const [key, value] of Object.entries(countryInfo.languages)) {
            
            for(let i  = 0; i<table_language.length; i++){
                if(table_language[i] == value ){// 
                   ile_if_lang = ile_if_lang + 1; 
                    
                }
            }
                 
                
            }
        if(ile_if_lang == table_language.length){
            let mln = countryInfo.population;
            let ile;
            if(mln>=1000000){
                ile = "mln";
                mln = ((countryInfo.population)/1000000).toFixed(1);
            }
            else{
                ile = "tys.";
                mln = ((countryInfo.population)/1000).toFixed(1);
            }
            let jezyk1;
            let jezyk2 = "";
            let jezyk_help = 0;
            for (const [key, value] of Object.entries(countryInfo.languages).slice(0, 2)) {
                console.log(value);
                if(jezyk_help == 0){
                   jezyk1 = value; 
                }
                else {
                    jezyk2 = ", " + value;
                }
                
                jezyk_help++;
                
                
            }
            if(jezyk2 == ", Norwegian Bokmål"){
                jezyk2 = "";
            }
            let nazwa = countryInfo.name.common;
            if(nazwa == "Saint Helena, Ascension and Tristan da Cunha"){
                nazwa = "Saint Helena";
            }
            const gogogo = Object.values(Object.entries(countryInfo.languages).slice(0, 2));
            document.getElementById("countryInfo").innerHTML += `
                <div class="podglond">
                    <img class="flag" src="${countryInfo.flags.png}" alt="${countryInfo.name.common}">
                    <div class="pInfo">
                        <h2>${nazwa}</h2>
                        <p><strong>Languages:</strong> ${jezyk1}${jezyk2}</p>
                    </div
                </div>
            `;
            
        } 
        }else {
            document.getElementById('countryInfo').innerHTML = 'Country not found.';
        }     
        
    }
        }
        }catch (error) {
        console.error("Error:", error);
        document.getElementById('countryInfo').innerHTML = 'Pojawił się';
    }
    });
    $(".language").on("click", async function(){
        try {
            if ($(this).css("color") == "rgb(173, 216, 230)") {
               $(this).css({"color": "black"});
                let index = table_language.indexOf(this.textContent);
                table_language.splice(index, 1);
                
               
            } 
            else {
                $(this).css({"color": "lightblue"});
                table_language.push(this.textContent);
            }
            if(table_language.length == 0){
                lang = "all";
            }
            
            
            
            lang = this.textContent;
            
            let response;
      
      if(continent == "all"){
          response = await fetch(`https://restcountries.com/v3.1/all?fullText=true`);  
            
       }
        else{
           response = await fetch(`https://restcountries.com/v3.1/region/${continent}?fullText=true`); 
        }
        

        const countryData = await response.json();
        
        document.getElementById("countryInfo").innerHTML ="";
        selFil.innerHTML = `Selected Filters:
                                <p class="selected">Region: ${continent}</p> 
                                <p class="selected">Languages: ${lang}</p>`
        for(let i = 0; i<countryData.length;i++){
        if (Array.isArray(countryData)) {
            ile_if_lang = 0;
            if_lang = false; 
            const countryInfo = countryData[i];
        if(countryInfo.name.common != "Antarctica"){
        for (const [key, value] of Object.entries(countryInfo.languages)) {
            
            for(let i  = 0; i<table_language.length; i++){
                if(table_language[i] == value ){// 
                   ile_if_lang = ile_if_lang + 1; 
                    
                }
            }
                 
                
            }
        
        if(ile_if_lang == table_language.length){
            let mln = countryInfo.population;
            let ile;
            if(mln>=1000000){
                ile = "mln";
                mln = ((countryInfo.population)/1000000).toFixed(1);
            }
            else{
                ile = "tys.";
                mln = ((countryInfo.population)/1000).toFixed(1);
            }
            let jezyk1;
            let jezyk2 = "";
            let jezyk_help = 0;
            for (const [key, value] of Object.entries(countryInfo.languages).slice(0, 2)) {
                console.log(value);
                if(jezyk_help == 0){
                   jezyk1 = value; 
                }
                else {
                    jezyk2 = ", " + value;
                }
                jezyk_help++; 
            }
            if(jezyk2 == ", Norwegian Bokmål"){
                jezyk2 = "";
            }
            let nazwa = countryInfo.name.common;
            if(nazwa == "Saint Helena, Ascension and Tristan da Cunha"){
                nazwa = "Saint Helena";
            }
            const gogogo = Object.values(Object.entries(countryInfo.languages).slice(0, 2));
            document.getElementById("countryInfo").innerHTML += `
                <div class="podglond">
                    <img class="flag" src="${countryInfo.flags.png}" alt="${countryInfo.name.common}">
                    <div class="pInfo">
                        <h2>${nazwa}</h2>
                        <p><strong>Languages:</strong> ${jezyk1}${jezyk2}</p>
                    </div
                </div>
            `;
        }
         }
        else {
            document.getElementById('countryInfo').innerHTML = 'Country not found.';
        }  
        }
        }
        }catch (error) {
        console.error("Error:", error);
        document.getElementById('countryInfo').innerHTML = 'Pojawił się';
    }
        
    })


    $(document).on("click", ".podglond", async function(){
        const countryName = $(this).find("h2").text();
        console.log(countryName);
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const countryData = await response.json();
        console.log(countryData);
        const countryInfo = countryData[0];
        let mln = countryInfo.population;
        let ile;
        if(mln>=1000000){
            ile = "M";
            mln = ((countryInfo.population)/1000000).toFixed(1);
        }
        else{
            ile = "k";
            mln = ((countryInfo.population)/1000).toFixed(1);
        }
        if(countryInfo.coatOfArms.png != undefined){
            document.getElementById('countryInfo').innerHTML = `
            <div id="wyszukane">
                <div style="margin-left: 20px;">
                    <h1>${countryInfo.name.common}</h1>
                    <div class="info" style="margin-left: 10px;">
                        <p><strong>Official Name:</strong> ${countryInfo.name.official}</p>                            
                        <p><strong>Capital City:</strong> ${countryInfo.capital[0]}</p>
                        <p><strong>Region:</strong> ${countryInfo.region}</p>
                        <p><strong>Population:</strong> ${mln}${ile}</p>
                        <p><strong>Area:</strong> ${countryInfo.area} km</p>
                        <p><strong>Languages:</strong> ${Object.values(countryInfo.languages).join(", ")}</p>
                    </div>
                </div>
                <div class="zdj">
                    <h1 style="margin-bottom: 10px">Flag:</h1>
                    <img src="${countryInfo.flags.png}" alt="Flag" class="flag1">
                </div>
                <div class="zdj">
                     <h1 style="margin-bottom: 10px">Coat Of Arms:</h1>
                     <img src="${countryInfo.coatOfArms.png}" alt="Coat Of Arms" class="godlo">
                </div>
            </div>
        `;
        }
        else{
            document.getElementById('countryInfo').innerHTML = `
            <div id="wyszukane">
                <div style="margin-left: 20px;">
                    <h1>${countryInfo.name.common}</h1>
                    <div class="info" style="margin-left: 10px;">
                        <p><strong>Official Name:</strong> ${countryInfo.name.official}</p>                            
                        <p><strong>Capital City:</strong> ${countryInfo.capital[0]}</p>
                        <p><strong>Region:</strong> ${countryInfo.region}</p>
                        <p><strong>Population:</strong> ${mln}${ile}</p>
                        <p><strong>Area:</strong> ${countryInfo.area} km</p>
                        <p><strong>Languages:</strong> ${Object.values(countryInfo.languages).join(", ")}</p>
                    </div>
                </div>
                <div class="zdj">
                    <h1 style="margin-bottom: 10px">Flag:</h1>
                    <img src="${countryInfo.flags.png}" alt="Flag" class="flag1">
                </div>
            </div>
        `;
        }
    });
    //const continent = li.value;
    //const response = await fetch(`https://restcountries.com/v3.1/region/${continent}?fullText=true`);
//linia 94: <p><strong>Languages:</strong> ${Object.values(countryInfo.languages).join(", ")}</p>
