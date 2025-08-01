function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = 30;
    container.innerHTML = ''; // Clear previous stars if any

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.innerHTML = '✦';
        star.style.color = ['#ff6b9b', '#ff94b6', '#ff4d88'][Math.floor(Math.random() * 3)];
        star.style.fontSize = `${Math.random() * 10 + 10}px`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.position = 'absolute';
        star.style.animationDelay = `${Math.random() * 4}s`;
        container.appendChild(star);
    }
}

// Button effects
document.getElementById('loveBtn').addEventListener('click', function() {
    createHearts();
    showToast('Love u sengg');
});

document.getElementById('surpriseBtn').addEventListener('click', function() {
    confettiEffect();
    showToast("hehehe love u lagi sengg");
});

function createHearts() {
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('heart', 'absolute');
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.top = `${Math.random() * 80 + 10}vh`;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heart.style.opacity = 0;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = 1000;

        document.body.appendChild(heart);

        // Animate in and out
        animateHeart(heart);
    }
}

function animateHeart(heart) {
    const duration = Math.random() * 3 + 2;

    if (typeof anime === 'undefined') {
        // Fallback: simple fade in/out
        heart.style.opacity = 1;
        setTimeout(() => {
            heart.style.opacity = 0;
            setTimeout(() => heart.remove(), duration * 500);
        }, duration * 500);
        return;
    }

    // Animate in
    anime({
        targets: heart,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: duration * 1000 / 2,
        easing: 'easeOutQuad'
    });

    // Animate out
    setTimeout(() => {
        anime({
            targets: heart,
            opacity: [1, 0],
            translateY: [0, -50],
            duration: duration * 1000 / 2,
            easing: 'easeInQuad',
            complete: () => heart.remove()
        });
    }, duration * 1000 / 2);
}

function confettiEffect() {
    const colors = ['#ff6b9b', '#ff94b6', '#ff4d88', '#ffffff'];

    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.position = 'fixed';
        confetti.style.top = '0';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.zIndex = '1000';
        confetti.style.transformOrigin = 'center';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';

        document.body.appendChild(confetti);

        if (typeof anime === 'undefined') {
            // Fallback: simple drop
            confetti.style.transition = 'all 2s linear';
            setTimeout(() => {
                confetti.style.top = `${window.innerHeight + 100}px`;
                confetti.style.opacity = 0;
                setTimeout(() => confetti.remove(), 2000);
            }, 10);
            continue;
        }

        anime({
            targets: confetti,
            translateY: [`-${Math.random() * 20 + 10}px`, `${window.innerHeight + 100}px`],
            translateX: [`${(Math.random() - 0.5) * 100}px`],
            rotate: Math.random() * 360,
            opacity: [1, 0],
            duration: Math.random() * 2000 + 2000,
            easing: 'easeInQuad',
            complete: () => confetti.remove()
        });
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(255, 107, 155, 0.9)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '20px';
    toast.style.zIndex = '1000';
    toast.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    toast.style.fontFamily = 'inherit';

    document.body.appendChild(toast);

    setTimeout(() => {
        if (typeof anime === 'undefined') {
            toast.style.transition = 'opacity 0.5s';
            toast.style.opacity = 0;
            setTimeout(() => toast.remove(), 500);
            return;
        }
        anime({
            targets: toast,
            opacity: 0,
            duration: 500,
            easing: 'easeOutQuad',
            complete: () => toast.remove()
        });
    }, 2000);
}

// Memory card creator
document.getElementById('generateMemoryBtn').addEventListener('click', function() {
    const canvas = document.getElementById('memoryCard');
    const ctx = canvas.getContext('2d');
    let message = document.getElementById('messageInput').value.trim();
    if (!message) message = 'Happy Girlfriend Day!';

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ff6b9b');
    gradient.addColorStop(1, '#ff94b6');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    ctx.font = 'bold 18px "Comic Neue", Comic Sans MS, cursive, sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';

    // Wrap text
    const lines = wrapText(ctx, message, canvas.width - 40);

    // Draw each line
    let yPos = 120 - ((lines.length - 1) * 12); // Center vertically
    lines.forEach(line => {
        ctx.fillText(line, canvas.width / 2, yPos);
        yPos += 25;
    });

    // Add decoration
    ctx.font = '30px serif';
    ctx.fillText('❤️', 30, 60);
    ctx.fillText('❤️', canvas.width - 50, canvas.height - 30);

    // Add border
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    showToast('Memory card created!');
});

function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine + ' ' + word;
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }

    lines.push(currentLine);
    return lines;
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    createStars();

    // Set up memory card default
    const canvas = document.getElementById('memoryCard');
    const ctx = canvas.getContext('2d');
    ctx.font = 'bold 18px "Comic Neue", Comic Sans MS, cursive, sans-serif';
    ctx.fillStyle = '#ff6b9b';
    ctx.textAlign = 'center';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText('Create your memory!', canvas.width / 2, canvas.height / 2);
});