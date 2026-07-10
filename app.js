const connectLinks = [
{
    title: "Instagram",
    subtitle: "Follow our latest events",
    icon: "fab fa-instagram",
    color: "#E1306C",
    url: "https://instagram.com/meetmosaic.co"
},
{
    title: "Facebook",
    subtitle: "Join our community",
    icon: "fab fa-facebook-f",
    color: "#1877F2",
    url: "https://www.facebook.com/share/19Bwx6H8pM/"
},
{
    title: "WhatsApp Chat",
    subtitle: "Chat instantly",
    icon: "fab fa-whatsapp",
    color: "#25D366",
    url: "https://wa.me/+919426961627"
},
{
    title: "WhatsApp Community",
    subtitle: "Become a member",
    icon: "fas fa-users",
    color: "#25D366",
    url: "https://chat.whatsapp.com/LP2IyduZQjyHrKPNE7tuOG?s=cl&p=a&ilr=4&amv=2"
},
{
    title: "Call Us",
    subtitle: "Available 9AM - 9PM",
    icon: "fas fa-phone",
    color: "#ff914d",
    url: "tel:+919426961627"
},
{
    title: "Email",
    subtitle: "We'll reply quickly",
    icon: "fas fa-envelope",
    color: "#00A8B2",
    url: "mailto:help.meetmosaic@gmail.com"
},
{
    title: "Review Form",
    subtitle: "Share your feedback",
    icon: "fas fa-star",
    color: "#A6229B",
    url: "https://forms.gle/JfypUQjQ9FNQYNVU7"
},
{
    title: "Volunteer Form",
    subtitle: "Become a Volunteer",
    icon: "fas fa-handshake-angle",
    color: "#00A8B2",
    url: "https://forms.gle/4AwffWCW73yZyr1PA"
}
];

const container = document.getElementById("preview-links-container");

container.innerHTML = "";

connectLinks.forEach((item)=>{

const card=document.createElement("a");

card.href=item.url;
card.target="_blank";
card.className="social-card";

card.innerHTML=`

<div class="social-icon" style="background:${item.color}">
<i class="${item.icon}"></i>
</div>

<div class="social-content">

<h3>${item.title}</h3>

<p>${item.subtitle}</p>

</div>

<div class="social-arrow">

<i class="fa-solid fa-arrow-up-right-from-square"></i>

</div>

`;

container.appendChild(card);

});

// =====================================================
// SPA HASH-BASED ROUTER & NAVIGATION
// =====================================================

const pages = {
    home: document.getElementById("page-home"),
    events: document.getElementById("page-events"),
    contactUs: document.getElementById("page-contact-us")
};

const navLinks = {
    home: document.getElementById("nav-home"),
    about: document.getElementById("nav-about"),
    events: document.getElementById("nav-events"),
    contactUs: document.getElementById("nav-contact-us")
};

const mobileNavLinks = {
    home: document.getElementById("mobile-nav-home"),
    about: document.getElementById("mobile-nav-about"),
    events: document.getElementById("mobile-nav-events"),
    contactUs: document.getElementById("mobile-nav-contact-us")
};

function setActiveNavLink(activeId) {
    // Clear all desktop active classes
    Object.values(navLinks).forEach(link => {
        if (link) link.classList.remove("active");
    });
    // Clear all mobile active classes
    Object.values(mobileNavLinks).forEach(link => {
        if (link) link.classList.remove("active");
    });

    // Set active desktop
    if (navLinks[activeId]) navLinks[activeId].classList.add("active");
    // Set active mobile
    if (mobileNavLinks[activeId]) mobileNavLinks[activeId].classList.add("active");
}

