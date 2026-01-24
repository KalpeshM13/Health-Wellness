function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  addMessage(message, "user-message");
  input.value = "";

  setTimeout(() => {
    botReply(message);
  }, 600);
}

function addMessage(text, className) {
  const chatBox = document.getElementById("chatBox");
  const msgDiv = document.createElement("div");
  msgDiv.className = className;
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function botReply(userText) {
  fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: userText })
  })
  .then(response => response.json())
  .then(data => {
    addMessage(data.response, "bot-message");
  })
  .catch(error => {
    console.error("Error:", error);
    addMessage("Sorry, I encountered an error. Please try again.", "bot-message");
  });
}
