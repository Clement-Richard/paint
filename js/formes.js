// Création d'un canvas
function initCanvas(largeur, hauteur, couleur) {
  var canvas = document.getElementById('canvas');
  // Change la forme du curseur sur le canvas
  canvas.style.cursor = 'crosshair';
  // Je précise la largeur du canvas
  canvas.setAttribute('width', largeur);
  // Je précise la longueur du canvas
  canvas.setAttribute('height', hauteur);
  // Je lance la fonction canvasMouseMove si je bouge la souris
  canvas.addEventListener('mousemove', e => canvasMouseMove(canvas, e), false);
  // Je lance la fonction canvasMouseDown si j'appuie sur le bouton gauche de la souris
  canvas.addEventListener('mousedown', e => canvasMouseDown(canvas, e), false);
  // Je lance la fonction canvasMouseUp si je relâche le bouton gauche de la souris
  canvas.addEventListener('mouseup', e => canvasMouseUp(canvas, e), false);
  // J'initialise le click à faux  
  canvas.click = false;
  canvas.mode = "default";
  canvas.penStyle = 'round';
  canvas.penWidth = 1;
  canvas.gommeWidth = 10;
  canvas.penColor = 'black';
  canvas.gommeColor = 'white';
  canvas.textValue = ''
  canvas.textColor = 'black'
  canvas.formeColor = 'black'
  canvas.formeStyle = 'dynamique'
  canvas.textSize = '12px serif';
  canvas.formeWidth = 100;
  canvas.formeHeigth = 100;
  // Je récupère le contexte du canvas
  var ctx = canvas.getContext('2d');
  // Je définis une couleur (passée en paramètre) pour le dessin
  ctx.fillStyle = couleur;
  // Je remplis la surface avec cette couleur
  ctx.fillRect(0, 0, largeur, hauteur);
  // Je créé un canvas temporaire de la même taille que le canvas principal
  canvas.temporaire = document.createElement('canvas');
  canvas.temporaire.width = canvas.width;
  canvas.temporaire.height = canvas.height;
  canvas.temporaireCtx = canvas.temporaire.getContext('2d');
  // Je créé le pointeur vers le contexte du canvas temporaire
  canvas.ArrayStep = 0;
  canvas.canvasArray = new Array()
  canvas.canvasArray.push(document.getElementById('canvas').toDataURL());
  // canvas.onselectstart = function () { return false; }
  // ghostcanvas = document.createElement('canvas');
  // ghostcanvas.height = canvas.heigth;
  // ghostcanvas.width = canvas.width;
  // gctx = ghostcanvas.getContext('2d');

  canvas.PushToCanvasArray = function () {
    if(canvas.canvasArray.length >= 1 && canvas.ArrayStep === 0){
      canvas.canvasArray = [canvas.canvasArray[0], document.getElementById('canvas').toDataURL()]
      canvas.ArrayStep++;
    }
    else{
      canvas.ArrayStep++;
      canvas.canvasArray.push(document.getElementById('canvas').toDataURL());
    }
  }

  canvas.Undo = function () {
    let dataUrl = canvas.toDataURL();
    canvasIndex = canvas.canvasArray.indexOf(dataUrl)
    if (canvasIndex != -1) {
      canvas.ArrayStep = canvasIndex - 1;
    }
    if (canvas.ArrayStep < 0) {
      canvas.ArrayStep = 0;
    } else if (canvas.ArrayStep >= 0) {
      var canvasPic = new Image();
      canvasPic.src = canvas.canvasArray[canvas.ArrayStep];
      canvasPic.onload = function () {
        ctx.drawImage(canvasPic, 0, 0);
      }
    }
    console.log(canvas.ArrayStep)
    console.log(canvas.canvasArray)
  }

  canvas.Redo = function () {
    canvas.ArrayStep++;
    if (canvas.ArrayStep > canvas.canvasArray.length - 1) {
      canvas.ArrayStep--;
    } else if (canvas.ArrayStep <= canvas.canvasArray.length - 1) {
      var canvasPic = new Image();
      canvasPic.src = canvas.canvasArray[canvas.ArrayStep];
      canvas.canvasArray[canvas.ArrayStep]
      canvasPic.onload = function () {
        ctx.drawImage(canvasPic, 0, 0);
      }
    }
    console.log(canvas.ArrayStep)
    console.log(canvas.canvasArray)
  }
  // Je retourne le canvas
  return canvas;
}

