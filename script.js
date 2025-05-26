// script.js
// Add these new functions to existing code

// Encryption functions
function encryptText(text, password) {
    return CryptoJS.AES.encrypt(text, password).toString();
}

function decryptText(ciphertext, password) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, password);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Markdown Preview
document.getElementById('noteContent').addEventListener('input', function() {
    document.getElementById('markdownPreview').innerHTML = marked.parse(this.value);
});

// Drawing Canvas
let isDrawing = false;
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 200;

function toggleDrawingCanvas() {
    canvas.classList.toggle('hidden');
    if (!canvas.classList.contains('hidden')) {
        ctx.strokeStyle = '#9d4edd';
        ctx.lineWidth = 3;
    }
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

// Mood Tracking
let currentMood = '😊';
document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentMood = btn.dataset.mood;
        document.querySelectorAll('.mood-btn').forEach(b => b.style.opacity = 0.5);
        btn.style.opacity = 1;
    });
});

// Update saveNote() function to include mood and encryption
function saveNote() {
    const title = document.getElementById('noteTitle').value;
    let content = document.getElementById('noteContent').value;
    
    // Include canvas drawing
    const canvasData = canvas.toDataURL();
    content += `\n\n![Drawing](${canvasData})`;
    
    // Encrypt content
    const encryptedContent = encryptText(content, 'affanpower');
    
    const note = {
        id: Date.now(),
        title,
        content: encryptedContent,
        mood: currentMood,
        canvas: canvasData,
        date: new Date().toLocaleString(),
        font: document.getElementById('fontSelector').value
    };
    
    // Rest of save logic...
}

// Update openNote() to handle decryption
function openNote(id) {
    // Password check...
    const note = notes.find(note => note.id === id);
    const decryptedContent = decryptText(note.content, 'affanpower');
    // Populate fields...
}

// Particles.js initialization
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#9d4edd' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        }
    }
});
// Theme switching
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.body.setAttribute('data-theme', btn.dataset.theme);
    });
});