function handleRouting() {
    const hash = window.location.hash || "#home";
    
    if (hash === "#contact-us" || hash === "#connect" || hash === "#contact") {
        // Show contact page
        if (pages.home) pages.home.style.display = "none";
        if (pages.events) pages.events.style.display = "none";
        if (pages.contactUs) pages.contactUs.style.display = "block";
        setActiveNavLink("contactUs");
        
        // Scroll to specific section if hash is #connect or #contact
        if (hash === "#connect" || hash === "#contact") {
            const targetEl = document.getElementById(hash.substring(1));
            if (targetEl) {
                setTimeout(() => {
                    targetEl.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    } else if (hash === "#events") {
        // Show events page
        if (pages.home) pages.home.style.display = "none";
        if (pages.contactUs) pages.contactUs.style.display = "none";
        if (pages.events) pages.events.style.display = "block";
        setActiveNavLink("events");
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        // Show home page
        if (pages.home) pages.home.style.display = "block";
        if (pages.contactUs) pages.contactUs.style.display = "none";
        if (pages.events) pages.events.style.display = "none";
        
        if (hash === "#home") {
            setActiveNavLink("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (hash === "#about") {
            setActiveNavLink("about");
            const targetEl = document.getElementById("about");
            if (targetEl) {
                setTimeout(() => {
                    targetEl.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        } else {
            // Default fallback
            setActiveNavLink("home");
        }
    }
}

// Listen to hash change
window.addEventListener("hashchange", handleRouting);

// Initialize routing on load
window.addEventListener("DOMContentLoaded", handleRouting);
// Run right away to prevent flash of content
handleRouting();

// Mobile navigation drawer toggle
const mobileNavToggle = document.getElementById("mobile-nav-toggle");
const mobileNavOverlay = document.getElementById("mobile-nav-overlay");
const mobileNavClose = document.getElementById("mobile-nav-close");
const mobileNavItems = document.querySelectorAll(".mobile-nav-item, #mobile-nav-cta");

if (mobileNavToggle && mobileNavOverlay && mobileNavClose) {
    mobileNavToggle.addEventListener("click", () => {
        mobileNavOverlay.classList.add("open");
        document.body.style.overflow = "hidden"; // Prevent background scroll
    });

    const closeMenu = () => {
        mobileNavOverlay.classList.remove("open");
        document.body.style.overflow = "";
    };

    mobileNavClose.addEventListener("click", closeMenu);
    mobileNavOverlay.addEventListener("click", (e) => {
        if (e.target === mobileNavOverlay) {
            closeMenu();
        }
    });

    mobileNavItems.forEach(item => {
        item.addEventListener("click", closeMenu);
    });
}

// =====================================================
// FIREBASE REAL-TIME DATABASE & FORM INTEGRATIONS
// =====================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDg8x_jv6vQd1upt-ctB5S9a2x6c-Z6azM",
    authDomain: "summer-pattern-qcf5x.firebaseapp.com",
    projectId: "summer-pattern-qcf5x",
    storageBucket: "summer-pattern-qcf5x.firebasestorage.app",
    messagingSenderId: "374954115753",
    appId: "1:374954115753:web:ba8985e6654526168b1fb8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore with custom databaseId
const db = getFirestore(firebaseApp, "ai-studio-meetmosaic-bfde5964-745a-4284-87c4-833287694d7e");

// JSON Error Handler as mandated by SKILL.md
function handleFirestoreError(error, operationType, path) {
    const errInfo = {
        error: error instanceof Error ? error.message : String(error),
        authInfo: {
            userId: null,
            email: null,
            emailVerified: null,
            isAnonymous: null,
            tenantId: null,
            providerInfo: []
        },
        operationType,
        path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
}

// Test connection to Firestore on boot as required by SKILL.md
async function testFirestoreConnection() {
    try {
        const testDocRef = doc(db, 'test', 'connection');
        await getDoc(testDocRef);
        console.log("Firebase Connection Verified Successfully.");
    } catch (error) {
        if (error && error.message && error.message.includes('offline')) {
            console.error("Please check your Firebase configuration. Client appears to be offline.");
        } else {
            console.warn("Firestore connection check produced status:", error.message || error);
        }
    }
}
testFirestoreConnection();

// =====================================================
// WHATSAPP REDIRECTION LOGIC FOR EVENT TICKETS
// =====================================================
// Attach click listeners to all RSVP Book buttons to redirect to WhatsApp with prefilled details
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".rsvp-btn");
    if (btn) {
        const eventId = btn.getAttribute("data-event-id");
        const eventName = btn.getAttribute("data-event-name");
        const eventPrice = btn.getAttribute("data-event-price");
        const eventDate = btn.getAttribute("data-event-date") || "";

        // Construct elegant draft message with event details
        const draftMessage = `Hello Meet Mosaic! I want to book tickets for the upcoming event:

• Event Name: ${eventName}
• Date & Time: ${eventDate}
• Price: ${eventPrice}

Please confirm my booking and guide me with the next steps!`;

        // Redirect to WhatsApp with the encoded message
        const whatsappUrl = `https://wa.me/919426961627?text=${encodeURIComponent(draftMessage)}`;
        window.open(whatsappUrl, "_blank");
    }
});

// =====================================================
// EVENT CARD EXPAND / COLLAPSE LOGIC
// =====================================================
document.addEventListener("click", (e) => {
    // Check if the click is on an interactive element we want to ignore (like RSVP button or links)
    if (e.target.closest(".rsvp-btn") || e.target.closest("a") || (e.target.closest(".btn") && !e.target.closest(".toggle-details-btn"))) {
        return;
    }

    const card = e.target.closest(".event-card");
    if (card) {
        card.classList.toggle("expanded");
        
        // Update the toggle button text/icon inside this card
        const toggleBtn = card.querySelector(".toggle-details-btn");
        if (toggleBtn) {
            if (card.classList.contains("expanded")) {
                toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Hide Details';
            } else {
                toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Show Details';
            }
        }
    }
});