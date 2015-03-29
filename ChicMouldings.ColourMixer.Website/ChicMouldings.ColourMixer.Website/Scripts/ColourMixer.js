/*! ColourMixer.js
* Copyright 2014 Daniel Cooper
*/
function populateDropdowns(dropdowns) {
    var index, data, option, newOption;

    data =
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
        ];


    for (index = 0; index < data.length; index++) {
        option = data[index];

        newOption = '<option value="' + option.value;
        newOption += '">' + option.text + '</option>';

        dropdowns.append(newOption);
    }
}

function updateSelectedColour() {
    var selectedColour, colour, displayBox;

    selectedColour = $(this).val();

    colour = new RGBColor('rgb(' + selectedColour + ')');

    displayBox = $(this).parents('.Container').find('.PaintDisplay');

    displayBox.css('background', colour.toHex());

    return false;
}

function calculateTotals(array, parts, totalParts) {
    var index, part = 0, total = 0;

    for (index = 0; index < parts.length; index++) {
        part = parseInt(parts[index], 0);

        if (part > 0) {
            total += (parseInt(array[index], 0) * part);
        }
    }

    return parseInt(total / totalParts, 0);
}

function displayRecipe(colours, parts) {
    var index = 0, recipeText = "<ul>", recipe = $('#recipe');

    for (index = 0; index < colours.length; index++) {
        if (parts[index] > 0) {
            recipeText += "<li>" + parts[index] + " x "
                 + colours[index].text() + "</li>";
        }
    }

    recipeText += "</ul>";

    recipe.html(recipeText);

    if (recipe.text().length > 0) {
        recipe.addClass('Populated');
    }
}

function mixColours() {
    var colours = [], red = [], blue = [], green = [],
        index, temp = [], totalParts = 0, totals = [],
        parts = [], resultColour;

    colours =
        [
            $('#paintOneValue option:selected'),
            $('#paintTwoValue option:selected'),
            $('#paintThreeValue option:selected'),
            $('#paintFourValue option:selected')
        ];

    parts =
        [
            $('#paintOneParts').val(),
            $('#paintTwoParts').val(),
            $('#paintThreeParts').val(),
            $('#paintFourParts').val()
        ];

    for (index = 0; index < colours.length; index++) {
        if (colours[index].val() === "0") {
            parts[index] = 0;
        } else {
            if (parts[index].length === 0 || parts[index] === 0) {
                parts[index] = 1;
            }
        }

        totalParts += parseInt(parts[index], 0);

        temp = new RGBColor("rgb(" + colours[index].val() + ")");

        red.push(temp.r);
        green.push(temp.g);
        blue.push(temp.b);
    }

    totals.push(calculateTotals(red, parts, totalParts));
    totals.push(calculateTotals(green, parts, totalParts));
    totals.push(calculateTotals(blue, parts, totalParts));

    resultColour = new RGBColor("rgb(" + totals.join(',') + ")").toHex();

    if (resultColour !== '#000000') {
        $('#paintResult').css('background', resultColour);
    }

    displayRecipe(colours, parts);

    return false;
}

function reset() {
    var dropdowns = $('.Dropdown'),
        recipe = $('#recipe');

    dropdowns.children('option').prop('selected', '');
    $('.Spinner').val('');

    dropdowns.selectmenu('refresh');
    $('.ui-selectmenu-button, .ui-spinner').css("width", "100%");

    $('.PaintDisplay, #paintResult').css('background-color', "#FFFFFF");
    recipe.html('');
    recipe.removeClass('Populated');
}

$(document).ready(function () {
    var dropdowns = $('.Dropdown'),
        spinners = $('.Spinner'),
        mixButton = $('#mixButton'),
        resetButton = $('#resetButton');

    populateDropdowns(dropdowns);

    dropdowns.selectmenu({ change: updateSelectedColour });

    spinners.spinner(
        {
            min: 0,
            numberFormat: "C"
        }
    );

    $('.ui-selectmenu-button, .ui-spinner, .ui-spinner-input').css("width", "100%");

    mixButton.click(mixColours);

    resetButton.click(reset);
});