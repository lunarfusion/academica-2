((Drupal, once) => {
	// SUBMENU TOGGLE ICONS
	// Add a has-children class to menu-items with submenus
	// find the child menu-wrapper
	const submenuWrappers = document.querySelectorAll('.nav__item .nav__subnav-wrapper');

	// Detect if has children
	submenuWrappers.forEach(function(wrapper) {
		// collase all by default
		wrapper.parentNode.classList.add('nav__item--collapsed');
		wrapper.parentNode.classList.remove('nav__item--expanded');
	});

	// SUBMENU TOGGLE FUNCTION
	// Toggle - Find the span within expanded or collapsed menu items
	// do not use the menu item, as the click area will be too large
	const menuItemDropdownToggles = document.querySelectorAll('.nav__item--has-children.nav__item--level-0 > .nav__link');

	// TOGGLE ATTRIBUTES - find each toggle object
	menuItemDropdownToggles.forEach(function(dropdownToggle) {
		// Make span into button
		dropdownToggle.setAttribute('aria-expanded', 'false');
		dropdownToggle.setAttribute('aria-haspopup', 'true');
		dropdownToggle.setAttribute('tabindex', '0');
		dropdownToggle.setAttribute('type', 'button');
		dropdownToggle.setAttribute('target', 'self');
		dropdownToggle.setAttribute('aria-label', 'toggle submenu');

		// prevent link from working when it should be a dropdown trigger
		// fallback for when Drupal menu item is not configured as nolink or button
		dropdownToggle.setAttribute('onclick', 'return false;');

		// Create parent menu item to toggle expanded/collapsed
		const dropdownMenuItemParent = dropdownToggle.parentNode;

		// Find submenu under dropdown
		var anySubMenu = dropdownMenuItemParent.querySelector('.nav');

		// hide submenu by default
		anySubMenu.setAttribute('aria-hidden', 'true');

		// hidden links not focusable by default
		let unfocusableLinks = document.querySelectorAll('.nav__item .nav__subnav-wrapper .nav a');
		unfocusableLinks.forEach(function(link) {
			link.setAttribute('tabindex', '-1');
		});

		// TOGGLE ACTIONS - Add both click and focus keydown events
		['mousedown', 'focus.keydown'].forEach(event => dropdownToggle.addEventListener(event, showHideDropdown));

		// Toggle click/keydown event
		function showHideDropdown(event) {
			event.preventDefault();
			console.log('dropdown clicked');

			// Find the current nav element
			thisParentNav = dropdownToggle.closest('nav');

			// ALL DROPDOWNS = close
			let allMenuItems = thisParentNav.querySelectorAll('.nav > .nav__item--has-children');
			// collapse all the other dropdowns
			allMenuItems.forEach(function(menuItem) {
				menuItem.classList.remove('nav__item--expanded');
				menuItem.classList.add('nav__item--collapsed');
				//anyOtherSubMenu.setAttribute("aria-hidden", "true");
			});

			// ALL DROPDOWNS = aria-expanded = false
			let allDropdownTriggers = thisParentNav.querySelectorAll('.nav__item--has-children > button');
			allDropdownTriggers.forEach(function(dropdownTrigger) {
				dropdownTrigger.setAttribute('aria-expanded', 'false');
			});

			// ALL DROPDOWNS = aria-hidden = true
			let allSubmenus = thisParentNav.querySelectorAll('.nav__item .nav__subnav-wrapper .nav');
			allSubmenus.forEach(function(subMenu) {
				subMenu.setAttribute('aria-hidden', 'true');
			});

			// THIS DROPDOWN - Expand this dropdown's parent nav item
			dropdownMenuItemParent.classList.add('nav__item--expanded');
			dropdownMenuItemParent.classList.remove('nav__item--collapsed');

			// THIS DROPDOWN - toggle aria expanded
			if (dropdownToggle.getAttribute('aria-expanded') === 'false') {
				dropdownToggle.setAttribute('aria-expanded', 'true');
				// don't let focus fire on active
				dropdownToggle.blur();
			} else {
				dropdownToggle.setAttribute('aria-expanded', 'false');
			}

			// THIS DROPDOWN - unhide submenu
			let currentSubMenu = dropdownMenuItemParent.querySelector('.nav');

			// Make submenu unhidden
			if (currentSubMenu.getAttribute('aria-hidden') === 'true') {
				currentSubMenu.setAttribute('aria-hidden', 'false');
			} else {
				// otherwise if it's false, make it true
				currentSubMenu.setAttribute('aria-hidden', 'true');
			}

			// THIS DROPDOWN - links become focusable
			let focusableLinks = dropdownMenuItemParent.querySelectorAll('.nav a');
			focusableLinks.forEach(function(link) {
				link.setAttribute('tabindex', '0');
			});
		}
		// end showHideDropdown function

		// WIP WIP WIP CLOSE ALL ON CLICK OF ANYTHING
		// Need to add keyboard version, close dropdowns when focus leaves menu item
		// Main Menu Only - Close all dropdowns when main content is clicked
		var menuItems = document.querySelectorAll('.nav--main .nav__item');

		document.getElementById('main-content').addEventListener('mousedown', function(event) {
			console.log('clicked');
			event.preventDefault();

			// close all dropdown menus
			menuItems.forEach(item => {
				item.classList.remove('nav__item--expanded');
				item.classList.add('nav__item--collapsed');
				item.setAttribute('aria-expanded', 'false');
			});
		});
	});
})(Drupal, once);
