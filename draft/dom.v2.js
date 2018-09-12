BS3.DOM.render(
	BS3.DOM.createElement('div', {class: 'bg-success'}, [
		BS3.DOM.createElement('p', {text: 'paragraph 1'}),
		BS3.DOM.createElement('p', {text: 'paragraph 2', class: 'bg-danger'}),
		BS3.Label.primary('OK').style('position: relative; left: 50%;')
	]),
	document.getElementById('dom')
);