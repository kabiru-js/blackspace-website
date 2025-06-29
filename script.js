// --- NEW: Firebase Configuration ---

// TODO: PASTE YOUR FIREBASE CONFIG OBJECT HERE
// This object is given to you when you create a web app in the Firebase console.
const firebaseConfig = {
  apiKey: "AIzaSyBPZwbmVnVrmeuiQ52FdT0fgnaAGnc41oE",
  authDomain: "blackspace-app.firebaseapp.com",
  projectId: "blackspace-app",
  storageBucket: "blackspace-app.firebasestorage.app",
  messagingSenderId: "108141441204",
  appId: "1:108141441204:web:361b6a10ab3978a91da7e1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Your existing code from script.js goes below this line...
// ... (Smooth scrolling, mobile menu, etc.) ...

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const navRight = document.querySelector(".nav-right")

if (mobileMenuBtn && navRight) {
  mobileMenuBtn.addEventListener("click", function () {
    navRight.classList.toggle("mobile-menu-open")
    this.classList.toggle("active")
  })
}

// Add mobile menu styles dynamically
const style = document.createElement("style")
style.textContent = `
    @media (max-width: 768px) {
        .nav-right.mobile-menu-open {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(12px);
            flex-direction: column;
            padding: 2rem;
            gap: 1rem;
            border-top: 1px solid rgba(55, 65, 81, 0.5);
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`
document.head.appendChild(style)

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running"
    }
  })
}, observerOptions)

// Observe all animated elements
document.querySelectorAll('[class*="fade"], [class*="float"], [class*="bounce"]').forEach((el) => {
  el.style.animationPlayState = "paused"
  observer.observe(el)
})

// Add hover effects for buttons
document.querySelectorAll("button, .nav-link").forEach((element) => {
  element.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)"
  })

  element.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)"
  })
})

// Parallax effect for background orbs
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const orbs = document.querySelectorAll(".bg-orb")

  orbs.forEach((orb, index) => {
    const speed = 0.5 + index * 0.1
    orb.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Trigger animations after load
  setTimeout(() => {
    document.querySelectorAll('[class*="fade"]').forEach((el) => {
      el.style.animationPlayState = "running"
    })
  }, 100)
})

// Add click effects
document.addEventListener("click", (e) => {
  if (e.target.matches("button") || e.target.closest("button")) {
    const button = e.target.matches("button") ? e.target : e.target.closest("button")

    // Create ripple effect
    const ripple = document.createElement("span")
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `

    button.style.position = "relative"
    button.style.overflow = "hidden"
    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }
})

// Add ripple animation
const rippleStyle = document.createElement("style")
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(rippleStyle)

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--animation-duration", "0.1s")
}

console.log("🚀 Blackspace landing page loaded successfully!")
/* --- NEW: Waitlist Modal and Auth Logic --- */
console.log("🚀 Initializing Waitlist and Auth functionality...");

// --- Waitlist Modal Logic ---
const waitlistModal = document.getElementById("waitlist-modal");
const openWaitlistBtn = document.getElementById("open-waitlist-btn");
const closeWaitlistBtn = document.getElementById("close-modal-btn");
const waitlistForm = document.getElementById("waitlist-form");
const waitlistMessage = document.getElementById("waitlist-message");

if (waitlistModal && openWaitlistBtn && closeWaitlistBtn && waitlistForm) {
    // Function to open the modal
    openWaitlistBtn.addEventListener("click", () => {
        waitlistModal.classList.add("visible");
    });

    // Function to close the modal
    const closeModal = () => {
        waitlistModal.classList.remove("visible");
        // Reset form for next time
        setTimeout(() => {
            waitlistForm.style.display = 'flex';
            waitlistMessage.textContent = '';
            waitlistForm.reset();
        }, 300); // after transition ends
    };

    closeWaitlistBtn.addEventListener("click", closeModal);

    // Close modal when clicking on the overlay
    waitlistModal.addEventListener("click", (e) => {
        if (e.target === waitlistModal) {
            closeModal();
        }
    });
    
    // Handle form submission
    waitlistForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("waitlist-email").value;

        // --- TODO: Connect to your backend/service here ---
        // This is where you would send the email to your database, Mailchimp, Substack, etc.
        // For example, using fetch:
        /*
        fetch('https://your-api-endpoint.com/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            waitlistForm.style.display = 'none';
            waitlistMessage.textContent = "Thank you! You're on the list.";
            setTimeout(closeModal, 2500);
        })
        .catch((error) => {
            console.error('Error:', error);
            waitlistMessage.textContent = "Something went wrong. Please try again.";
        });
        */
        
        // Placeholder success message for demonstration:
        console.log(`Waitlist submission for: ${email}`);
        waitlistForm.style.display = 'none';
        waitlistMessage.textContent = "Thank you! You're on the list.";
        setTimeout(closeModal, 2500); // Close the modal after 2.5 seconds
    });
}

// --- REPLACEMENT: Real Google Auth Logic ---
console.log("🚀 Initializing Waitlist and Auth functionality...");

// ... (your waitlist modal logic here) ...


// --- Google Auth Logic ---
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');

const handleGoogleAuth = () => {
    auth.signInWithPopup(provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = result.credential;
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log("Successfully signed in with Google:", user.displayName);
            
            // TODO: Redirect to your main app page
            // For example: window.location.href = 'app.html';
            alert(`Welcome, ${user.displayName}! Redirecting to the app...`);

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Google Auth Error:", errorCode, errorMessage);
            alert(`Error: ${errorMessage}`);
        });
};


if(loginBtn && signupBtn) {
    // For Google, the sign-up and log-in process is the same pop-up.
    signupBtn.addEventListener('click', handleGoogleAuth);
    
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleGoogleAuth();
    });
}