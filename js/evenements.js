/*
  Fichier comprenant l'implémentation des évênements du canvas
*/

function canvasMouseDown(canvas, e) {
  // Je garde en mémoire que j'ai cliqué et ensuite les coordonnées de mon premier point	
  canvas.click = true;
  // Je récupère les coordonnées x du pointeur dans le canvas en retirant la position du canvas en left
  canvas.departX = e.clientX - canvas.getBoundingClientRect().left;
  // Je récupère les coordonnées y du pointeur dans le canvas en retirant la position du canvas en top
  canvas.departY = e.clientY - canvas.getBoundingClientRect().top;
  // Je garde en mémoire l'image actuelle du canvas et je la dessine dans le canvas temporaire
  canvas.temporaireCtx.drawImage(canvas, 0, 0);
}

function canvasMouseMove(canvas, e) {
  // Lorsque je bouge la souris, je veux dessiner uniquement si j'ai appuyé sur le bouton
  if (canvas.click) {
    // Je récupère les coordonnées du 2 ème point
    x2 = e.clientX - canvas.getBoundingClientRect().left;
    y2 = e.clientY - canvas.getBoundingClientRect().top;
    // J'affiche sur le canvas, le canvas temporaire pour effacer ma ligne précédente
    // Je dessine ma nouvelle ligne
    switch (canvas.mode) {
      case 'line':
        drawImage(canvas, 0, 0, canvas.temporaire);
        drawLine(canvas, canvas.departX, canvas.departY, x2, y2);
        break;
      case 'text':
        drawImage(canvas, 0, 0, canvas.temporaire);
        drawText(canvas, 0, 0, x2, y2);
        break;
      case 'default':
        drawDefault(canvas, canvas.departX, canvas.departY, x2, y2);
        canvas.departX = x2;
        canvas.departY = y2;
        break;
      case 'gomme':
        gomme(canvas, canvas.departX, canvas.departY, x2, y2);
        canvas.departX = x2;
        canvas.departY = y2;
        break;
      case 'square':
        drawImage(canvas, 0, 0, canvas.temporaire);
        drawSquare(canvas, canvas.departX, canvas.departY, x2, y2);
        break;
      case 'circle':
        drawImage(canvas, 0, 0, canvas.temporaire);
        drawCircle(canvas, canvas.departX, canvas.departY, x2, y2);
        break;
      case 'triangle':
        drawImage(canvas, 0, 0, canvas.temporaire);
        drawTriangle(canvas, canvas.departX, canvas.departY, x2, y2);
        break;
    }
  }
}

function canvasMouseUp(canvas, e) {
  // Je ne suis plus en mode "cliqué""
  canvas.click = false;
  canvas.PushToCanvasArray()
}

$('#download').click(async function () {
  const link = document.createElement('a');
  link.download = 'painting.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
});

$(window).keypress(function (e) {
  if (e.ctrlKey === true && e.keyCode === 26) {
    canvas.Undo()
  }
  if (e.ctrlKey === true && e.keyCode === 25) {
    canvas.Redo()
  }
});

window.addEventListener("paste", pasteImage);

function pasteImage(event) {
  var cbData = event.clipboardData;
  for (var i = 0; i < cbData.items.length; i++) {
    var cbDataItem = cbData.items[i];
    var type = cbDataItem.type;
    if (type.indexOf("image") != -1) {
      var imageData = cbDataItem.getAsFile();
      var url = window.URL || window.webkitURL;
      var src = url.createObjectURL(imageData);
      loadImage(src);
      canvas.PushToCanvasArray()
    }
  }
}