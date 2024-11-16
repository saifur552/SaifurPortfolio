// Smooth Scroll 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Fade-in on Scroll with Intersection Observer
const sections = document.querySelectorAll("section, .project-tile"); // Includes sections and project tiles
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.classList.add("animate__animated", "animate__fadeInUp");
            observer.unobserve(entry.target); // Stop observing once animation is applied
        }
    });
}, observerOptions);

// Attach observer to each section and project tile
sections.forEach(section => {
    observer.observe(section);
});

// Skill Bar Animation
const skillBars = document.querySelectorAll(".progress-bar");
const skillObserver = new IntersectionObserver((entries, skillObserver) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute("data-skill-level");
            bar.style.width = targetWidth + "%"; // Animate skill bar width
            bar.style.transition = "width 1.5s ease-in-out";
            skillObserver.unobserve(bar); // Stop observing after animation
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Initialize EmailJS
emailjs.init("AoXaoltGNAa_QqcqR"); // Replace with your actual public key

// Function to send email
function sendEmail(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // EmailJS parameters
    const templateParams = {
        name: name,
        email: email,
        message: message,
    };

    // Use EmailJS to send the email
    emailjs.send("service_pngyvgp", "template_fx1i48x", templateParams) // Replace with your service ID and template ID
        .then((response) => {
            console.log("Email sent successfully:", response.status, response.text);
            document.getElementById("success-message").style.display = "block";
            document.getElementById("error-message").style.display = "none";
            document.getElementById("contact-form").reset(); // Reset the form
        })
        .catch((error) => {
            console.error("Failed to send email:", error);
            document.getElementById("success-message").style.display = "none";
            document.getElementById("error-message").style.display = "block";
        });
}
