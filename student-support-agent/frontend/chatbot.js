
const CHAT_API_URL = "/api/chat";
const SESSION_ID =
    sessionStorage.getItem("mitaliSessionId") || crypto.randomUUID();

sessionStorage.setItem("mitaliSessionId", SESSION_ID);

const STUDENT_STORAGE_KEY = "mitaliStudent";

function getSavedMitaliStudent() {
    try {
        const savedStudent = sessionStorage.getItem(STUDENT_STORAGE_KEY);
        return savedStudent ? JSON.parse(savedStudent) : null;
    } catch {
        sessionStorage.removeItem(STUDENT_STORAGE_KEY);
        return null;
    }
}

function renderMitaliGreeting(text) {
    const conversation = document.getElementById("mitaliConversation");
    if (!conversation) return;

    conversation.replaceChildren();

    const row = document.createElement("div");
    row.className = "mitali-message-row assistant";

    const avatar = document.createElement("img");
    avatar.src = "/mitali_avatar.png";
    avatar.alt = "Mitali";
    avatar.className = "mitali-message-avatar";

    avatar.onerror = function () {
        this.style.display = "none";
    };

    row.appendChild(avatar);

    const message = document.createElement("div");
    message.className = "mitali-message assistant";
    message.textContent = text;

    row.appendChild(message);
    conversation.appendChild(row);
    conversation.scrollTop = conversation.scrollHeight;
}

function removeQuickReplies() {
    const suggestions = document.getElementById("chatSuggestions");
    if (suggestions) {
        suggestions.hidden = true;
        suggestions.replaceChildren();
    }

    const conversation = document.getElementById("mitaliConversation");
    if (conversation) {
        conversation.querySelectorAll(".mitali-options").forEach(element => {
            element.remove();
        });
    }
}

function restoreQuickReplies() {
    const suggestions = document.getElementById("chatSuggestions");
    if (suggestions) {
        suggestions.hidden = false;
    }
}

window.setMitaliStudent = function (student) {
    if (!student || !student.first_name) return;

    sessionStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(student));

    removeQuickReplies();

    renderMitaliGreeting(
        `Hi, ${student.first_name}. I'm Mitali. I can help you with your own student records, fee assessments, payments, and outstanding balance. What would you like to know?`
    );
};

window.resetMitaliStudent = function () {
    sessionStorage.removeItem(STUDENT_STORAGE_KEY);

    restoreQuickReplies();

    renderMitaliGreeting(
        "Hi! I'm Mitali. I can help you understand University Courses, explore Fee Structure, and find information about other University services such as Scholarships, Campus Life, Faculties, and more. What would you like help with today?"
    );
};

async function loadMitali() {
    const mount = document.getElementById("mitali-chatbot-mount");
    if (!mount) return;

    try {
        const response = await fetch("/chatbot.html");

        if (!response.ok) {
            throw new Error("Unable to load Mitali's interface.");
        }

        mount.innerHTML = await response.text();

        initializeMitali();

        const savedStudent = getSavedMitaliStudent();

        if (savedStudent && savedStudent.first_name) {
            window.setMitaliStudent(savedStudent);
        } else {
            window.resetMitaliStudent();
        }
    } catch (error) {
        console.error("Mitali loading error:", error);
        mount.textContent = "Mitali's chat interface could not be loaded.";
    }
}

