((Drupal, once) => {
	// MOBILE MENU OPEN/CLOSE TOGGLE BUTTON
	// Create open/close toggle button
	const menuTrigger = document.getElementById('menu-toggle');

	// Add both click and focus keydown events - use mousedown to preventDefault focus indicator on click
	['mousedown', 'focus.keydown'].forEach(event => menuTrigger.addEventListener(event, showHideMenu));

	function showHideMenu(event) {
		// preventDefault so focus does not fire on click
		event.preventDefault();
		menuTrigger.classList.toggle('is-open');
		console.log('clicked');
	}
})(Drupal, once);
