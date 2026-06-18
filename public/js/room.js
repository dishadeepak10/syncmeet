const socket = io();

// ======================
// VIDEO CALL
// ======================

const startVideo =
document.getElementById("startVideo");

const shareScreen =
document.getElementById("shareScreen");

const localVideo =
document.getElementById("localVideo");

let currentStream;

startVideo.addEventListener("click", async () => {

    try{

        currentStream =
        await navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        });

        localVideo.srcObject =
        currentStream;

    }
    catch(error){

        alert(
        "Camera Permission Denied"
        );

    }

});

// ======================
// SCREEN SHARE
// ======================

shareScreen.addEventListener("click", async () => {

    try{

        const screenStream =
        await navigator.mediaDevices.getDisplayMedia({
            video:true
        });

        localVideo.srcObject =
        screenStream;

    }
    catch(error){

        alert(
        "Screen Sharing Cancelled"
        );

    }

});

// ======================
// WHITEBOARD TOGGLE
// ======================

const whiteboardBtn =
document.getElementById("whiteboardBtn");

const whiteboardSection =
document.getElementById("whiteboardSection");

whiteboardBtn.addEventListener("click",()=>{

    if(
        whiteboardSection.style.display==="none"
    ){

        whiteboardSection.style.display =
        "block";

    }
    else{

        whiteboardSection.style.display =
        "none";

    }

});

// ======================
// WHITEBOARD
// ======================

const canvas =
document.getElementById("whiteboard");

const ctx =
canvas.getContext("2d");

let drawing = false;

let currentColor = "black";

canvas.addEventListener(
"mousedown",
()=>{
drawing=true;
}
);

canvas.addEventListener(
"mouseup",
()=>{
drawing=false;
ctx.beginPath();
}
);

canvas.addEventListener(
"mousemove",
draw
);

function draw(event){

if(!drawing) return;

ctx.lineWidth = 3;

ctx.lineCap = "round";

ctx.strokeStyle =
currentColor;

ctx.lineTo(
event.offsetX,
event.offsetY
);

ctx.stroke();

ctx.beginPath();

ctx.moveTo(
event.offsetX,
event.offsetY
);

}

// ======================
// PEN COLORS
// ======================

document
.getElementById("blackPen")
.addEventListener("click",()=>{

currentColor="black";

});

document
.getElementById("redPen")
.addEventListener("click",()=>{

currentColor="red";

});

document
.getElementById("bluePen")
.addEventListener("click",()=>{

currentColor="blue";

});

document
.getElementById("greenPen")
.addEventListener("click",()=>{

currentColor="green";

});

// ======================
// ERASER
// ======================

document
.getElementById("eraserBtn")
.addEventListener("click",()=>{

currentColor="white";

});

// ======================
// CLEAR BOARD
// ======================

document
.getElementById("clearBoard")
.addEventListener("click",()=>{

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

});

// ======================
// FILE SHARING
// ======================

const fileInput =
document.getElementById("fileInput");

const fileName =
document.getElementById("fileName");

const fileBtn2 =
document.getElementById("fileBtn2");

fileBtn2.addEventListener("click",()=>{

fileInput.click();

});

fileInput.addEventListener("change",()=>{

const file =
fileInput.files[0];

if(file){

fileName.innerHTML +=
"<p>📄 " +
file.name +
"</p>";

}

});

// ======================
// CHAT
// ======================

const sendChat =
document.getElementById("sendChat");

const chatInput =
document.getElementById("chatInput");

const chatMessages =
document.getElementById("chatMessages");

sendChat.addEventListener("click",()=>{

if(
chatInput.value.trim()===""
) return;

chatMessages.innerHTML +=
"<p><b>You:</b> "
+
chatInput.value +
"</p>";

chatInput.value="";

});

// ======================
// ROOMS
// ======================

const joinRoom =
document.getElementById("joinRoom");

const roomId =
document.getElementById("roomId");

const roomStatus =
document.getElementById("roomStatus");

if(joinRoom){

joinRoom.addEventListener(
"click",
()=>{

const room =
roomId.value;

if(room===""){

alert(
"Enter Room ID"
);

return;

}

roomStatus.innerText =
"Joined Room: " +
room;

socket.emit(
"join-room",
room
);

});

}

// ======================
// ROOM ALERTS
// ======================

socket.on(
"user-joined",
(message)=>{

alert(message);

}
);

// ======================
// TIMER
// ======================

let seconds = 0;

setInterval(()=>{

seconds++;

const hrs =
String(
Math.floor(
seconds/3600
)
).padStart(2,"0");

const mins =
String(
Math.floor(
(seconds%3600)/60
)
).padStart(2,"0");

const secs =
String(
seconds%60
).padStart(2,"0");

const timer =
document.getElementById(
"timer"
);

if(timer){

timer.innerText =
hrs +
":" +
mins +
":" +
secs;

}

},1000);

// ======================
// MEETING CODE
// ======================

const params =
new URLSearchParams(
window.location.search
);

const meetingCode =
params.get("room");

if(meetingCode){

document
.getElementById(
"meetingCode"
)
.innerText =
"Meeting: " +
meetingCode;

}

// ======================
// COPY CODE
// ======================

const copyCode =
document.getElementById(
"copyCode"
);

copyCode.addEventListener(
"click",
()=>{

navigator.clipboard.writeText(
meetingCode
);

alert(
"Meeting code copied"
);

}
);