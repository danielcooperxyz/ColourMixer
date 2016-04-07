function Mixer() {
	this.numberOfColours = 3;
	this.paintSet =
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

Mixer.prototype.getHex = function(red, green, blue) {
    return new RGBColor('rgb(' + red + ',' + green + ',' + blue + ')').toHex();
};

Mixer.prototype.setupInterface = function() {
    var mixer = document.getElementById('mixer'),
    i, selectors, buttons, mixButton, resetButton, mixOutput, clear;

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
};

Mixer.prototype.setupPaintPicker = function() {
    var paintPicker, paintDropdown, paintTypes, colorPicker;

    paintPicker = newDiv();
    paintPicker.className += "paint-picker hidden";

    paintTypes = this.getPaintTypeDropdown();
    paintTypes.onSelect = onDropdownSelect;

    paintPicker.appendChild(paintTypes);

    return paintPicker;
};

Mixer.prototype.newSelector = function(mixerId) {

    var selector, picker, text, parts, select, i, option;

    selector = newDiv();
    selector.className += "selector";
    selector.id = "color-" + mixerId;
    selector.setAttribute("mixer-id", mixerId);

    picker = newDiv();
    picker.className += "picker xerel";

    text = document.createElement("p");
    text.textContent = "Select a colour...";
    picker.appendChild(text);

    parts = newDiv();
    parts.className += "parts";
    select = document.createElement("select");
    select.className += "xerel";
    
    for(i = 1; i <= 5; i++) {
        option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }

    parts.appendChild(select);

    selector.appendChild(picker);
    selector.appendChild(parts);

    return selector;
};

Mixer.prototype.getPaintTypeDropdown = function() {
    var select, index, paintName, option;

    select = document.createElement("select");

    for(index = 0; index < this.paintSet.length; index++) {
        
        paintName = this.paintSet[index].name;

        if (paintName) {
            option = document.createElement("option");
            option.value = paintName;
            option.textContent = paintName;
            select.appendChild(option);
        } else {
            console.log("Property 'name' not found in paintSet[" + index + "!");
        }

        createOptionFragment(this.paintSet[index]);
    }

    return select;
};

function newDiv() {
    return document.createElement("div");
}

function newButton() {
    var button = document.createElement("input");
    button.setAttribute("type", "button");

    return button;
}

function createOptionFragment(paintSet) {
    var docFrag, index, colours, option;

    docFrag = document.createDocumentFragment();

    if (paintSet.colours) {
        for (index = 0; index < paintSet.colours.length; index++) {            

            option = document.createElement("option");
            option.textContent = paintSet.colours[index].text;
            option.value = paintSet.colours[index].value;

            docFrag.appendChild(option);
        }

        paintSet.options = docFrag;
    } else {
        console.log("Property 'colours' not found!");
    }
}

function onDropdownSelect() {
    alert("Hello world");
}