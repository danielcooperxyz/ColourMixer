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

    setupInterface();
};

mixer.prototype.getHex = function(rgb) {
    return new RGBColor('rgb(' + rgb + ')').toHex();
};

mixer.prototype.getHex = function(red, green, blue) {
    return new RGBColor('rgb(' + red + ',' + green + ',' + blue + ')').toHex();
};

function setupInterface() {
    var mixer = document.getElementById('mixer'),
    i, newColour;

    newColour = document.createElement("div");
    newColour.className += "colourPicker";

    for(var i = 0; i < this.numberOfColours; i++) {
        mixer.appendChild(newColour);
    }
};