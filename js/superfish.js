
/*
 * Superfish v1.6.0 - jQuery menu widget
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
				var $$ = $(this), o = getOptions($$);
				clearTimeout( o.sfTimer );
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(e){
				var $$ = $(this),
					o = getOptions($$);

				var close = function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if ($$.parents('.'+o.hoverClass).length < 1){
						o.onIdle.call(getMenu($$));
						if (o.$path.length){
							$.proxy(over,o.$path,e)();
						}
					}
				};
				if (e.type === 'click' || sf.ios){
					close();
				} else {
					clearTimeout(o.sfTimer);
					o.sfTimer=setTimeout(close,o.delay);
				}
			},
			getMenu = function($el){
				return $el.closest('.'+c.menuClass);
			},
			getOptions = function($el) {
				return getMenu($el).data('sf-options');
			},
			applyTouchAction = function($menu){
       //needed by MS pointer events
				$menu.css('ms-touch-action','none');
			},
			applyHandlers = function($menu,o){
				var targets = 'li:has(ul)';
				if (!o.useClick){
					if ($.fn.hoverIntent && !o.disableHI){
						$menu.hoverIntent(over, out, targets);
					} else {
						$menu
							.on('mouseenter', targets, over)
							.on('mouseleave', targets, out);
					}
				}
				var touchstart = 'MSPointerDown';
				if ( !sf.ios ){
					touchstart += ' touchstart';
				}
				$menu
					.on('focusin', 'li', over)
					.on('focusout', 'li', out)
					.on('click', 'a', o, clickHandler)
					.on(touchstart, 'a', touchHandler);
			},
			touchHandler = function(e){
        var $$ = $(this),
          $ul = $$.siblings('ul');
        if ($ul.length > 0 && $ul.is(':hidden')){
          $$.data('follow', false);
          if (e.type === 'MSPointerDown'){
						$$.trigger('focus');
						return false;
					}
        }
      },
			clickHandler = function(e){
				var $a = $(this),
						o = e.data,
						$submenu = $a.siblings('ul'),
						follow = ($a.data('follow') === false) ? false : true;

				if ( $submenu.length && (o.useClick || !follow) ){
					e.preventDefault();
					if ($submenu.is(':hidden')){
						$.proxy(over,$a.parent('li'))();
					} else if (o.useClick && follow) {
						$.proxy(out,$a.parent('li'),e)();
					}
				}
			},
			setPathToCurrent = function($menu,o) {
				return $menu.find('li.'+o.pathClass).slice(0,o.pathLevels)
					.addClass(o.hoverClass+' '+c.bcClass)
						.filter(function(){
							return ($(this).children('ul').hide().show().length);
						}).removeClass(o.pathClass);
			},
			addArrows = function($li,o){
				if (o.autoArrows) {
					$li.children('a').each(function() {
						addArrow( $(this) );
					});
				}
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
		sf.getOptions = getOptions;

		return this.addClass(c.menuClass).each(function() {
			var $$ = $(this);
			var	o = $.extend({}, sf.defaults, op);
			var $liHasUl = $$.find('ul').parent();

			o.$path = setPathToCurrent($$,o);

			$$.data('sf-options',o);
			
			addArrows($liHasUl,o);
			applyTouchAction($$);
			applyHandlers($$,o);

			$liHasUl.not('.'+c.bcClass).children('ul').show().hide();
			
			o.onInit.call(this);
			
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};

	sf.c = {
		bcClass: 'sf-breadcrumb',
		menuClass: 'sf-js-enabled',
		anchorClass: 'sf-with-ul',
		arrowClass: 'sf-sub-indicator'
	};
	sf.defaults = {
		hoverClass: 'sfHover',
		pathClass: 'overideThisToUse',
		pathLevels: 1,
		delay: 800,
		animation: {opacity:'show'},
		animationOut: {opacity:'hide'},
		speed: 'normal',
		speedOut: 'fast',
		autoArrows: true,
		disableHI: false,		// true disables hoverIntent detection
		useClick: false,
		onInit: $.noop, // callback functions
		onBeforeShow: $.noop,
		onShow: $.noop,
		onBeforeHide: $.noop,
		onHide: $.noop,
		onIdle: $.noop
	};
	sf.ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
	$.fn.extend({
		hideSuperfishUl: function(){
			var $$ = this,
				o = sf.getOptions($$),
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $$.find('li.'+o.hoverClass).addBack().not(not).removeClass(o.hoverClass).children('ul');
				o.onBeforeHide.call($ul);
				$ul.stop(true,true).animate(o.animationOut,o.speedOut,function(){
					o.onHide.call($(this));
					if (o.useClick){
						$$.children('a').data('follow', false);
					}
				});
			return this;
		},
		showSuperfishUl: function(){
			var o = sf.getOptions(this),
				$$ = this.addClass(o.hoverClass),
				$ul = $$.children('ul');
			o.onBeforeShow.call($ul);
			$ul.stop(true,true).animate(o.animation,o.speed,function(){
				o.onShow.call($ul);
				$$.children('a').data('follow', true);
			});
			return this;
		}
	});

	if ( sf.ios ){
		//iOS click won't bubble to body, attach to closest possible
		$(function(){ $('body').children().on('click',$.noop); });
		$(window).on('pageshow', function(e) {
			//only way to reset subs after back button click. Seriously.
		  if (e.originalEvent.persisted) { window.location.reload(); }
		});
	}

})(jQuery);
