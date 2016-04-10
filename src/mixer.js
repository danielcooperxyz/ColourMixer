function Mixer() {
	this.numberOfColours = 3;
	this.paintSets =
        [
            {
                name: 'Annie Sloane',
                colours:
                    [
                        { text: 'Select a Color', value: '0' },
                        { text: 'Antibes Green', value: '95,173,72' },
                        { text: 'Antoinette', value: '243,218,221' },
                        { text: 'Arles', value: '231,174,69' },
                        { text: 'Aubusson Blue', value: '51,90,133' },
                        { text: 'Barcelona Orange', value: '230,134,76' },
                        { text: 'Burgundy', value: '94,8,15' },
                        { text: 'Chateau Grey', value: '110,117,75' },
                        { text: 'Coco', value: '141,128,112' },
                        { text: 'Country Grey', value: '198,195,176' },
                        { text: 'Cream', value: '234,230,192' },
                        { text: 'Duck Egg Blue', value: '127,163,159' },
                        { text: 'Emile', value: '142,124,136' },
                        { text: 'Emperors Silk', value: '170,11,39' },
                        { text: 'English Yellow', value: '254,234,124' },
                        { text: 'Florence', value: '3,98,102' },
                        { text: 'French Linen', value: '171,163,144' },
                        { text: 'Graphite', value: '28,28,28' },
                        { text: 'Greek Blue', value: '38,79,143' },
                        { text: 'Henrietta', value: '205,145,181' },
                        { text: 'Louis Blue', value: '191,206,237' },
                        { text: 'Napoleonic Blue', value: '13,68,132' },
                        { text: 'Old Ochre', value: '212,207,175' },
                        { text: 'Old White', value: '255,249,225' },
                        { text: 'Old Violet', value: '70,78,114' },
                        { text: 'Olive', value: '65,61,32' },
                        { text: 'Paloma', value: '168,162,162' },
                        { text: 'Paris Grey', value: '205,205,205' },
                        { text: 'Primer Red', value: '109,48,30' },
                        { text: 'Provence', value: '110,162,173' },
                        { text: 'Pure', value: '255,255,255' },
                        { text: 'Scandinavian Pink', value: '206,116,108' },
                        { text: 'Versailles', value: '206,204,130' }
                    ]
            }, {
                name: 'New',
                colours:
                    [
                        { text: 'Select a Color', value: '0' },
                        { text: 'Antibes Green', value: '95,173,72' }
                    ]
            }
        ];

    // enable reset button?
    this.enableReset = true;

    // configurable layouts?
    // this.layout = 1;

    this.setupInterface();
};

Mixer.prototype.getHex = function(rgb) {
    return new RGBColor('rgb(' + rgb + ')').toHex();
};

Mixer.prototype.setupInterface = function() {
    var mixer = document.getElementById('mixer'),
    i, selectors, buttons, mixButton, resetButton, 
    mixOutput, clear, dialogBackground;

    selectors = document.createElement("div");
    selectors.className += "selectors";

    for(var i = 1; i <= this.numberOfColours; i++) {

        selectors.appendChild(this.newSelector(i));
    }

    mixer.appendChild(selectors);

    buttons = newDiv();
    buttons.className += "buttons";

    mixButton = newButton();
    mixButton.value = "Mix!";
    buttons.appendChild(mixButton);

    if (this.enableReset) {

        resetButton = newButton();
        resetButton.value = "Reset";
        buttons.appendChild(resetButton);
    }

    mixer.appendChild(buttons);

    clear = newDiv();
    clear.className += "clear";
    mixer.appendChild(clear);

    mixOutput = newDiv();
    mixOutput.className += "mix-output xerel";

    mixer.appendChild(mixOutput);

    mixer.appendChild(this.setupPaintPicker());
    
    dialogBackground = newDiv();
    dialogBackground.className += "dialog-background hidden";
    mixer.appendChild(dialogBackground);
};

