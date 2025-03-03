((Drupal, once) => {
	const menuTriggerClose = document.getElementById('menu-toggle-close');

	// Add both click and focus keydown events - use mousedown to preventDefault focus indicator on click
	['mousedown', 'focus.keydown'].forEach(event => menuTriggerClose.addEventListener(event, showHideMenu));

	function showHideMenu(event) {
		// preventDefault so focus does not fire on click
		event.preventDefault();

		// Search-open removes the closed transform from the form it contains
		// mainMenu.classList.toggle('menu-opened');
		mainMenu.classList.toggle('menu-closed');

		this.classList.toggle('is-closed');

		alert('closer clicked');

		// aria-expanded switch
		// get the aria-expanded state of the toggler and if it's true, make it false
		if (mainMenu.getAttribute('aria-expanded') === 'true') {
			mainMenu.setAttribute('aria-expanded', 'false');
		} else {
			// otherwise if it's false, make it true
			mainMenu.setAttribute('aria-expanded', 'true');
		}
	}
})(Drupal, once);
