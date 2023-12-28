function submitForm() {
  // Retrieve values from the form fields
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Validate form data
  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Log the form data for debugging
  console.log("Form Data:", { name, email, message });

  // Make the fetch request
  fetch("/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }), // Convert to JSON
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      alert(data.message);
      // Optionally reset the form
      document.getElementById("contactForm").reset();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
