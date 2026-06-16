document.addEventListener('DOMContentLoaded', () => {
    const chatForm           = document.getElementById('chat-form');
    const userInput          = document.getElementById('user-input');
    const messagesContainer  = document.getElementById('messages-container');
    const clearBtn           = document.getElementById('clear-btn');
    const themeBtn           = document.getElementById('theme-btn');
    const sidebarToggle      = document.getElementById('sidebar-toggle');
    const sidebar            = document.querySelector('.sidebar');
    const welcomeScreen      = document.getElementById('welcome-screen');

    // ── Theme toggle ───────────────────────────────────────
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next    = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        themeBtn.innerHTML = theme === 'dark'
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    }

    // ── Sidebar toggle (mobile) ────────────────────────────
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
    messagesContainer.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    // ── Auto-resize textarea ───────────────────────────────
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = Math.min(userInput.scrollHeight, 160) + 'px';
    });

    // ── Send on Enter (Shift+Enter = newline) ──────────────
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });

    // ── Append message ─────────────────────────────────────
    function appendMessage(text, className) {
        hideWelcome();

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);

        if (className === 'bot-message') {
            const avatar = document.createElement('div');
            avatar.classList.add('avatar');
            avatar.innerHTML = '<i class="fas fa-robot"></i>';
            messageDiv.appendChild(avatar);
        }

        const content = document.createElement('div');
        content.classList.add('message-content');
        content.textContent = text;

        messageDiv.appendChild(content);
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
        return messageDiv;
    }

    function hideWelcome() {
        if (welcomeScreen) welcomeScreen.style.display = 'none';
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // ── Typing indicator ───────────────────────────────────
    function showTypingIndicator() {
        hideWelcome();
        const row = document.createElement('div');
        row.classList.add('message', 'bot-message');
        row.id = 'typing-row';

        const avatar = document.createElement('div');
        avatar.classList.add('avatar');
        avatar.innerHTML = '<i class="fas fa-robot"></i>';

        const indicator = document.createElement('div');
        indicator.classList.add('typing-indicator');
        indicator.id = 'typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';

        row.appendChild(avatar);
        row.appendChild(indicator);
        messagesContainer.appendChild(row);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const row = document.getElementById('typing-row');
        if (row) row.remove();
    }

    // ── Send message ───────────────────────────────────────
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const messageText = userInput.value.trim();
        if (!messageText) return;

        appendMessage(messageText, 'user-message');
        userInput.value = '';
        userInput.style.height = 'auto';

        const sendBtn = document.getElementById('send-btn');
        sendBtn.disabled = true;
        showTypingIndicator();

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: messageText })
            });

            const data = await response.json();
            removeTypingIndicator();

            if (response.ok) {
                appendMessage(data.response, 'bot-message');
            } else {
                appendMessage(data.error || 'Something went wrong.', 'system-error');
            }
        } catch (error) {
            removeTypingIndicator();
            appendMessage('Failed to connect to the server. Is the Flask app running?', 'system-error');
            console.error('Fetch error:', error);
        } finally {
            sendBtn.disabled = false;
            userInput.focus();
        }
    });

    // ── Clear chat ─────────────────────────────────────────
    clearBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/clear', { method: 'POST' });
            if (response.ok) {
                messagesContainer.innerHTML = '';
                // Restore welcome screen
                if (welcomeScreen) {
                    messagesContainer.appendChild(welcomeScreen);
                    welcomeScreen.style.display = 'flex';
                }
                sidebar.classList.remove('open');
            }
        } catch (error) {
            console.error('Error clearing history:', error);
        }
    });
});

// ── Suggestion chip helper (global) ───────────────────────
function fillInput(text) {
    const input = document.getElementById('user-input');
    input.value = text;
    input.focus();
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 160) + 'px';
}