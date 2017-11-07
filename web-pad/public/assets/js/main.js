$(function() {
	var token = null;

	var codeMirror = CodeMirror(document.body, {
	  keyMap: "sublime",
	  lineNumbers: true
	});
	codeMirror.setOption('fullScreen', true);
	
	var readonly = function(bol) {
		var visibility = bol ? "visible" : "hidden";
		var value = bol ? "nocursor" : false;
		if (codeMirror.getOption('readOnly') != value) {
			codeMirror.setOption('readOnly',value);
		}
		$("#readonly").css('visibility', visibility);
	}
	readonly(true);

	var load = function() {
		if (!codeMirror.getOption('readOnly')) return;

		NProgress.start();
		$.get('/load').done(function(data) {
			NProgress.done();			
			codeMirror.setValue(data);
		});
	};

	var save = function() {
		if (codeMirror.getOption('readOnly')) return;

		NProgress.start();
		$.post('/save', {text: codeMirror.getValue()}).done(function(data) {
			NProgress.done();
			load();
		});
	};

	var status = function() {
		$.post('/status', {token: token}).done(function(data) {
			token = data.token;

			if (data.status == 'w') {
				readonly(false);
			} else {
				readonly(true);
			}
		});	
	};

	load();
	setInterval(save, 5000);
	setInterval(load, 2000);
	setInterval(status, 1000);
});
