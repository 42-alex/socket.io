# Usage example of socket.io for real-time communication between server and client

In this chat app we can see that each time the user send a new message the server emits a "message" event and sends a new message in the body. All clients are subscribed on the "message" event and update the html when it occurs.