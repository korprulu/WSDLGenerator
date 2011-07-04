function loadstart(ev) {

	var mask = document.createElement('div');
	var div = document.createElement('div');
	var percent = document.createElement('div');
	var loaderImage = new Image();

	mask.id = 'mask';
	mask.className = 'mask';

	loaderImage.src = '/static/images/ajax-loader.gif';
	loaderImage.style.verticalAlign = 'middle';
	loaderImage.style.display = 'inline-block';
	// loaderImage.style.top = (document.documentElement.clientHeight -
	// loaderImage.height)
	// / 2 + 'px';
	// loaderImage.style.left = (document.documentElement.clientWidth -
	// loaderImage.width)
	// / 2 + 'px';

	div.id = 'loaderImage';
	div.className = 'loaderImage';

	percent.id = 'percent';
	percent.style.display = 'block';
	percent.style.marginTop = '5px';
	percent.style.fontSize = '0.9em';
	percent.innerHTML = 'Loading...';

	document.body.appendChild(mask);

	div.appendChild(loaderImage);
	div.appendChild(percent);
	document.body.appendChild(div);
}

function build(files, boundary) {

	var dashdash = '--';
	boundary = 'fdsfwefFDSF';
	var crlf = '\r\n';

	var builder = '';

	builder += 'content-disposition: form-data';
	builder += crlf;
	builder += 'Content-Type: application/octet-stream, boundary=' + boundary;
	builder += crlf;

	var len = files.length;
	for ( var i = 0; i < len; i++) {

		builder += dashdash;
		builder += boundary;
		builder += crlf;

		var file = files[i];
		/* Generate headers. */
		builder += 'Content-Disposition: form-data; name="file"';
		if (file.fileName) {
			builder += '; filename="' + file.fileName + '"';
		}
		builder += crlf;

		builder += 'Content-Type: application/octet-stream';
		builder += crlf;
		builder += crlf;

		/* Append binary data. */
		builder += file.getAsBinary();
		builder += crlf;

	}

	/* Mark end of the request. */
	builder += dashdash;
	builder += boundary;
	builder += dashdash;
	builder += crlf;

	return builder;
}

function timeout(time) {

	var to = document.getElementById('timeout');

	to.innerHTML = Math.floor(time / 60000) + ' minute <span class="second">'
			+ (time % 60000) / 1000 + '</span> second remaining';

	var second_clone = to.getElementsByTagName('span')[0].cloneNode(true);
	second_clone.style.fontSize = '20px';

	if (time > 0)
		setTimeout('timeout(' + (time - 1000) + ')', 1000);
	else {
		document.getElementById('content').innerHTML = 'Sorry, It\'s timeout.';
	}
}

var upload = function(ev) {
	
	hideTipword();
	
	var xmlhttp = new XMLHttpRequest();
	var url = 'Upload';

	var boundary = 'fdsfwefFDSF';
	xmlhttp.open('POST', url, true);
	xmlhttp.setRequestHeader('Content-type', 'multipart/form-data; boundary='
			+ boundary);

	xmlhttp.upload.addEventListener('loadstart', loadstart, false);

	// xmlhttp.upload.addEventListener('load', function(ev) {
	// progress(100, progress_inner, total_width);
	// }, false);

	xmlhttp.addEventListener('readystatechange', function(ev) {
		if (xmlhttp.readyState == 4 & xmlhttp.status == 200) {
			
			var dialog = new Dialog();
			var resptxt = xmlhttp.responseText.split(',');

			dialog.content = 'Spending ' + resptxt[0]
					+ ' second.<br /><a href="/Download?' + resptxt[1]
					+ '">Download</a><br/>';
			
			
			document.body.removeChild(document.getElementById('loaderImage'));

			dialog.open(function() {
				window.location.href = '/';
			});
		}
		// showDialog(xmlhttp.responseText.split(','));
	}, false);
		
	if(ev.type == 'change')
		xmlhttp.sendAsBinary(build(ev.currentTarget.files, boundary));
	else if(ev.type == 'drop') {
		cancel(ev);
		xmlhttp.sendAsBinary(build(ev.dataTransfer.files, boundary));
	}
};

function hideTipword() {
	document.getElementById('tipword').style.visibility = 'hidden';
}

function cancel(e) {
	if (e.preventDefault) e.preventDefault(); // required by FF + Safari
	e.dataTransfer.dropEffect = 'copy'; // tells the browser what drop effect is allowed here
	return false; // required by IE
} 

window.onload = (function(e) {
	
	var buttomLayer = document.getElementById('buttomLayer');
	var fileInput = document.getElementById('file');
	
	buttomLayer.addEventListener('dragover', cancel, false);
	buttomLayer.addEventListener('dragenter', cancel, false);
	
	buttomLayer.addEventListener('click', function(){
		fileInput.click();
	}, false);
	
	buttomLayer.addEventListener('drop', upload, false);
	
	fileInput.addEventListener('change', upload, false);
	
	// document.getElementById('showDialog').addEventListener('click',
	// function() {
	// var dialog = new Dialog();
	// dialog.content = 'hello';
	// dialog.show();
	// }, false);
});