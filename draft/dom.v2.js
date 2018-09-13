document.getElementById('form1').innerHTML = '\
	<div class="container">\
	    <form class="form-horizontal">\
	        <div class="form-group has-feedback">\
	            <label for="username1" class="col-xs-3 control-label">Username 1：</label>\
	            <div class="col-xs-9">\
	                <input required type="text" class="form-control" name="username1" id="username1" />\
	            </div>\
	        </div>\
	        <div class="form-group has-feedback">\
	            <label for="password1" class="col-xs-3 control-label">Password 1：</label>\
	            <div class="col-xs-9">\
	                <input required type="password" class="form-control" name="password1" id="password1" />\
	            </div>\
	        </div>\
	        <div class="form-group has-feedback">\
	            <div class="col-xs-offset-3 col-xs-9">\
	                <button type="submit" class="btn btn-info">Submit 1</button>\
	            </div>\
	        </div>\
	    </form>\
	</div>\
';


BS3.DOM.render(
	BS3.DOM.createElement('div', {class: 'container'}, [
		BS3.DOM.createElement('form', {class: 'form-horizontal'}, [
			BS3.DOM.createElement('div', {class: 'form-group has-feedback'}, [
				BS3.DOM.createElement('label', {text: 'Username 2：', attr: {for: 'username2'}, class: 'col-xs-3 control-label'}),
				BS3.DOM.createElement('div', {class: 'col-xs-9'}, [
					BS3.DOM.createElement('input', {attr: {required: 'required', type: 'text', name: 'username1', id: 'username2'}, class: 'form-control'})
				])
			]),
			BS3.DOM.createElement('div', {class: 'form-group has-feedback'}, [
				BS3.DOM.createElement('label', {text: 'Password 2：', attr: {for: 'password2'}, class: 'col-xs-3 control-label'}),
				BS3.DOM.createElement('div', {class: 'col-xs-9'}, [
					BS3.DOM.createElement('input', {attr: {required: 'required', type: 'text', name: 'password2', id: 'password2'}, class: 'form-control'})
				])
			]),
			BS3.DOM.createElement('div', {class: 'form-group has-feedback'}, [
				BS3.DOM.createElement('div', {class: 'col-xs-offset-3 col-xs-9'}, [
					BS3.Button.info('Submit 2').attr({type: 'submit'})
				])
			])
		])
	]),
	document.getElementById('form2')
);

