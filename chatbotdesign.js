// Modern Chat Widget Script - Enhanced Version with Voice & Cream Colors
(function() {
    // Enhanced styles with cream/yellow color palette
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #f59e0b);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #d97706);
            --chat--color-accent: var(--n8n-chat-accent-color, #fbbf24);
            --chat--color-background: var(--n8n-chat-background-color, #fffbeb);
            --chat--color-font: var(--n8n-chat-font-color, #451a03);
            --chat--color-light: #fef3c7;
            --chat--color-cream: #fefce8;
            --chat--border-radius: 16px;
            --chat--shadow: 0 25px 50px -12px rgba(245, 158, 11, 0.25);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .n8n-chat-widget .chat-bubble {
            position: absolute;
            bottom: 80px;
            right: 0;
            background: rgba(254, 252, 232, 0.95);
            backdrop-filter: blur(10px);
            padding: 16px 20px;
            border-radius: var(--chat--border-radius);
            box-shadow: var(--chat--shadow);
            width: 250px;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            border: 1px solid rgba(251, 191, 36, 0.3);
            color: var(--chat--color-font);
            font-weight: 500;
        }
        
        .n8n-chat-widget .chat-bubble.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .n8n-chat-widget .chat-bubble::after {
            content: '';
            position: absolute;
            bottom: -8px;
            right: 24px;
            width: 16px;
            height: 16px;
            background: rgba(254, 252, 232, 0.95);
            backdrop-filter: blur(10px);
            transform: rotate(45deg);
            border-right: 1px solid rgba(251, 191, 36, 0.3);
            border-bottom: 1px solid rgba(251, 191, 36, 0.3);
        }
                
        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 1000;
            display: none;
            width: 400px;
            height: 650px;
            background: rgba(254, 252, 232, 0.95);
            backdrop-filter: blur(20px);
            border-radius: var(--chat--border-radius);
            box-shadow: var(--chat--shadow);
            border: 1px solid rgba(251, 191, 36, 0.3);
            overflow: hidden;
            font-family: inherit;
            transform: scale(0.95) translateY(20px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 24px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
            transform: scale(1) translateY(0);
            opacity: 1;
        }

        .n8n-chat-widget .brand-header {
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            position: relative;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            cursor: pointer;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 18px;
            border-radius: 50%;
            width: 36px;
            height: 36px;
        }

        .n8n-chat-widget .close-button:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-50%) scale(1.1);
        }

        .n8n-chat-widget .brand-header img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 600;
            color: white;
        }

        .n8n-chat-widget .new-conversation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 40px 20px;
            text-align: center;
            width: 100%;
            max-width: 320px;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 28px;
            font-weight: 700;
            color: var(--chat--color-font);
            margin-bottom: 16px;
            line-height: 1.3;
        }

        .n8n-chat-widget .welcome-subtitle {
            font-size: 16px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin-bottom: 32px;
            line-height: 1.5;
        }

        .n8n-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            width: 100%;
            padding: 18px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 600;
            font-family: inherit;
            margin-bottom: 16px;
            box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(245, 158, 11, 0.4);
        }

        .n8n-chat-widget .message-icon {
            width: 22px;
            height: 22px;
        }

        .n8n-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.6;
            margin: 0;
            font-weight: 500;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
            background: transparent;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 6px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: rgba(245, 158, 11, 0.3);
            border-radius: 3px;
        }

        .n8n-chat-widget .chat-message {
            padding: 16px 20px;
            border-radius: 18px;
            max-width: 85%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.6;
            font-weight: 500;
            animation: messageSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes messageSlideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
            border-bottom-right-radius: 6px;
        }

        .n8n-chat-widget .chat-message.bot {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(245, 158, 11, 0.2);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.1);
            border-bottom-left-radius: 6px;
        }
        
        .n8n-chat-widget .chat-message.typing {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(245, 158, 11, 0.2);
            align-self: flex-start;
            color: var(--chat--color-font);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .n8n-chat-widget .typing-dots {
            display: flex;
            gap: 4px;
        }
        
        .n8n-chat-widget .typing-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--chat--color-primary);
            animation: typingDot 1.4s infinite ease-in-out;
        }
        
        .n8n-chat-widget .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .n8n-chat-widget .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes typingDot {
            0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }

        .n8n-chat-widget .chat-input {
            padding: 20px;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(245, 158, 11, 0.2);
            display: flex;
            gap: 12px;
            align-items: flex-end;
        }

        .n8n-chat-widget .input-container {
            flex: 1;
            position: relative;
        }

        .n8n-chat-widget .chat-input textarea {
            width: 100%;
            padding: 16px 50px 16px 16px;
            border: 1px solid rgba(245, 158, 11, 0.3);
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.95);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
            font-weight: 500;
            transition: all 0.3s ease;
            max-height: 120px;
            min-height: 48px;
            box-sizing: border-box;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            outline: none;
            border-color: var(--chat--color-primary);
            box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.5;
        }

        .n8n-chat-widget .voice-button {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-primary);
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .voice-button:hover {
            background: rgba(245, 158, 11, 0.1);
            transform: translateY(-50%) scale(1.1);
        }

        .n8n-chat-widget .voice-button.recording {
            color: #dc2626;
            background: rgba(220, 38, 38, 0.1);
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(220, 38, 38, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
            }
        }

        .n8n-chat-widget .voice-button svg {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .chat-input button[type="submit"] {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 0 24px;
            height: 48px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: inherit;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
        }

        .n8n-chat-widget .chat-input button[type="submit"]:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
            z-index: 999;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 24px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.1) translateY(-2px);
            box-shadow: 0 12px 35px rgba(245, 158, 11, 0.5);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 28px;
            height: 28px;
            fill: currentColor;
            transition: transform 0.3s ease;
        }

        .n8n-chat-widget .chat-toggle:hover svg {
            transform: scale(1.1);
        }

        .n8n-chat-widget .chat-footer {
            padding: 12px;
            text-align: center;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(245, 158, 11, 0.2);
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
            font-weight: 500;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }

        .n8n-chat-widget .voice-status {
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(245, 158, 11, 0.9);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
            white-space: nowrap;
        }

        .n8n-chat-widget .voice-status.visible {
            opacity: 1;
            transform: translateX(-50%) translateY(-5px);
        }
        
        @media (max-width: 480px) {
            .n8n-chat-widget .chat-container {
                width: calc(100vw - 32px);
                height: calc(100vh - 32px);
                bottom: 16px;
                right: 16px;
                border-radius: 12px;
            }
            
            .n8n-chat-widget .chat-container.position-left {
                left: 16px;
            }
            
            .n8n-chat-widget .chat-toggle {
                bottom: 16px;
                right: 16px;
            }
            
            .n8n-chat-widget .chat-toggle.position-left {
                left: 16px;
            }
        }
    `;

    // Load Inter font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLink);

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Default configuration
    const defaultConfig = {
        webhook: {
            url: '',
            route: ''
        },
        branding: {
            logo: '',
            name: '',
            welcomeText: '',
            responseTimeText: '',
            poweredBy: {
                text: 'Sentinel Tech',
                link: 'https://sentinelton.com'
            }
        },
        style: {
            primaryColor: '#d4a574',
            secondaryColor: '#c19653',
            position: 'right',
            backgroundColor: '#faf8f3',
            fontColor: '#3d2914'
        }
    };

    // Merge user config with defaults
    const config = window.ChatWidgetConfig ? 
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
        } : defaultConfig;

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';
    let isRecording = false;
    let recognition = null;

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    
    // Set CSS variables for colors
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    const newConversationHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}">
            <span>${config.branding.name}</span>
            <button class="close-button">×</button>
        </div>
        <div class="new-conversation">
            <h2 class="welcome-text">Merhaba! 👋</h2>
            <p class="welcome-subtitle">${config.branding.welcomeText}</p>
            <button class="new-chat-btn">
                <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                </svg>
                Konuşmaya Başla
            </button>
            <p class="response-text">${config.branding.responseTimeText}</p>
        </div>
    `;

    const chatInterfaceHTML = `
        <div class="chat-interface">
            <div class="brand-header">
                <img src="${config.branding.logo}" alt="${config.branding.name}">
                <span>${config.branding.name}</span>
                <button class="close-button">×</button>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input">
                <div class="input-container">
                    <textarea placeholder="Mesajınızı yazın..." rows="1"></textarea>
                    <button type="button" class="voice-button" title="Sesli mesaj">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                            <path fill="currentColor" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                        </svg>
                    </button>
                    <div class="voice-status">Dinleniyor...</div>
                </div>
                <button type="submit">Gönder</button>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy?.link || 'https://sentinelton.com'}" target="_blank">
                    Powered by ${config.branding.poweredBy?.text || 'Sentinel Tech'}
                </a>
            </div>
        </div>
    `;

    chatContainer.innerHTML = newConversationHTML;

    const chatToggle = document.createElement('button');
    chatToggle.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    chatToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
        </svg>
    `;

    const chatBubble = document.createElement('div');
    chatBubble.className = 'chat-bubble';
    chatBubble.textContent = config.branding.welcomeText || 'Merhaba! Size nasıl yardımcı olabilirim?';

    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(chatToggle);
    widgetContainer.appendChild(chatBubble);
    document.body.appendChild(widgetContainer);

    // Show welcome bubble after a delay
    setTimeout(() => {
        chatBubble.classList.add('visible');
    }, 2000);

    // Hide bubble after some time
    setTimeout(() => {
        chatBubble.classList.remove('visible');
    }, 8000);

    // Initialize speech recognition
    function initSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'tr-TR';

            recognition.onstart = function() {
                isRecording = true;
                const voiceButton = chatContainer.querySelector('.voice-button');
                const voiceStatus = chatContainer.querySelector('.voice-status');
                if (voiceButton) voiceButton.classList.add('recording');
                if (voiceStatus) voiceStatus.classList.add('visible');
            };

            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                const textarea = chatContainer.querySelector('textarea');
                if (textarea) {
                    textarea.value = transcript;
                    autoResizeTextarea(textarea);
                }
            };

            recognition.onend = function() {
                isRecording = false;
                const voiceButton = chatContainer.querySelector('.voice-button');
                const voiceStatus = chatContainer.querySelector('.voice-status');
                if (voiceButton) voiceButton.classList.remove('recording');
                if (voiceStatus) voiceStatus.classList.remove('visible');
            };

            recognition.onerror = function(event) {
                console.error('Speech recognition error:', event.error);
                isRecording = false;
                const voiceButton = chatContainer.querySelector('.voice-button');
                const voiceStatus = chatContainer.querySelector('.voice-status');
                if (voiceButton) voiceButton.classList.remove('recording');
                if (voiceStatus) voiceStatus.classList.remove('visible');
            };
        }
    }

    // Auto-resize textarea
    function autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    // Generate session ID
    function generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    // Start new conversation
    function startNewConversation() {
        currentSessionId = generateSessionId();
        chatContainer.innerHTML = chatInterfaceHTML;
        
        const textarea = chatContainer.querySelector('textarea');
        const submitButton = chatContainer.querySelector('button[type="submit"]');
        const voiceButton = chatContainer.querySelector('.voice-button');
        const closeButton = chatContainer.querySelector('.close-button');

        // Auto-resize textarea
        if (textarea) {
            textarea.addEventListener('input', function() {
                autoResizeTextarea(this);
            });

            textarea.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }

        // Voice button functionality
        if (voiceButton && recognition) {
            voiceButton.addEventListener('click', function() {
                if (isRecording) {
                    recognition.stop();
                } else {
                    recognition.start();
                }
            });
        }

        // Submit button
        if (submitButton) {
            submitButton.addEventListener('click', sendMessage);
        }

        // Close button
        if (closeButton) {
            closeButton.addEventListener('click', closeChat);
        }

        // Initialize speech recognition
        initSpeechRecognition();
    }

    // Send message
    function sendMessage() {
        const textarea = chatContainer.querySelector('textarea');
        const messagesContainer = chatContainer.querySelector('.chat-messages');
        
        if (!textarea || !messagesContainer) return;
        
        const message = textarea.value.trim();
        if (!message) return;

        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user';
        userMessage.textContent = message;
        messagesContainer.appendChild(userMessage);

        // Clear input
        textarea.value = '';
        autoResizeTextarea(textarea);

        // Show typing indicator
        const typingMessage = document.createElement('div');
        typingMessage.className = 'chat-message typing';
        typingMessage.innerHTML = `
            <span>Yazıyor</span>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        messagesContainer.appendChild(typingMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Send to webhook
        fetch(config.webhook.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sessionId: currentSessionId,
                chatInput: message,
                route: config.webhook.route || 'general'
            })
        })
        .then(response => response.json())
        .then(data => {
            // Remove typing indicator
            typingMessage.remove();

            // Add bot response
            const botMessage = document.createElement('div');
            botMessage.className = 'chat-message bot';
            botMessage.textContent = data.output || 'Üzgünüm, bir hata oluştu.';
            messagesContainer.appendChild(botMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        })
        .catch(error => {
            console.error('Error:', error);
            // Remove typing indicator
            typingMessage.remove();

            // Add error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'chat-message bot';
            errorMessage.textContent = 'Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin.';
            messagesContainer.appendChild(errorMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    }

    // Close chat
    function closeChat() {
        chatContainer.classList.remove('open');
        setTimeout(() => {
            chatContainer.innerHTML = newConversationHTML;
            
            // Re-attach new conversation event
            const newChatBtn = chatContainer.querySelector('.new-chat-btn');
            const closeButton = chatContainer.querySelector('.close-button');
            
            if (newChatBtn) {
                newChatBtn.addEventListener('click', startNewConversation);
            }
            
            if (closeButton) {
                closeButton.addEventListener('click', closeChat);
            }
        }, 400);
    }

    // Toggle chat
    function toggleChat() {
        if (chatContainer.classList.contains('open')) {
            closeChat();
        } else {
            chatContainer.classList.add('open');
            chatBubble.classList.remove('visible');
        }
    }

    // Event listeners
    chatToggle.addEventListener('click', toggleChat);

    // Initial event listeners
    const newChatBtn = chatContainer.querySelector('.new-chat-btn');
    const closeButton = chatContainer.querySelector('.close-button');
    
    if (newChatBtn) {
        newChatBtn.addEventListener('click', startNewConversation);
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', closeChat);
    }

    // Click outside to close
    document.addEventListener('click', function(e) {
        if (!widgetContainer.contains(e.target) && chatContainer.classList.contains('open')) {
            closeChat();
        }
    });

})();
