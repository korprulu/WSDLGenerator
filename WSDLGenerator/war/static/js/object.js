/**
 * Author: Kevin.C
 */

function Dialog() {

	this.content = "";

	var dialog = document.createElement('div');

	dialog.className = 'dialog';

	/* dialog content element */
	var c = document.createElement('div');
	c.className = 'content';
	dialog.appendChild(c);
	/* ++ */

	/* close image button */
	var closeImage = new Image();
	closeImage.src = '/static/images/close.gif';
	closeImage.style.position = 'absolute';
	closeImage.style.top = '5px';
	closeImage.style.right = '5px';
	closeImage.style.cursor = 'pointer';
	dialog.appendChild(closeImage);

	closeImage.addEventListener('click', function() {
		document.body.removeChild(dialog);
		window.location.href = '/';
	}, false);

	this.show = function() {

		c.innerHTML = this.content;
		document.body.appendChild(dialog);
	};
}

function FileObj(map) {

	var fileObj = document.createElement('div');
	fileObj.className = 'fileObj';
	fileObj.file = map.file;
	
	var deleteImg = new Image();
	deleteImg.src = '/static/images/delete.gif';
	fileObj.appendChild(deleteImg);

	deleteImg.addEventListener('click', function() {
		var p = fileObj.parentNode;
		p.parentNode.removeChild(p);
	}, false);
	
	var fileName = document.createElement('span');
	fileName.appendChild(document.createTextNode(fileObj.file.name));

	fileObj.appendChild(fileName);

	return fileObj;
}