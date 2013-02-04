# Documentation

Please use the [existing Superfish documentation](http://users.tpg.com.au/j_birch/plugins/superfish/).

**Important note:** As of Superfish v1.5.1 if you wish to use hoverIntent you will need to use a [patched version that supports event delegation](https://github.com/joeldbirch/onHoverIntent).

## Big new features in v1.5.2
- You can now require a click to open submenus, and click again to close them. Just set `useClick` option to `true` (is `false` by default).
- Support for animations when closing submenus. Added `animationOut` and `speedOut` options.
- Has always worked on iOS, but now supports Android and (possibly) other touch screens, too. Behaves like it does on iOS: first tap acts as hover and opens submenu, second follows link (unless using the new `useClick` option, in which case the second click closes the submenu). Keyboard and hover functionality works as normal. Thanks to [Maarten Machiels](https://github.com/maartenmachiels) for his valuable feedback on this.