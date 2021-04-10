jQuery(document).ready(function($) {

	var editor = $('[data-editor-primary-key-name$="_srl"]');
	if ( editor.length < 1 ) {
		return;
	}
	var matches = [], queries = {};
	var id, list, start;
	var regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

	// Take One Second for the Content Loading
	setTimeout(function() {
		editor = CKEDITOR.instances.editor1;
		
		editor.on('paste', function(e) {
			matches = e.data.dataValue.match(regExp);
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

			e.data.dataValue = 
				'<div class="youtube_converted">' +
					'<img src="https://img.youtube.com/vi/'+ id +'/mqdefault.jpg" />' +
					'<iframe src="https://www.youtube.com/embed/'+ id + list + start +'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
				'</div>' +
				'<p>&nbsp;</p>';
		});
	}, 1200);

});