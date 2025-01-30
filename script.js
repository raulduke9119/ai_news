// API Configuration
const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://your-render-api-url.onrender.com/api'
    : 'http://localhost:3001/api';

let token = localStorage.getItem('token');
let currentUser = null;

// DOM Elements
const mainContent = document.getElementById('mainContent');
const authButtons = document.getElementById('authButtons');
const userInfo = document.getElementById('userInfo');
const username = document.getElementById('username');
const authModal = new bootstrap.Modal(document.getElementById('authModal'));
const threadModal = new bootstrap.Modal(document.getElementById('threadModal'));

// Event Listeners
document.getElementById('loginBtn').addEventListener('click', () => showAuthModal('login'));
document.getElementById('registerBtn').addEventListener('click', () => showAuthModal('register'));
document.getElementById('logoutBtn').addEventListener('click', logout);
document.getElementById('authToggleLink').addEventListener('click', toggleAuthMode);
document.getElementById('authForm').addEventListener('submit', handleAuth);
document.getElementById('threadForm').addEventListener('submit', handleNewThread);
document.getElementById('newThreadLink').addEventListener('click', () => {
    if (!token) {
        showError('Please login to create a new thread');
        return;
    }
    threadModal.show();
});
document.getElementById('homeLink').addEventListener('click', loadThreads);

// Auth Functions
function showAuthModal(mode) {
    const isLogin = mode === 'login';
    document.getElementById('authModalTitle').textContent = isLogin ? 'Login' : 'Register';
    document.getElementById('authSubmitBtn').textContent = isLogin ? 'Login' : 'Register';
    document.getElementById('authToggleLink').textContent = isLogin 
        ? "Don't have an account? Register" 
        : "Already have an account? Login";
    document.getElementById('usernameGroup').style.display = isLogin ? 'none' : 'block';
    authModal.show();
}

function toggleAuthMode(e) {
    e.preventDefault();
    const isCurrentlyLogin = document.getElementById('authModalTitle').textContent === 'Login';
    showAuthModal(isCurrentlyLogin ? 'register' : 'login');
}

async function handleAuth(e) {
    e.preventDefault();
    const isLogin = document.getElementById('authModalTitle').textContent === 'Login';
    const endpoint = isLogin ? 'login' : 'register';
    
    const data = {
        email: document.getElementById('emailInput').value,
        password: document.getElementById('passwordInput').value
    };
    
    if (!isLogin) {
        data.username = document.getElementById('usernameInput').value;
    }
    
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (!response.ok) throw new Error(result.message);
        
        if (isLogin) {
            token = result.token;
            localStorage.setItem('token', token);
            currentUser = result.user;
            updateAuthUI();
            loadThreads();
        } else {
            showAuthModal('login');
            showSuccess('Registration successful! Please login.');
        }
        
        authModal.hide();
    } catch (error) {
        showError(error.message);
    }
}

function logout() {
    token = null;
    currentUser = null;
    localStorage.removeItem('token');
    updateAuthUI();
    loadThreads();
}

function updateAuthUI() {
    if (token) {
        authButtons.classList.add('d-none');
        userInfo.classList.remove('d-none');
        username.textContent = currentUser?.username || 'User';
    } else {
        authButtons.classList.remove('d-none');
        userInfo.classList.add('d-none');
        username.textContent = '';
    }
}

// Thread Functions
async function loadThreads() {
    mainContent.innerHTML = '<div class="loading"></div>';
    
    try {
        const response = await fetch(`${API_URL}/threads`);
        const threads = await response.json();
        
        if (!response.ok) throw new Error('Failed to load threads');
        
        displayThreads(threads);
    } catch (error) {
        showError(error.message);
    }
}

function displayThreads(threads) {
    mainContent.innerHTML = threads.map(thread => `
        <div class="card thread-card">
            <div class="card-body">
                <h5 class="card-title">${escapeHtml(thread.title)}</h5>
                <p class="card-text">${escapeHtml(thread.content)}</p>
                <div class="thread-meta">
                    Posted by ${escapeHtml(thread.author.username)} on ${new Date(thread.createdAt).toLocaleDateString()}
                </div>
            </div>
        </div>
    `).join('');
}

async function handleNewThread(e) {
    e.preventDefault();
    
    const data = {
        title: document.getElementById('threadTitle').value,
        content: document.getElementById('threadContent').value
    };
    
    try {
        const response = await fetch(`${API_URL}/threads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (!response.ok) throw new Error(result.message);
        
        threadModal.hide();
        e.target.reset();
        loadThreads();
        showSuccess('Thread created successfully!');
    } catch (error) {
        showError(error.message);
    }
}

// Utility Functions
function showError(message) {
    const alert = document.createElement('div');
    alert.className = 'error-message';
    alert.textContent = message;
    mainContent.insertAdjacentElement('beforebegin', alert);
    setTimeout(() => alert.remove(), 5000);
}

function showSuccess(message) {
    const alert = document.createElement('div');
    alert.className = 'success-message';
    alert.textContent = message;
    mainContent.insertAdjacentElement('beforebegin', alert);
    setTimeout(() => alert.remove(), 5000);
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Initialize
updateAuthUI();
loadThreads(); 