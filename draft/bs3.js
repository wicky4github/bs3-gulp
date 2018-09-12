// native dom
document.getElementById('div').innerHTML = BS3.Label.success('Success');
// jquery dom
$('#div').append(BS3.Button.warning('Warning').class(['foo', 'bar']).attr({ 'type': 'submit' }).toString());