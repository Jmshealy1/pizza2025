export const handleContactFormSubmit = async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const messageBox = document.getElementById("form-message");
  
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      if (response.ok) {
        messageBox.textContent = "Message sent successfully!";
        messageBox.className = "form-feedback success";
        form.reset();
      } else {
        throw new Error("Form submission failed.");
      }
    } catch (error) {
      messageBox.textContent = "An error occurred. Please try again.";
      messageBox.className = "form-feedback error";
    }
  };
  