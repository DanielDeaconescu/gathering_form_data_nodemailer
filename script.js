const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;

  const data = {
    "full-name": form.elements["full-name"].value,
    email: form.elements["email"].value,
    message: form.elements["message"].value,
  };

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      window.location.href = "/thank-you.html";
    }
  } catch (error) {
    console.log("Submission failed. Please try again.");
  }
});
