console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const location = search.value;

    const wxAddress = 'http://localhost:3000/weather?address=' + location;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(wxAddress).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = 'Error: ' + data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });

    console.log(location);
});