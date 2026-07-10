const connectLinks = [
{
    title: "WhatsApp Community",
    subtitle: "Become a member",
    icon: "fas fa-users",
    color: "#25D366",
    url: "https://chat.whatsapp.com/LP2IyduZQjyHrKPNE7tuOG?s=cl&p=a&ilr=4&amv=2"
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
    } else if (hash === "#events" || hash.startsWith("#event-")) {
        // Show events page
        if (pages.home) pages.home.style.display = "none";
        if (pages.contactUs) pages.contactUs.style.display = "none";
        if (pages.events) pages.events.style.display = "block";
        setActiveNavLink("events");
        
        if (hash.startsWith("#event-")) {
            const targetEl = document.getElementById(hash.substring(1));
            if (targetEl) {
                // Expand the card
                targetEl.classList.add("expanded");
                const toggleBtn = targetEl.querySelector(".toggle-details-btn");
                if (toggleBtn) {
                    toggleBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Hide Details';
                }
                setTimeout(() => {
                    targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 150);
            }
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
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

// =====================================================
// TOAST NOTIFICATION SYSTEM
// =====================================================
let toastContainer = null;

function showToast(message) {
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.className = "toast-container";
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
        <i class="fa-solid fa-circle-check toast-icon"></i>
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger reflow to apply transition
    toast.offsetHeight;

    toast.classList.add("show");

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove("show");
        toast.addEventListener("transitionend", () => {
            toast.remove();
        });
    }, 3000);
}

// =====================================================
// EVENT SHARE LOGIC
// =====================================================
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".share-btn");
    if (btn) {
        e.stopPropagation();
        const eventId = btn.getAttribute("data-event-id");
        const eventName = btn.getAttribute("data-event-name");
        
        // Construct event share link with hash anchor
        const shareUrl = `${window.location.origin}${window.location.pathname}#${eventId}`;
        
        if (navigator.share) {
            navigator.share({
                title: `Meet Mosaic - ${eventName}`,
                text: `Check out this amazing event by Meet Mosaic: ${eventName}!`,
                url: shareUrl
            }).catch(err => {
                console.log("Error sharing:", err);
                copyToClipboard(shareUrl);
            });
        } else {
            copyToClipboard(shareUrl);
        }
    }
});

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast("Event link copied to clipboard!");
        }).catch(err => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast("Event link copied to clipboard!");
        } else {
            showToast("Failed to copy link.");
        }
    } catch (err) {
        showToast("Failed to copy link.");
    }
    document.body.removeChild(textArea);
}