//Dessine une ligne
function drawLine(canvas, x1, y1, x2, y2) {
  ctx = canvas.getContext('2d');
  ctx.lineCap = canvas.penStyle;
  ctx.lineCap = 'square';
  ctx.lineWidth = canvas.penWidth;
  ctx.strokeStyle = canvas.penColor;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawText(canvas, x1, y1, x2, y2) {
  ctx = canvas.getContext('2d');
  ctx.fillStyle = canvas.textColor;
  ctx.font = canvas.textSize;
  ctx.fillText(canvas.textValue, x2, y2)
}

function drawDefault(canvas, x1, y1, x2, y2) {
  ctx = canvas.getContext('2d');
  ctx.lineCap = canvas.penStyle;
  ctx.lineWidth = canvas.penWidth;
  ctx.strokeStyle = canvas.penColor;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2)
  ctx.stroke()
}

function gomme(canvas, x1, y1, x2, y2) {
  ctx = canvas.getContext('2d');
  ctx.lineCap = canvas.penStyle;
  ctx.lineWidth = canvas.gommeWidth;
  ctx.strokeStyle = canvas.gommeColor;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2)
  ctx.stroke()
}

function drawSquare(canvas, x1, y1, x2, y2) {
  var ctx = canvas.getContext("2d");
  ctx.lineCap = 'square';
  ctx.lineWidth = canvas.penWidth;
  ctx.strokeStyle = canvas.formeColor;
  if (canvas.formeStyle === 'dynamique') {
    ctx.beginPath();
    ctx.rect(x1, y1, x2 - x1, y2 - y1);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.rect(x2, y2, canvas.formeWidth, canvas.formeHeigth);
    ctx.stroke();
  }
}

function drawCircle(canvas, x1, y1, x2, y2) {
  var ctx = canvas.getContext('2d');
  var radius = Math.abs(x2 - x1)
  ctx.lineCap = 'round';
  ctx.lineWidth = canvas.penWidth;
  ctx.strokeStyle = canvas.formeColor;
  if (canvas.formeStyle === 'dynamique') {
    ctx.beginPath();
    ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(x2, y2, canvas.formeWidth, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

function drawTriangle(canvas, x1, y1, x2, y2) {
  var ctx = canvas.getContext('2d');
  ctx.lineWidth = canvas.penWidth;
  ctx.lineCap = 'square';
  ctx.strokeStyle = canvas.formeColor;
  var triangleWidth = parseInt(canvas.formeWidth);
  var triangleHeight = parseInt(canvas.formeHeigth);
  var halfWidth = (x2 - x1) / 2
  if (canvas.formeStyle === 'dynamique') {
    ctx.beginPath();
    ctx.moveTo(x1, y2);
    ctx.lineTo(x2, y2);
    ctx.moveTo(x1 + halfWidth, y1)
    ctx.lineTo(x1, y2);
    ctx.lineTo(x1 + halfWidth * 2, y2);
    ctx.closePath()
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 + triangleWidth / 2, y2 + triangleHeight);
    ctx.lineTo(x2 - triangleWidth / 2, y2 + triangleHeight);
    ctx.closePath();
    ctx.stroke();
  }
}

function drawGrille(canvas, x1, y1, x2, y2) {
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  for (var h = 15; h < canvas.height; h += 15) {
    ctx.moveTo(0, h); //déplacer le pinceau à (x,y) sans tracer
    ctx.lineTo(canvas.width, h); //tracer jusqu'à (x,y)
  }
  //colonnes
  for (var w = 15; w < canvas.width; w += 15) {
    ctx.moveTo(w, 0);
    ctx.lineTo(w, canvas.height);
  }
  ctx.stroke();
}

// Dessine une image
function drawImage(canvas, x, y, image) {
  ctx = canvas.getContext('2d');
  ctx.drawImage(image, x, y);
}

function loadImage(src){
  ctx = canvas.getContext('2d');
  var img = new Image();
  img.src = src;
  img.onload = function(e) {
    ctx.drawImage(img,0,0);
  };
}