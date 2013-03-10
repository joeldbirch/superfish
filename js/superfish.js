
/*
 * Superfish v1.5.11 - jQuery menu widget
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 */

;(function($){
	$.fn.superfish = function(op){

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $('<span class="'+c.arrowClass+'"> &#187;</span>'),
			over = function(){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(e){
				var $$ = $(this), menu = getMenu($$), o = sf.op;

				var close = function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents('li.'+o.hoverClass).length<1){
						o.onIdle.call();
						$.proxy(over,o.$path,e)();
					}
				};
				if (e.type === 'click'){
					close();
				} else {
					clearTimeout(menu.sfTimer);
					menu.sfTimer=setTimeout(close,o.delay);
				}
			},
			getMenu = function($child){
				if ($child.hasClass(c.menuClass)){
					$.error('Superfish requires you to update to a version of hoverIntent that supports event-delegation, such as this one: https://github.com/joeldbirch/onHoverIntent');
				}
				var menu = $child.closest('.'+c.menuClass)[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			applyTouchAction = function($menu){
       //needed by MS pointer events
				$menu.css('ms-touch-action','none');
			},
			applyHandlers = function($menu){
				var targets = 'li:has(ul)';
				if (!sf.op.useClick){
					if ($.fn.hoverIntent && !sf.op.disableHI){
						$menu.hoverIntent(over, out, targets);
					} else {
						$menu
							.on('mouseenter', targets, over)
							.on('mouseleave', targets, out);
					}
				}
				var touchstart = 'MSPointerDown';
				//Sorry, but avoiding weird glitches with touchstart. iOS doesn't need it, anyway.
				if ( !navigator.userAgent.match(/iPhone/i) && !navigator.userAgent.match(/iPad/i) ){
					touchstart += ' touchstart';
				}
				$menu
					.on('focusin', 'li', over)
					.on('focusout', 'li', out)
					.on('click', 'a', clickHandler)
					.on(touchstart, 'a', touchHandler);
			},
			touchHandler = function(e){
        var $$ = $(this),
          $ul = $$.siblings('ul');
        if ($ul.length > 0 && !$ul.is(':visible')){
          $$.data('follow', false);
          if (e.type === 'MSPointerDown'){
						$$.trigger('focus');
						return false;
					}
        }
      },
			clickHandler = function(e){
				var $a = $(this),
						$submenu = $a.siblings('ul'),
						follow = ($a.data('follow') === false) ? false : true;

				if ( $submenu.length && (sf.op.useClick || !follow) ){
					e.preventDefault();
					if (!$submenu.is(':visible')){
						$.proxy(over,$a.parent('li'))();
					} else if (sf.op.useClick && follow) {
						$.proxy(out,$a.parent('li'),e)();
					}
				}
			},
			addArrows = function($li,o){
				if (o.autoArrows) {
					$li.children('a').each(function() {
						addArrow( $(this) );
					});
				}
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
		return this.addClass(c.menuClass).each(function() {
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			var $$ = $(this);
			var $liHasUl = $$.find('li:has(ul)');
			o.$path = $$.find('li.'+o.pathClass).slice(0,o.pathLevels).each(function(){
				$(this).addClass(o.hoverClass+' '+c.bcClass)
					.filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;
			
			addArrows($liHasUl,o);
			applyTouchAction($$);
			applyHandlers($$);

			$liHasUl.not('.'+c.bcClass).hideSuperfishUl();
			
			o.onInit.call(this);
			
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};

	sf.c = {
		bcClass     : 'sf-breadcrumb',
		menuClass   : 'sf-js-enabled',
		anchorClass : 'sf-with-ul',
		arrowClass  : 'sf-sub-indicator'
	};
	sf.defaults = {
		hoverClass	: 'sfHover',
		pathClass	: 'overideThisToUse',
		pathLevels	: 1,
		delay		: 800,
		animation	: {opacity:'show'},
		animationOut: {opacity:'hide'},
		speed		: 'normal',
		speedOut : 'fast',
		autoArrows	: true,
		disableHI	: false,		// true disables hoverIntent detection
		useClick : false,
		onInit		: function(){}, // callback functions
		onBeforeShow: function(){},
		onShow		: function(){},
		onHide		: function(){},
		onBeforeHide: function(){},
		onIdle		: function(){}
	};
	$.fn.extend({
		hideSuperfishUl : function(){
			var o = sf.op,
				$$ = this,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $('li.'+o.hoverClass,this).add(this).not(not)
					.find('>ul');
			o.onBeforeHide.call($ul);
			$ul.stop().animate(o.animationOut,o.speedOut,function(){
						$ul = $(this);
						$ul.parent().removeClass(o.hoverClass);
						o.onHide.call($ul);
						if (sf.op.useClick){
							$$.children('a').data('follow', false);
						}
					});
			return this;
		},
		showSuperfishUl : function(){
			var o = sf.op,
				$$ = this,
				$ul = this.find('>ul:hidden');
				$ul.parent('li').addClass(o.hoverClass);
			o.onBeforeShow.call($ul);
			$ul.stop().animate(o.animation,o.speed,function(){
				o.onShow.call($ul);
				$$.children('a').data('follow', true);
			});
			return this;
		}
	});

})(jQuery);
