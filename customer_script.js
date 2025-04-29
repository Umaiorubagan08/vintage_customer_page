document.addEventListener("DOMContentLoaded", () => {
  const chatIcon = document.getElementById("chatbot-icon");
  const chatWindow = document.getElementById("chat-window");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");

  // Toggle chat window
  chatIcon.addEventListener("click", () => {
    chatWindow.classList.toggle("show");
  });

  chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents new line
      sendMessage();
    }
  });

  // Send message
  window.sendMessage = function () {
    const userText = chatInput.value.trim();
    if (userText === "") return;

    appendMessage("You", userText);
    chatInput.value = "";

    const reply = getSudhaReply(userText);
    setTimeout(() => {
      appendMessage("Sudha", reply);
      speakText(reply);
    }, 500);
  };

  // Append message
  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Sudha replies logic
  function getSudhaReply(input) {
    input = input.toLowerCase();

    if (input.includes("hello") || input.includes("hi")) {
      return "Hello! I'm Sudha. How can I assist you with your property needs today?";
    } else if (input.includes("plot") && input.includes("available")) {
      return "Yes, we have residential and commercial plots available. Would you like to know the locations?";
    } else if (input.includes("villa") && input.includes("available")) {
      return "Yes, villas are available in multiple gated communities. We also offer virtual tours.";
    } else if (input.includes("site visit")) {
      return "Sure! We can schedule a site visit. Could you please provide your preferred date and location?";
    } else if (input.includes("price") || input.includes("cost")) {
      return "Prices depend on the size and location. Please specify the area you're interested in.";
    } else if (input.includes("emi") || input.includes("loan")) {
      return "We provide EMI options and help with bank loan arrangements. Do you want to connect with a consultant?";
    } else if (input.includes("location")) {
      return "We have properties in Dindigul, Madurai, and Coimbatore. Where are you looking to buy?";
    } else if (input.includes("approval") || input.includes("dtcp") || input.includes("rera")) {
      return "Yes, all our plots are DTCP and RERA approved. You're in safe hands.";
    } else if (input.includes("water") || input.includes("electricity")) {
      return "Yes, water pipelines and EB connections are available for every plot.";
    } else if (input.includes("maintenance")) {
      return "There's a one-time maintenance fee for common amenities and layout upkeep.";
    } else if (input.includes("thank")) {
      return "You're most welcome! I'm here anytime you need assistance.";
    } else if (input.includes("contact") || input.includes("number")) {
      return "You can contact our agent at +91-9876543210 or we can call you back. Just let me know!";
    } else if (input.includes("booking") || input.includes("advance")) {
      return "Booking starts from just ₹10,000. Would you like us to reserve a plot for you?";
    } else {
      return "I'm here to assist with anything related to real estate—plots, villas, pricing, loans, and more!";
    }
  }

  // Text-to-Speech
  function speakText(text) {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    const preferred = ["Google UK English Female", "Microsoft Heera", "Heera", "Google हिन्दी"];
    let selected = voices.find(v => preferred.includes(v.name)) ||
      voices.find(v => v.lang.includes("en-IN") && v.name.toLowerCase().includes("female")) ||
      voices.find(v => v.lang.includes("en-IN")) ||
      voices[0];

    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = selected;
    utter.rate = 1;
    utter.pitch = 1.1;
    synth.speak(utter);
  }

  // Ensure voices load
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };

  // Voice input
  window.startListening = function () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Sorry, your browser does not support speech input.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      chatInput.value = transcript;
      sendMessage();
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };
});


document.querySelectorAll('.ar-video').forEach(video => {
  video.addEventListener('click', function () {
    if (this.requestFullscreen) {
      this.requestFullscreen();
    } else if (this.webkitRequestFullscreen) {
      this.webkitRequestFullscreen(); // Safari
    } else if (this.msRequestFullscreen) {
      this.msRequestFullscreen(); // IE11
    }
  });
});



// Function to prevent fullscreen when the video is clicked
function preventFullscreen(event) {
  // Disable fullscreen request
  event.preventDefault();
  
  // Check if the fullscreen API exists in the browser
  const video = event.target;

  if (video.requestFullscreen) {
    // Prevent the fullscreen request
    video.exitFullscreen();
  } else if (video.mozRequestFullScreen) { // Firefox
    video.mozCancelFullScreen();
  } else if (video.webkitRequestFullscreen) { // Chrome/Safari
    video.webkitExitFullscreen();
  }
}