# ChipChap_project - Reactive Chat
A simple chat application made with react-native, tailwind and crossbario (python) from the ground up.

<img src="https://live.staticflickr.com/65535/49984360068_558d4dab17_h.jpg" width="1450" height="565" alt="chipchap_project">
<img src="https://live.staticflickr.com/65535/49985152997_d3ac4c1a39_o.png" width="1450" height="565" alt="chipchap_project02">

Chat fully working, being able to speak everyone you have as a "contact". The Chat works through websockets using the WAMP protocol for communication of messages.

The WAMP protocol establishes the rRPC and PUB/SUB patterns and so this application is fully driven by such patterns wired with procedures and topics.

Each user receives a session which is authenticated by the BACKEND. **Note**: the actual application doesn't have any authentication
built-in; the sessions are internally tracked by the backend-logic for demonstration purposes only. 
