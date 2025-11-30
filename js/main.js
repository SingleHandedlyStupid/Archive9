// === ADMIN LOGIN ===
const adminUser = "admin";
const adminPass = "password123";

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

// === ADMIN PANEL TABS ===
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

displayMyths();

// === FACILITY LOGS ===
const logsTextarea = document.getElementById('logs-textarea');
const saveLogsBtn = document.getElementById('save-logs-btn');
logsTextarea.value = localStorage.getItem('facilityLogs') || "";

saveLogsBtn.addEventListener('click', () => {
    localStorage.setItem('facilityLogs', logsTextarea.value);
    alert("Logs saved.");
});

// === VISITOR REQUEST SYSTEM ===
const requestBtn = document.getElementById('send-request-btn');
const requestText = document.getElementById('request-text');
const requestMsg = document.getElementById('request-msg');

let requestData = JSON.parse(localStorage.getItem('requestData')) || {};

function saveRequestData() {
    localStorage.setItem('requestData', JSON.stringify(requestData));
}

function isNSFW(text) {
    const bannedWords = ["nsfw","sex","porn","xxx","nude"];
    text = text.toLowerCase();
    return bannedWords.some(word => text.includes(word));
}

requestBtn.addEventListener('click', () => {
    const userKey = "visitor"; 
    const now = Date.now();

    if(requestData[userKey] && requestData[userKey].blockedUntil && now < requestData[userKey].blockedUntil){
        const remaining = Math.ceil((requestData[userKey].blockedUntil - now)/(1000*60*60*24));
        requestMsg.textContent = `You are blocked for ${remaining} more day(s).`;
        return;
    }

    if(isNSFW(requestText.value)){
        requestData[userKey] = {blockedUntil: now + 7*24*60*60*1000};
        saveRequestData();
        requestMsg.textContent = "NSFW content detected! You are blocked for 1 week.";
        requestText.value = "";
        return;
    }

    if(requestData[userKey] && requestData[userKey].lastRequest && now - requestData[userKey].lastRequest < 24*60*60*1000){
        requestMsg.textContent = "You can only make 1 request per day.";
        return;
    }

    requestData[userKey] = {lastRequest: now};
    saveRequestData();
    requestMsg.textContent = "Request sent successfully!";
    requestText.value = "";

    console.log("Request submitted:", requestText.value);
});
