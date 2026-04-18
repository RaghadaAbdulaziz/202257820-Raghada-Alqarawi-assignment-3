// =========================
// DOM ELEMENTS
// =========================
const html = document.documentElement;

const greeting = document.getElementById("greeting");
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.querySelector(".theme-icon");

const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("projectSearch");
const sortProjects = document.getElementById("sortProjects");
const projectCardsContainer = document.getElementById("projectCards");
const noProjectsMessage = document.getElementById("noProjectsMessage");

const detailButtons = document.querySelectorAll(".details-btn");
const projectModal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalType = document.getElementById("modalType");
const modalTools = document.getElementById("modalTools");
const modalFeatures = document.getElementById("modalFeatures");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const visitorNameInput = document.getElementById("visitorName");
const saveVisitorBtn = document.getElementById("saveVisitorBtn");
const visitorNameError = document.getElementById("visitorNameError");
const saveMessage = document.getElementById("saveMessage");
const welcomeMessage = document.getElementById("welcomeMessage");

const sessionTimer = document.getElementById("sessionTimer");

const adviceText = document.getElementById("adviceText");
const adviceIdTag = document.getElementById("adviceIdTag");
const adviceError = document.getElementById("adviceError");
const loadAdviceBtn = document.getElementById("loadAdviceBtn");

// =========================
// APP STATE
// =========================
const state = {
    filter: localStorage.getItem("selectedFilter") || "all",
    search: "",
    sort: localStorage.getItem("selectedSort") || "default",
    visitorName: localStorage.getItem("visitorName") || "",
    theme: localStorage.getItem("theme") || "light",
    sessionSeconds: 0
};

// =========================
// GREETING
// =========================
function updateGreeting() {
    if (!greeting) return;

    const hour = new Date().getHours();
    let message = "Welcome";

    if (hour < 12) {
        message = "Good morning";
    } else if (hour < 18) {
        message = "Good afternoon";
    } else {
        message = "Good evening";
    }

    greeting.textContent = `${message} — thanks for visiting my portfolio.`;
}

// =========================
// THEME
// =========================
function applyTheme(theme) {
    html.setAttribute("data-theme", theme);

    if (themeIcon) {
        themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }

    localStorage.setItem("theme", theme);
    state.theme = theme;
}

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        const newTheme = state.theme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
    });
}

// =========================
// VISITOR NAME
// =========================
function updateWelcomeMessage() {
    if (!welcomeMessage) return;

    if (state.visitorName.trim()) {
        welcomeMessage.textContent = `Welcome back, ${state.visitorName}.`;
    } else {
        welcomeMessage.textContent = "Welcome to my portfolio.";
    }
}

function saveVisitorName() {
    if (!visitorNameInput || !visitorNameError || !saveMessage) return;

    const value = visitorNameInput.value.trim();

    visitorNameError.textContent = "";
    saveMessage.className = "form-feedback";
    saveMessage.textContent = "";

    if (value.length < 2) {
        visitorNameError.textContent = "Please enter at least 2 characters.";
        return;
    }

    state.visitorName = value;
    localStorage.setItem("visitorName", value);

    updateWelcomeMessage();

    saveMessage.textContent = "Name saved successfully!";
    saveMessage.classList.add("success");

    setTimeout(() => {
        saveMessage.textContent = "";
        saveMessage.className = "form-feedback";
    }, 3000);
}

if (saveVisitorBtn) {
    saveVisitorBtn.addEventListener("click", saveVisitorName);
}

// =========================
// TIMER
// =========================
function startSessionTimer() {
    if (!sessionTimer) return;

    setInterval(() => {
        state.sessionSeconds += 1;
        sessionTimer.textContent = `Time on site: ${state.sessionSeconds}s`;
    }, 1000);
}

// =========================
// PROJECT FILTER + SEARCH + SORT
// =========================
function getCards() {
    if (!projectCardsContainer) return [];
    return Array.from(projectCardsContainer.querySelectorAll(".card"));
}

function sortCards(cards) {
    const copied = [...cards];

    if (state.sort === "az") {
        copied.sort((a, b) => a.dataset.title.localeCompare(b.dataset.title));
    } else if (state.sort === "za") {
        copied.sort((a, b) => b.dataset.title.localeCompare(a.dataset.title));
    }

    return copied;
}

