# Documentation

Please use the [existing Superfish documentation](http://users.tpg.com.au/j_birch/plugins/superfish/). **Please note:** As of Superfish v1.5.1 if you wish to use hoverIntent you will need to use a [patched version that supports event delegation](https://github.com/joeldbirch/onHoverIntent).

## Big bug fixes in v1.5.4
- The `useClick` feature now works reliably in all browsers, including all versions of IE (which was buggy in Superfish v1.5.3).
- Has always worked on iOS, but now fully supports **all Android browsers**. Kind of a big deal! Menus will behave like they do on iOS: first tap acts as hover (opens submenu), second tap follows link (unless using the new `useClick` option, in which case the second click closes the submenu). Keyboard and hover functionality works as normal. Thanks to everyone who helped me test and sent me down the right paths to solving this. @maartenmachiels, @wickynilliams, @Luoti, @malsup, @auntyfuzz.