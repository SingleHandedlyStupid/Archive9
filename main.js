// === ADMIN LOGIN ===
const adminUser = "admin";
const adminPass = "password123"; // change this

const loginSection = document.getElementById('login-section');
const loginBtn = document.getElementById('login-btn');
const loginMsg = document.getElementById('login-message');
const adminPanel = document.getElementById('admin-panel');
const welcomeMsg = document.getElementById('welcome-msg');

loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(username === adminUser && password === adminPass){
        loginMsg.textContent = "";
        loginSection.style.display = "none";
        adminPanel.style.display = "block";
        welcomeMsg.textContent = `Logged in as ${username}`;
    } else {
        loginMsg.textContent = "Incorrect login.";
    }
});

// === TAB FUNCTIONALITY ===
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(tab => tab.style.display = "none");
        document.getElementById(btn.dataset.target).style.display = "block";
    });
});

// === MYTH LOG ===
const mythsContainer = document.getElementById('myths-container');
const addBtn = document.getElementById('add-myth-btn');

let myths = JSON.parse(localStorage.getItem('myths')) || [];

function displayMyths() {
    mythsContainer.innerHTML = "";
    myths.forEach(myth => {
        const div = document.createElement('div');
        div.classList.add('myth-entry');
        div.innerHTML = `<strong>NAME:</strong> ${myth.name}<br>
                         <strong>INFO:</strong> ${myth.info}<br>
                         <strong>APPEARANCE:</strong> ${myth.appearance}`;
        mythsContainer.appendChild(div);
    });
}

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

// Display myths initially
displayMyths();

// === FACILITY LOGS ===
const logsTextarea = document.getElementById('logs-textarea');
const saveLogsBtn = document.getElementById('save-logs-btn');
logsTextarea.value = localStorage.getItem('facilityLogs') || "";

saveLogsBtn.addEventListener('click', () => {
    localStorage.setItem('facilityLogs', logsTextarea.value);
    alert("Logs saved.");
});