function updateProjects() {
    if (!projectCardsContainer) return;

    const cards = getCards();
    const searchValue = state.search.toLowerCase().trim();
    let visibleCount = 0;

    const sortedCards = sortCards(cards);

    sortedCards.forEach(card => projectCardsContainer.appendChild(card));

    sortedCards.forEach(card => {
        const category = card.dataset.category;
        const title = card.dataset.title.toLowerCase();

        const matchesFilter = state.filter === "all" || category === state.filter;
        const matchesSearch = title.includes(searchValue);

        if (matchesFilter && matchesSearch) {
            card.classList.remove("hidden");
            visibleCount += 1;
        } else {
            card.classList.add("hidden");
        }
    });

    if (noProjectsMessage) {
        noProjectsMessage.style.display = visibleCount === 0 ? "block" : "none";
    }
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        state.filter = button.dataset.filter;
        localStorage.setItem("selectedFilter", state.filter);
        updateProjects();
    });
});

if (searchInput) {
    searchInput.addEventListener("input", (event) => {
        state.search = event.target.value;
        updateProjects();
    });
}

if (sortProjects) {
    sortProjects.addEventListener("change", (event) => {
        state.sort = event.target.value;
        localStorage.setItem("selectedSort", state.sort);
        updateProjects();
    });
}

// =========================
// MODAL
// =========================
function openModal(button) {
    if (!projectModal) return;

    modalTitle.textContent = button.dataset.title;
    modalDescription.textContent = button.dataset.description;
    modalType.textContent = button.dataset.type;
    modalTools.textContent = button.dataset.tools;
    modalFeatures.textContent = button.dataset.features;

    projectModal.classList.add("show");
}

detailButtons.forEach(button => {
    button.addEventListener("click", () => openModal(button));
});

if (closeModal) {
    closeModal.addEventListener("click", () => {
        projectModal.classList.remove("show");
    });
}

window.addEventListener("click", (event) => {
    if (event.target === projectModal) {
        projectModal.classList.remove("show");
    }
});

// =========================
// DEVELOPER ADVICE API
// =========================
async function loadDeveloperAdvice() {
    if (!adviceText || !adviceIdTag || !adviceError) return;

    adviceError.className = "form-feedback";
    adviceError.textContent = "";
    adviceText.textContent = "Loading advice...";
    adviceIdTag.textContent = "Advice API";

    try {
        const response = await fetch("https://api.adviceslip.com/advice");

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();

        adviceText.textContent = `"${data.slip.advice}"`;
        adviceIdTag.textContent = `Advice #${data.slip.id || data.slip.slip_id || "Live"}`;
    } catch (error) {
        adviceText.textContent = "Developer advice is unavailable right now.";
        adviceIdTag.textContent = "Please try again";
        adviceError.textContent = "Unable to load advice at the moment.";
        adviceError.classList.add("error");
    }
}

if (loadAdviceBtn) {
    loadAdviceBtn.addEventListener("click", loadDeveloperAdvice);
}

// =========================
// FORM VALIDATION
// =========================
function setFieldError(input, errorElement, message) {
    input.classList.add("input-error");
    errorElement.textContent = message;
}

function clearFieldError(input, errorElement) {
    input.classList.remove("input-error");
    errorElement.textContent = "";
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validateForm() {
    let isValid = true;

    clearFieldError(nameInput, nameError);
    clearFieldError(emailInput, emailError);
    clearFieldError(messageInput, messageError);

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    if (nameValue.length < 3) {
        setFieldError(nameInput, nameError, "Name must be at least 3 characters.");
        isValid = false;
    }

    if (!isValidEmail(emailValue)) {
        setFieldError(emailInput, emailError, "Please enter a valid email address.");
        isValid = false;
    }

    if (messageValue.length < 10) {
        setFieldError(messageInput, messageError, "Message must be at least 10 characters.");
        isValid = false;
    }

    return isValid;
}

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        formMessage.className = "form-feedback";
        formMessage.textContent = "";

        if (!validateForm()) {
            formMessage.textContent = "Please fix the highlighted fields before submitting.";
            formMessage.classList.add("error");
            return;
        }

        formMessage.textContent = "Message sent successfully. Thank you for reaching out!";
        formMessage.classList.add("success");
        contactForm.reset();
    });
}

// =========================
// REVEAL / SECTION VISIBILITY
// =========================
function showAllSections() {
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}

// =========================
// NAV ACTIVE STATE
// =========================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// =========================
// INITIALIZE
// =========================
function initializeSavedState() {
    applyTheme(state.theme);
    updateGreeting();

    if (visitorNameInput) {
        visitorNameInput.value = state.visitorName;
    }

    updateWelcomeMessage();

    if (sortProjects) {
        sortProjects.value = state.sort;
    }

    const savedFilterButton = document.querySelector(`.filter-btn[data-filter="${state.filter}"]`);
    if (savedFilterButton) {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        savedFilterButton.classList.add("active");
    }

    updateProjects();
    startSessionTimer();
    loadDeveloperAdvice();
    showAllSections();
}

initializeSavedState();