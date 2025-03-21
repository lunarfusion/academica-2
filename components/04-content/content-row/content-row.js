(Drupal => {
	// find instances of the content row container
	let contentBackground = document.querySelectorAll('.content-row');

	contentBackground.forEach(function(content) {
		if (content.classList.contains('content-row--bg-blue')) {
			content.classList.add('drk-background');
		} else if (content.classList.contains('content-row--bg-purple')) {
			content.classList.add('drk-background');
		} else {
			// do nothing
		}
	});
})(Drupal);
