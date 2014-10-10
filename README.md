# jQuery Superfish Dropdown Menu Plugin

Our favourite aquatic superhero returns from his sojourn across the galaxy infused with astonishing, hitherto unseen new powers. In his modern incarnation (wearing a rather spiffy cape) Superfish is dedicated to keeping dropdown/flyout menus accessible across browsers great and small, in addition to adding support for newer touch devices (running Android, iOS, Windows, etc). All this **and** a pretty face.

## Documentation and Demos

Please use the [existing Superfish documentation](http://users.tpg.com.au/j_birch/plugins/superfish/) where you will find full explanations of the customisable features and plenty of examples to get you started.

## Download

###Important notes before you download:
- For your existing Superfish menus, you may prefer to stick with your earlier version unless you are prepared to alter your CSS to hide submenus using display:none rather than off-canvas (eg. top:-999em), otherwise you may lose closing animations (the submenus will be off-canvas while the animation happens). Also, the arrow CSS has changed completely to use pseudo-elements.
- As of Superfish v1.5.1 if you wish to enhance your menu with Brian Cherne's hoverIntent plugin (highly recommended) you will need to use [the latest version (r7) which now supports event delegation](https://github.com/briancherne/jquery-hoverIntent).
- Follow this link if you need an [easy solution to address a hoverIntent conflict with WordPress](https://github.com/joeldbirch/superfish/issues/14#issuecomment-14554500).

### Download [Superfish zip archive](https://github.com/joeldbirch/superfish/archive/master.zip)

## Recently added features

- v1.7.5: IE11 touch compatability.
- v1.7.3: You can now use Superfish to create mega-menus. CSS file and example page included. Regardless of whether mega-menus are evil, at least now they'll be touch-compatible.
- v1.7.2: "Fastclicks" for Android browsers and IE10 touch interactions.
- v1.7.1: Added basic tests (require "Testem" and CoffeeScript to run).
- v1.7: Full code restructure to use best-practice method access. Use `.superfish('show')` and `.superfish('hide')` instead of deprecated `showSuperfishUl()` and `hideSuperfishUl()` (which will be removed soon).
- v1.7: Added `destroy` method.
- v1.7: Replaced `autoArrows` feature with pure CSS arrows for easier customisation and performance (no image http request).
- v1.7: Removed `useClick` feature. See issue #47. The [Superclick](https://github.com/joeldbirch/superclick) project is a replacement.
- v1.6: Full CSS refactor for easier customisation. Supports unlimited levels of nested submenus.
- v1.6: Supersubs plugin replaced by a couple of lines of CSS. The width of each submenu will be determined by its widest child list item. To disable, just remove the `white-space` rule in the main CSS file.
- Full support for touch devices. Android browsers, iOS Safari, IE9 on Windows Phone 7, Windows 8 IE10+ with touchscreen. Touch to open submenus, touch again to follow the link. Be sure to include hoverIntent for widest support.

## Need help?

Superfish menus have been in use since the dawn of time (well, around 8 years or so) and many are the places where you can find help with your Superfish implementations. [Check out the support options](http://users.tpg.com.au/j_birch/plugins/superfish/download/#support).
