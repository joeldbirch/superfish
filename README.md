# jQuery Superfish Dropdown Menu Plugin

Our favourite aquatic superhero returns from his sojourn across the galaxy infused with astonishing, hitherto unseen new powers. In his modern incarnation (wearing a rather spiffy cape) Superfish is dedicated to keeping dropdown/flyout menus accessible across browsers great and small, in addition to adding support for newer touch devices (running Android, iOS, Windows, etc). All this **and** a pretty face.

## Documentation and Demos

Please use the [existing Superfish documentation](http://users.tpg.com.au/j_birch/plugins/superfish/) where you will find full explanations of the customisable features and plenty of examples to get you started.

## Download

###Important notes before you download:
- For your existing Superfish menus, you may prefer to stick with v1.5.13 unless you are prepared to alter your CSS to hide submenus using display:none rather than off-canvas (eg. top:-999em), otherwise you may lose closing animations (the submenus will be off-canvas while the animation happens).
- As of Superfish v1.5.1 if you wish to enhance your menu with Brian Cherne's hoverIntent plugin (highly recommended) you will need to use [the latest version (r7) which now supports event delegation](https://github.com/briancherne/jquery-hoverIntent).
- Follow this link if you need an [easy solution to address a hoverIntent conflict with WordPress](https://github.com/joeldbirch/superfish/issues/14#issuecomment-14554500).

### Download [Superfish zip archive](https://github.com/joeldbirch/superfish/archive/master.zip)

## Recently added features

- Full CSS refactor for easier customisation. Supports unlimited levels of nested submenus.
- Full support for touch devices. Android browsers, iOS Safari, IE9 on Windows Phone 7, Windows 8 IE10 with touchscreen. Touch to open submenus, touch again to follow the link. Be sure to include hoverIntent for widest support.
- iOS Safari submenus can now be closed and its pesky hover state is now properly reset after using the browser's "back" button.
- Supersubs plugin replaced by a couple of lines of CSS. The width of each submenu will be determined by its widest child list item. To disable, just remove the `white-space` rule in the main CSS file.