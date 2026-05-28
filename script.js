// script.js

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 70;

let drawing = false;
let tool = "brush";
let color = "#000000";
let brushSize = 5;

let startX, startY;

document.getElementById("brush").onclick = () => tool = "brush";
document.getElementById("rectangle").onclick = () => tool = "rectangle";
document.getElementById("circle").onclick = () => tool = "circle";
document.getElementById("eraser").onclick = () => tool = "eraser";

document.getElementById("colorPicker").addEventListener("change",(e)=>{
  color = e.target.value;
});

document.getElementById("sizeSlider").addEventListener("input",(e)=>{
  brushSize = e.target.value;
});

document.getElementById("clearCanvas").onclick = ()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height);
};

document.getElementById("saveCanvas").onclick = ()=>{
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = canvas.toDataURL();
  link.click();
};

canvas.addEventListener("mousedown",(e)=>{
  drawing = true;

  startX = e.offsetX;
  startY = e.offsetY;

  if(tool === "brush" || tool === "eraser"){
    ctx.beginPath();
    ctx.moveTo(startX,startY);
  }
});

canvas.addEventListener("mousemove",(e)=>{

  if(!drawing) return;

  const x = e.offsetX;
  const y = e.offsetY;

  ctx.lineWidth = brushSize;
  ctx.lineCap = "round";

  if(tool === "brush"){

    ctx.strokeStyle = color;

    ctx.lineTo(x,y);
    ctx.stroke();

  }

  else if(tool === "eraser"){

    ctx.strokeStyle = "white";

    ctx.lineTo(x,y);
    ctx.stroke();

  }

});

canvas.addEventListener("mouseup",(e)=>{

  if(!drawing) return;

  drawing = false;

  const endX = e.offsetX;
  const endY = e.offsetY;

  ctx.lineWidth = brushSize;
  ctx.strokeStyle = color;

  if(tool === "rectangle"){

    ctx.strokeRect(
      startX,
      startY,
      endX - startX,
      endY - startY
    );

  }

  else if(tool === "circle"){

    const radius = Math.sqrt(
      Math.pow(endX - startX,2) +
      Math.pow(endY - startY,2)
    );

    ctx.beginPath();

    ctx.arc(
      startX,
      startY,
      radius,
      0,
      Math.PI * 2
    );

    ctx.stroke();

  }

});

window.addEventListener("resize",()=>{

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 70;

});