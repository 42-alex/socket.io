# Usage example of socket.io for real-time communication between a server and a client

In this chat app we can see that each time the user submits a message form the server saves the data and emits a "message" event. All clients are subscribed on the "message" event and can make appropriate actions like updating the html.