// your code goes here
document.addEventListener('DOMContentLoaded', () => {
    
    // --- DOM Elements ---
    const chatInput = document.querySelector('.chat-footer input');
    const chatContainer = document.querySelector('.messages-container');
    const actionIcon = document.querySelector('.action-icon'); // The Mic/Send icon
    const chatHeaderName = document.querySelector('.chat-header-name');
    const chatHeaderImg = document.querySelector('.chat-area .header .user-img');
    const contacts = document.querySelectorAll('.contact');

    // --- 1. Icon Toggle Logic (Mic vs Paper Plane) ---
    chatInput.addEventListener('input', () => {
        if (chatInput.value.trim() !== "") {
            // If user types, show "Send" icon
            actionIcon.classList.remove('fa-microphone');
            actionIcon.classList.add('fa-paper-plane');
        } else {
            // If empty, show "Mic" icon
            actionIcon.classList.remove('fa-paper-plane');
            actionIcon.classList.add('fa-microphone');
        }
    });

    // --- 2. Send Message Logic ---
    
    // Allow sending by pressing "Enter"
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim() !== "") {
            sendMessage(chatInput.value);
        }
    });

    // Allow sending by clicking the icon
    actionIcon.addEventListener('click', () => {
        if (chatInput.value.trim() !== "") {
            sendMessage(chatInput.value);
        }
    });

    function sendMessage(text) {
        // Create the message HTML structure
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'sent');
        
        // Add content + current time + double tick icon
        messageDiv.innerHTML = `
            ${text}
            <span class="msg-time">${getCurrentTime()} <i class="fas fa-check-double"></i></span>
        `;

        // Append to chat container
        chatContainer.appendChild(messageDiv);

        // Reset Input & Icon
        chatInput.value = '';
        actionIcon.classList.remove('fa-paper-plane');
        actionIcon.classList.add('fa-microphone');

        // Auto-scroll to bottom
        scrollToBottom();

        // Simulate a reply from the other person
        setTimeout(() => {
            receiveMessage("Okay, got it!");
        }, 1500);
    }

    function receiveMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'received');
        
        messageDiv.innerHTML = `
            ${text}
            <span class="msg-time">${getCurrentTime()}</span>
        `;

        chatContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    // --- 3. Utilities ---

    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return hours + ':' + minutes + ' ' + ampm;
    }

    // --- 4. Sidebar Interaction (Switching Chats) ---
    
    contacts.forEach(contact => {
        contact.addEventListener('click', () => {
            // Remove 'active' class from all contacts
            contacts.forEach(c => c.classList.remove('active'));
            
            // Add 'active' class to clicked contact
            contact.classList.add('active');

            // Update Chat Header Info
            const name = contact.querySelector('.contact-name').innerText;
            const imgParams = contact.querySelector('.user-img').src;

            chatHeaderName.innerText = name;
            chatHeaderImg.src = imgParams;

            // Optional: You could clear the chat messages here if you wanted a fresh screen
            // chatContainer.innerHTML = ''; 
        });
    });

});