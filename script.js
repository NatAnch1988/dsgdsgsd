document.addEventListener("DOMContentLoaded", function () {
  const chat = document.getElementById("chat");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");

  const channelID = 'kEsh63bcmvazFaps'; // Provided Channel ID
  const drone = new Scaledrone(channelID);

  drone.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Connected to Scaledrone');
  });

  drone.on('message', (message) => {
    const { data: { user, text, color } } = message;
    const messageHTML = createMessage(user, text, color);
    chat.innerHTML += messageHTML;
    chat.scrollTop = chat.scrollHeight;
  });

  sendButton.addEventListener("click", sendMessage);

  function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === "") return;

    const user = Math.random() < 0.5 ? "Nate" : "Ani";
    const color = user === "Nate" ? "#007bff" : "#e74c3c";
    
    drone.publish({
      room: 'observable-room',
      message: { user, text: messageText, color }
    });

    // Clear the input field
    messageInput.value = "";
  }

  function createMessage(user, text, color) {
    return `
      <div class="message" style="border-color: ${color};">
        <span class="user" style="color: ${color};">${user}:</span>
        <span class="text">${text}</span>
      </div>`;
  }
});
