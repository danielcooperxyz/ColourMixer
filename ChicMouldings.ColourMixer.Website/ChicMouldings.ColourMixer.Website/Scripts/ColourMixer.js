
function populateDropdowns()
{
    var index, data, dropdowns, option, newOption;

    data =
    [
        { text: 'Select a Color', value: '0' },
        { text: 'Antibes Green', value: 'rgb(95,173,72)' },
        { text: 'Antoinette', value: 'rgb(243,218,221)' },
        { text: 'Arles', value: 'rgb(231,174,69)' },
        { text: 'Aubusson Blue', value: 'rgb(51,90,133)' },
        { text: 'Barcelona Orange', value: 'rgb(230,134,76)' },
        { text: 'Chateau Grey', value: 'rgb(110,117,75)' },
        { text: 'Coco', value: 'rgb(141,128,112)' },
        { text: 'Country Grey', value: 'rgb(198,195,176)' },
        { text: 'Cream', value: 'rgb(234,230,192)' },
        { text: 'Duck Egg Blue', value: 'rgb(127,163,159)' },
        { text: 'Emile', value: 'rgb(142,124,136)' },
        { text: 'Emperors Silk', value: 'rgb(170,11,39)' },
        { text: 'English Yellow', value: 'rgb(254,234,124)' },
        { text: 'Florence', value: 'rgb(3,98,102)' },
        { text: 'French Linen', value: 'rgb(171,163,144)' },
        { text: 'Graphite', value: 'rgb(28,28,28)' },
        { text: 'Greek Blue', value: 'rgb(38,79,143)' },
        { text: 'Henrietta', value: 'rgb(205,145,181)' },
        { text: 'Louis Blue', value: 'rgb(191,206,237)' },
        { text: 'Napoleonic Blue', value: 'rgb(13,68,132)' },
        { text: 'Old Ochre', value: 'rgb(212,207,175)' },
        { text: 'Old White', value: 'rgb(255,249,225)' },
        { text: 'Old Violet', value: 'rgb(70,78,114)' },
        { text: 'Olive', value: 'rgb(65,61,32)' },
        { text: 'Paloma', value: 'rgb(168,162,162)' },
        { text: 'Paris Grey', value: 'rgb(205,205,205)' },
        { text: 'Primer Red', value: 'rgb(109,48,30)' },
        { text: 'Provence', value: 'rgb(110,162,173)' },
        { text: 'Pure White', value: 'rgb(255,255,255)' },
        { text: 'Scandinavian Pink', value: 'rgb(206,116,108)' },
        { text: 'Versailles', value: 'rgb(206,204,130)' }
    ];

    dropdowns = $('.Dropdown');

    for (index = 0; index < data.length; index++)
    {
        option = data[index];

        newOption = '<option value="' + option.value;
        newOption += '">' + option.text + '</option>';

        dropdowns.append(newOption);
    }
}

$(document).ready(function ()
{
    populateDropdowns();
});