jQuery(document).ready(function($) {

	var editor = $('[data-editor-primary-key-name$="_srl"]');
	if ( editor.length < 1 ) {
		return;
	}
	var matches = [], queries = {};
	var id, list, start;
	var clipboardData, pastedData, html;
	var regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

	editor.on('froalaEditor.paste.before', function (e, editor, original_event) {
		if ( !original_event.clipboardData ) {
			return;
		}

		clipboardData = original_event.clipboardData;
		pastedData = clipboardData.getData('text');

		matches = pastedData.match(regExp);
		if ( !matches || matches[5] === 'channel' || (matches[5] !== 'watch' && matches[5].length !== 11) ) {
			return;
		}

		id = matches[5];
		queries = window.XE.URI(matches[0].replace(/amp\;/g, '')).search(true);
		list = queries.list ? '?list=' + queries.list : '';
		start = queries.t ? '?start=' + queries.t : '';
		
		if ( matches[5] === 'watch' ) {
			id = queries.v;
		}

		html = 
			'<p>' +
				'<span class="fr-video fr-fvc fr-dvb fr-draggable" contenteditable="false" draggable="true">' +
					'<iframe width="640" height="360" src="https://www.youtube.com/embed/'+ id + list + start +'" frameborder="0" allowfullscreen="" class="fr-draggable"></iframe>' +
				'</span>' +
			'</p>' +
			'<p><br></p>';
		editor.html.insert(html);
		return false;
	});

});