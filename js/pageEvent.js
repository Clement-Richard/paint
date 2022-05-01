function onReady(callback) {
    var intervalId = window.setInterval(function () {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            hideTextInputs()
            hideStaticInputs()
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 500);
}

function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function () {
    setVisible('.page', true);
    setVisible('#loading', false);
});

function hideTextInputs() {
    $('#textSize').hide('slow');
    $('#textValue').hide('slow');
    $('#textColorLabel').hide('slow');
    $('#textSizeLabel').hide('slow');
    $('#textColor').hide('slow')
}

function showTextInputs() {
    $('#textSize').show('slow');
    $('#textValue').show('slow');
    $('#textSizeLabel').show('slow');
    $('#textColorLabel').show('slow');
    $('#textColor').show('slow');
}

function showStaticInputs() {
    $('#formeWidth').show('slow');
    $('#formeWidthLabel').show('slow');
    $('#formeHeigth').show('slow');
    $('#formeHeigthLabel').show('slow');
}

function hideStaticInputs() {
    $('#formeWidth').hide('slow');
    $('#formeWidthLabel').hide('slow');
    $('#formeHeigth').hide('slow');
    $('#formeHeigthLabel').hide('slow');
}

$('#undo').click(function () {
    canvas.Undo()
})

$('#redo').click(function () {
    canvas.Redo()
})

function changeMode(mode = String) {
    canvas.mode = mode
}

function changeCanvasProperty(property = String, value) {
    canvas[property] = value
}

$('div #mode').click(function () {
    var clicked = $(this);
    var mode = clicked.attr('name')
    if (mode === 'text') {
        showTextInputs()
    } else {
        hideTextInputs()
    }
    changeMode(mode)
})

$('div .property').on('input', function () {
    var selected = $(this);
    var property = selected.attr('id')
    var value;
    if (property === 'textSize') {
        value = `${selected.val()}px serif`
    } else {
        value = selected.val()
    }
    changeCanvasProperty(property, value)
})

$('div .property').on('click', function () {
    var selected = $(this);
    var property = selected.attr('id')
    var value = selected.val()
    if (selected.val() === 'dynamique') {
        hideStaticInputs()
    } else if (selected.val() === 'statique') {
        showStaticInputs()
    }
    changeCanvasProperty(property, value)
})