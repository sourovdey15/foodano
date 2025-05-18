// Set Inner Text
function setInnerTxt(id, value){
    document.getElementById(id).innerText = value;
}
// Get Value 
function getValue(id){
    const getValue = document.getElementById(id).textContent ;
    const convertValue = parseFloat(getValue);
    return convertValue;
};

