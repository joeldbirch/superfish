# Documentation

Please use the [existing Superfish documentation](http://users.tpg.com.au/j_birch/plugins/superfish/).

**Important note:** As of Superfish v1.5.1 if you wish to use hoverIntent you will need to use a [patched version that supports event delegation](https://github.com/joeldbirch/onHoverIntent).

## Big new features in v1.5.2
- You can now require a click to open submenus, and click again to close them. Just set `useClick` option to `true` (is `false` by default).
- Support for animations when closing submenus. Added `animationOut` and `speedOut` options.
- Has always worked on iOS, but now also supports various Android browsers (see below) and (possibly) other touch screens, too. Behaves like it does on iOS: first tap acts as hover and opens submenu, second follows link (unless using the new `useClick` option, in which case the second click closes the submenu). Keyboard and hover functionality works as normal. Thanks to [Maarten Machiels](https://github.com/maartenmachiels) for his valuable feedback on this.

### Android browsers currently verified to work
Testing the diverse range of Android browsers is tricky. I have been able to verify that Superfish works correctly (ie. the submenus open on tap, rather than just following the top level links) in the following browsers, which may cover a fair majority of users. I will add to this list as I get access to more data.
- Default browser on v2.3.x Gingerbread
- Chrome on v4.0 Ice Cream Sandwich
- Chrome on v4.2 Jelly Bean (I believe Chrome is default on v4.2)

Superfish submenus do not seem to open consistently in the following Android browsers:
- Default browser on v4.0 and v4.1
- Firefox and Opera on Jelly Bean
