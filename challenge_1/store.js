

let circles = document.getElementsByClassName("outer");

for (let index = 0; index < circles.length; index++) {
    const element = circles[index];
    element.addEventListener('click', function() {
        select(element);
    })
}

function select(element) {

    for (i = 0; i < circles.length; i++) {
        circles[i].className = "outer circle";
    }
    element.className += " selected";

    let circle = element.getElementsByClassName('inner');

    elements = document.getElementsByClassName('colorName')
    elements[0].textContent = "COLOR: " + circle[0].id
    elements[1].textContent = circle[0].id
    
}

//Getting all the elements i need to add listeners to
let add_to_cart = document.getElementById('add_to_cart');
let minus = document.getElementById('minus');
let plus = document.getElementById('plus');
let agree = document.getElementsByClassName('closeBtn')[0];
let cancle = document.getElementsByClassName('closeBtn')[1];

//elements of page
let modal = document.getElementById('popup');
let modalNumber = document.getElementById('count');
let totalNumber = document.getElementById('colourCount');


//functions
add_to_cart.addEventListener('click', openModal);
cancle.addEventListener('click', closeModal);
agree.addEventListener('click', addToTotal);
minus.addEventListener('click', minus_one);
plus.addEventListener('click', add_one);

function openModal() {
    modal.style.display = 'block';
}
function closeModal() {
    modal.style.display = 'none';
    modalNumber.textContent = '0';
}

function add_one() {
    modalNumber.textContent = parseInt(modalNumber.textContent) + 1;
}
function minus_one() {
    if (parseInt(modalNumber.textContent) > 0) {
        modalNumber.textContent = parseInt(modalNumber.textContent) - 1;
    }
}
function addToTotal() {
    totalNumber.textContent = modalNumber.textContent;
    add_to_cart.textContent = "Check out now";
    modalNumber.textContent = '0';
    modal.style.display = 'none';
}




