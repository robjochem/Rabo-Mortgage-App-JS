//Evenlisteners for showing and hiding divs on nav button click

document.getElementById("calculatorButton").addEventListener("click",
	function(){
		document.getElementById("calculator").style.display = "block";
		document.getElementById("rente").style.display = "none";
		document.getElementById("voorwaarden").style.display = "none";
	});

document.getElementById("renteButton").addEventListener("click",
	function(){
		document.getElementById("calculator").style.display = "none";
		document.getElementById("rente").style.display = "block";
		document.getElementById("voorwaarden").style.display = "none";
	});

document.getElementById("voorwaardenButton").addEventListener("click",
	function(){
		document.getElementById("calculator").style.display = "none";
		document.getElementById("rente").style.display = "none";
		document.getElementById("voorwaarden").style.display = "block";
	});

document.getElementById("sliderUser").addEventListener("input", slideChange);
document.getElementById("sliderPartner").addEventListener("input", slideChange);
//Change value on sliding
//Change slider upon entering box. Add function to box change

//Use slider input to change the content of the input boxes to fill in incomes
function slideChange() {
    var slider = this;
    var userInputBox;
    var partnerInputBox;

    document.getElementById("resultText").innerHTML = "";
    document.getElementById("resultCalc").innerHTML = "";
    if (slider == document.getElementById("sliderUser")) {
        userInputBox = document.getElementById("userIncome");
        userInputBox.value = slider.value;
    } else {
        partnerInputBox = document.getElementById("partnerIncome");
        partnerInputBox.value = slider.value;
    }
}

//Change slider location upon changing content of incomeBox
document.getElementById("userIncome").addEventListener("change", inputBoxChange);
document.getElementById("partnerIncome").addEventListener("change", inputBoxChange);

function inputBoxChange() {
    var inputBox = this;
    var userSlider;
    var partnerSlider;

    document.getElementById("resultText").innerHTML = "";
    document.getElementById("resultCalc").innerHTML = "";
    if (inputBox.value > 100.000){
        document.getElementById("resultText").innerHTML = "EXCEEDING SLIDER RANGE";
    }
    else if (inputBox == document.getElementById("userIncome")) {
        userSlider = document.getElementById("sliderUser");
        userSlider.value = inputBox.value;
    } else {
        partnerSlider = document.getElementById("sliderPartner");
        partnerSlider.value = inputBox.value;
    }

}

//Max-to-loan request to activate on button #calculate onclick
document.getElementById("calculate").addEventListener("click",
	function(){
        //Request with onreadystatechange
        var maxToLoan = new XMLHttpRequest();
        var url = "http://agile-wave-86684.herokuapp.com/max-to-loan?";
        var params = "income1=" + document.getElementById("userIncome").value + "&" + "income2=" + document.getElementById("partnerIncome").value;
        var update = document.getElementById("resultCalc");
        var resultText = document.getElementById("resultText");
        maxToLoan.open("GET", url + params, true);

        //Send the proper header information along with the request
        //maxToLoan.setRequestHeader("integer", "maxToLoanResult");

        maxToLoan.onreadystatechange = function() {
            if(maxToLoan.readyState == 4 && maxToLoan.status == 200) {
                resultText.innerHTML = "U kunt lenen:";
                update.innerHTML = JSON.parse(maxToLoan.responseText).maxToLoan;
                }
            else if(maxToLoan.readyState == 400){
                update.innerHTML = "400: Bad request";
            }
            else if(maxToLoan.readyState == 404){
                update.innerHTML = "404: Not found";
            }else if(maxToLoan.readyState == 500){
                update.innerHTML = "500: Internal server error";
            }
        }
	maxToLoan.send();
});

document.getElementById("renteButton").addEventListener("click",
    function(){
        var intRateReq = new XMLHttpRequest();
        var url = "http://agile-wave-86684.herokuapp.com/current-mortgage-interest-rate";
        var currentIntRate = document.getElementById("interestRate");
        intRateReq.open("GET", url, true);

        intRateReq.onreadystatechange = function() {
            if (intRateReq.readyState == 4 && intRateReq.status == 200) {
                currentIntRate.innerHTML = JSON.parse(intRateReq.responseText).currentRate;
            }
        }
        intRateReq.send();
        
        //Fill in the input Gezamelijk jaarinkomen box
        var gezInkInputBox = document.getElementById("gezInkInputBox");
        var gezInk = parseInt(document.getElementById("userIncome").value) + parseInt(document.getElementById("partnerIncome").value);
        gezInkInputBox.value = gezInk;
    });


document.getElementById("calcInterest").addEventListener("click",
    function(){
        var gezInkInputbox = document.getElementById("gezInkInputBox");
        var currentInt = document.getElementById("interestRate");
        var resultIntCalc = document.getElementById("resultIntCalc");
        resultIntCalc.innerHTML = "Per maand te betalen: \u20AC" + (((parseFloat (currentInt.innerHTML)/100) * (parseInt (gezInkInputbox.value)))/12).toFixed(2);
    });
/*
**get current interest**
NAME: current-mortgage-interest-rate
METHOD: GET
URL: http://agile-wave-86684.herokuapp.com/current-mortgage-interest-rate
    URL_PARAMS: NONE
ERRORS: 404 (NOT FOUND), 500 (INTERNAL SERVER ERROR)
RESPONSE: JSON
*/