Mixer.prototype.newSelector = function(mixerId) {

    var selector, picker, text, parts, select, i, option;

    select = document.createElement("select");
    select.className += "xerel";
    
    for(i = 1; i <= 5; i++) {
        option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }

    parts = newDiv();
    parts.className += "parts";
    parts.appendChild(select);

    text = document.createElement("p");
    text.textContent = "Select a colour...";

    picker = newDiv();
    picker.className += "picker xerel";
    picker.appendChild(text);
    picker.onclick = onColorClick;

    selector = newDiv();
    selector.className += "selector";
    selector.id = "color-" + mixerId;
    selector.setAttribute("mixer-id", mixerId);

    selector.appendChild(picker);
    selector.appendChild(parts);

    return selector;
};

Mixer.prototype.setupPaintPicker = function() {
    var paintPicker, paintDropdown, paintTypes, colourList,
    okButton, cancelButton;

    paintPicker = newDiv();
    paintPicker.className += "paint-picker hidden";

    paintTypes = this.getPaintTypeDropdown();
    paintTypes.onSelect = onDropdownSelect;
    paintPicker.appendChild(paintTypes);

    colourList = document.createElement("ul");
    colourList.className += "colour-list xerel";
    paintPicker.appendChild(colourList);  

    okButton = newButton();
    okButton.value = "Ok";
    paintPicker.appendChild(okButton);

    cancelButton = newButton();
    cancelButton.value = "Cancel";
    paintPicker.appendChild(cancelButton);

    return paintPicker;
};

Mixer.prototype.getPaintTypeDropdown = function() {
    var select, index, paintName, option;

    select = document.createElement("select");
    select.className += "xerel";

    option = document.createElement("option");
    option.value = null;
    option.textContent = "Select...";
    select.appendChild(option);
    
    for(index = 0; index < this.paintSets.length; index++) {
        
        paintName = this.paintSets[index].name;

        if (paintName) {
            option = document.createElement("option");
            option.value = paintName;
            option.textContent = paintName;
            select.appendChild(option);
        } else {
            console.log("Property 'name' not found in paintSet[" + index + "!");
        }

        this.createOptionFragment(this.paintSets[index]);
    }

    return select;
};

Mixer.prototype.createOptionFragment = function(paintSet) {
    var docFrag, index, colours, item, name, swatch;

    docFrag = document.createDocumentFragment();

    if (paintSet.colours) {
        for (index = 0; index < paintSet.colours.length; index++) {
            paintSet.colours[index].id = guid();

            swatch = newDiv();
            swatch.style.background = this.getHex(paintSet.colours[index].value);

            name = document.createElement("p");
            name.textContent = paintSet.colours[index].text;

            item = document.createElement("li");
            item.id = paintSet.colours[index].id;
            item.appendChild(swatch);
            item.appendChild(name);

            docFrag.appendChild(item);
        }

        paintSet.options = docFrag;
    } else {
        console.log("Property 'colours' not found!");
    }
}

function newDiv() {
    return document.createElement("div");
}

function newButton() {
    var button = document.createElement("input");
    button.setAttribute("type", "button");

    return button;
}

function onColorClick() {

    // get top of window
    var windowTop = window.pageYOffset,
    paintPicker = document.getElementsByClassName("paint-picker")[0],
    displayStyle = window.getComputedStyle(paintPicker).display,
    dialogBackground = document.getElementsByClassName("dialog-background")[0];

    if (displayStyle === "none") {

        // set top of colour picker dialog
        paintPicker.style.top = windowTop + 50 + "px";
        dialogBackground.style.top = windowTop + "px";
        dialogBackground.style.height = window.innerHeight + "px";

        // block scroll
        disableScroll();
    } else {

        enableScroll();
    }

    //show or hide the dialog
    paintPicker.classList.toggle("hidden");
    dialogBackground.classList.toggle("hidden");
}

function onDropdownSelect() {
    alert("Hello world");
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}