function initializeMitali() {
    const launcher = document.getElementById("mitaliLauncher");
    const panel = document.getElementById("mitaliPanel");
    const closeButton = document.getElementById("mitaliClose");
    const form = document.getElementById("chatForm");
    const input = document.getElementById("chatInput");
    const sendButton = document.getElementById("chatSend");
    const conversation = document.getElementById("mitaliConversation");
    const suggestions = document.getElementById("chatSuggestions");

    if (!launcher || !panel || !form || !input || !sendButton || !conversation) {
        console.error("Mitali: required HTML elements are missing.");
        return;
    }

    const isStudentLoggedIn = () => {
        const student = getSavedMitaliStudent();
        return Boolean(student && student.first_name);
    };

    function openChat() {
        panel.hidden = false;
        launcher.setAttribute("aria-expanded", "true");
        launcher.setAttribute("aria-label", "Close chat with Mitali");
    }

    function closeChat() {
        panel.hidden = true;
        launcher.setAttribute("aria-expanded", "false");
        launcher.setAttribute("aria-label", "Open chat with Mitali");
    }

    launcher.addEventListener("click", () => {
        panel.hidden ? openChat() : closeChat();
    });

    closeButton?.addEventListener("click", closeChat);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !panel.hidden) {
            closeChat();
        }
    });

    function addMessage(text, type) {
        const row = document.createElement("div");
        row.classList.add("mitali-message-row", type);

        if (type === "assistant" || type === "error") {
            const avatar = document.createElement("img");
            avatar.src = "/mitali_avatar.png";
            avatar.alt = "Mitali";
            avatar.classList.add("mitali-message-avatar");

            avatar.onerror = function () {
                this.style.display = "none";
            };

            row.appendChild(avatar);
        }

        const message = document.createElement("div");
        message.classList.add("mitali-message", type);
        message.textContent = text;

        row.appendChild(message);
        conversation.appendChild(row);
        conversation.scrollTop = conversation.scrollHeight;

        return message;
    }

    function addOptions(options) {
        // Never display backend quick replies to a logged-in student.
        if (isStudentLoggedIn()) return;

        if (!Array.isArray(options) || !options.length) return;

        const container = document.createElement("div");
        container.className = "mitali-options";

        options.forEach(option => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "mitali-option-button";
            button.textContent = option.label;

            button.addEventListener("click", () => {
                container.remove();
                sendMessage(String(option.value), String(option.label));
            });

            container.appendChild(button);
        });

        conversation.appendChild(container);
        conversation.scrollTop = conversation.scrollHeight;
    }

    async function sendMessage(text, displayText = text) {
        const messageText = text.trim();

        if (!messageText || sendButton.disabled) return;

        openChat();
        addMessage(displayText, "user");

        input.value = "";
        input.style.height = "auto";
        sendButton.disabled = true;
        input.disabled = true;

        const waitingMessage = addMessage("...", "assistant");

        try {
            const response = await fetch(CHAT_API_URL, {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: messageText,
                    session_id: SESSION_ID
                })
            });

            let data;

            try {
                data = await response.json();
            } catch {
                throw new Error("The chat service returned an invalid response.");
            }

            if (!response.ok) {
                throw new Error(
                    data.detail || "Chat service is unavailable."
                );
            }

            waitingMessage.textContent =
                data.reply || "No response available.";

            // Logged-in students never receive quick-reply buttons.
            if (!isStudentLoggedIn()) {
                addOptions(data.options);
            }
        } catch (error) {
            waitingMessage.className = "mitali-message error";
            waitingMessage.textContent =
                error.message || "Chat service unavailable. Please try again.";

            console.error("Mitali chat error:", error);
        } finally {
            sendButton.disabled = false;
            input.disabled = false;
            input.focus();
            conversation.scrollTop = conversation.scrollHeight;
        }
    }

    form.addEventListener("submit", event => {
        event.preventDefault();
        sendMessage(input.value);
    });

    input.addEventListener("keydown", event => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            form.requestSubmit();
        }
    });

    input.addEventListener("input", () => {
        input.style.height = "auto";
        input.style.height =
            Math.min(input.scrollHeight, 110) + "px";
    });

    suggestions?.addEventListener("click", event => {
        if (isStudentLoggedIn()) return;

        const button = event.target.closest("[data-chat-prompt]");

        if (button) {
            sendMessage(button.dataset.chatPrompt);
        }
    });

    // Apply the correct visibility after the chat interface loads.
    if (isStudentLoggedIn()) {
        removeQuickReplies();
    } else {
        restoreQuickReplies();
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadMitali);
} else {
    loadMitali();
}
