--------------------
Collaborative Canvas
--------------------

Project Overview
A basic drawing application implementing single-user drawing functionality using HTML Canvas API.

---------
PHASE - 1
---------

Establish foundational drawing capabilites without any collaboration features.

File structure up to this is:
------------------------------
├── index.html # HTML structure
├── style.css # Styling rules
└── canvas.js # Core drawing logic


---------
PHASE - 2
---------

Convert diagram on canvas into structured data.
I generate a stroke object, and the canvas only renders it.

--------
PHASE - 3
--------
Establish a stable real-time communication channel between between:

 Browser 
 Node.js

 server.js
 canvas.js

Here:
 Multiple users can connect
 server knows who is connected

web socket server is running on the port 3000
client is connected
Received: hello server from client
client is connected
Received: hello server from client.


---------
PHASE - 4
---------

Make one users drawing appear on another users screen while it is happening.

when it create a stroke i send it to the server.
The server sends it to everyone else. They draw it.
