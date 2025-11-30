// === ADMIN LOGIN ===
const adminUser = "admin";
const adminPass = "password"; // change this to a safe password

const loginSection = document.getElementById('login-section');
const inputSection = document.getElementById('myth-input-section');
const loginBtn = document.getElementById('login-btn');
const loginMsg = document.getElementById('login-message');

loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(username === adminUser && password === adminPass){
        loginMsg.textContent = "Logged in as admin.";
        loginSection.style.display = "none";
        inputSection.style.display = "block";
    } else {
        loginMsg.textContent = "Incorrect login.";
    }
});

// === MYTH LOG ===
const mythsContainer = document.getElementById('myths-container');
const addBtn = document.getElementById('add-myth-btn');

// Load myths from LocalStorage
let myths = JSON.parse(localStorage.getItem('myths')) || [];

// Function to display myths
function displayMyths() {
    mythsContainer.innerHTML = "";
    myths.forEach((myth, index) => {
        const div = document.createElement('div');
        div.classList.add('myth-entry');
        div.innerHTML = `<strong>NAME:</strong> ${myth.name} <br>
                         <strong>INFO:</strong> ${myth.info} <br>
                         <strong>APPEARANCE:</strong> ${myth.appearance}`;
        mythsContainer.appendChild(div);
    });
}

// Add new myth
addBtn.addEventListener('click', () => {
    const name = document.getElementById('myth-name').value;
    const info = document.getElementById('myth-info').value;
    const appearance = document.getElementById('myth-appearance').value;

    if(name && info && appearance){
        myths.push({name, info, appearance});
        localStorage.setItem('myths', JSON.stringify(myths));
        displayMyths();
        document.getElementById('myth-name').value = "";
        document.getElementById('myth-info').value = "";
        document.getElementById('myth-appearance').value = "";
    }
});

// Initial display
displayMyths();
