const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve HTML file and static files
app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle form submission and send confirmation email
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Validate form data
    if (!name || !email || !message) {
      throw new Error("Invalid form data");
    }

    // Create a Nodemailer transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "enter your emial", // Your Gmail email address
        pass: "enter your password here", // Your Gmail password or an app-specific password
      },
    });

    // Add event listener for 'login' event
    transporter.on("login", (auth) => {
      console.log("Login successful:", auth);
    });

    // Add event listener for 'error' event
    transporter.on("error", (error) => {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Error during login" });
    });

    // Check if email is provided
    if (!email) {
      console.error("No email address provided");
      return res.status(400).json({ message: "No email address provided" });
    }

    // Email content
    let mailOptions = {
      from: "emial here", //enter emial here too
      to: email,
      subject: "Confirmation Email",
      text: `Hello ${name},\n\nThank you for your message. We have received your inquiry and will get back to you soon.\n\nBest regards,\nThe Team`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    // Send a success response
    res.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error:", error);

    // Send an error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
