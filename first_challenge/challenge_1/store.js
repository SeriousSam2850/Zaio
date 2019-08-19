

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
    
    document.getElementById('colour').textContent = "COLOR: " + circle[0].id;
}