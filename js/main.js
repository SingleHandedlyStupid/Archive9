// === ADMIN LOGIN WITH SESSION ===
const adminUser = "admin";
const adminPass = "password123";

const loginSection = document.getElementById('login-section');
const loginBtn = document.getElementById('login-btn');
const loginMsg = document.getElementById('login-message');
const adminPanel = document.getElementById('admin-panel');
const welcomeMsg = document.getElementById('welcome-msg');

function showAdminPanel() {
    loginSection.style.display = "none";
    adminPanel.style.display = "block";
    welcomeMsg.textContent = `Logged in as ${adminUser}`;
}

function logoutAdmin() {
    localStorage.removeItem('adminSession');
    adminPanel.style.display = "none";
    loginSection.style.display = "block";
    loginMsg.textContent = "Session expired. Please log in again.";
}

// Check if session exists
const session = JSON.parse(localStorage.getItem('adminSession'));
if(session && Date.now() < session.expiresAt){
    showAdminPanel();
} else {
    localStorage.removeItem('adminSession'); // expired session
}

loginBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if(username === adminUser && password === adminPass){
        // Save session for 1 hour
        const expiresAt = Date.now() + 60*60*1000; // 1 hour
        localStorage.setItem('adminSession', JSON.stringify({expiresAt}));
        showAdminPanel();
    } else {
        loginMsg.textContent = "Incorrect login.";
    }
});

// Optional: auto-logout after session expires
setInterval(() => {
    const session = JSON.parse(localStorage.getItem('adminSession'));
    if(session && Date.now() >= session.expiresAt){
        logoutAdmin();
    }
}, 60*1000); // check every minute
