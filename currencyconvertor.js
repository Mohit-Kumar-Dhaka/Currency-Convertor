const baseURL = "https://api.frankfurter.app/latest";

const dropDown = document.querySelectorAll(".dropdown select")

const btm = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

const message = document.querySelector(".msg");

for(let select of dropDown){
    for( code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && code === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
        select.addEventListener("change" , (evt)=>{
            updateFlag(evt.target);
        });
}
}

let updateFlag = (element) =>{
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btm.addEventListener("click" , async(evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue === "" ||  amountValue<1){
        amountValue = 1;
        amount.value = "1";
    }
    const from = fromCurr.value;
    const to = toCurr.value;

    const url = `${baseURL}?amount=${amountValue}&from=${from}&to=${to}`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data.rates[to];

    let finalAmount = rate;
    message.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
});