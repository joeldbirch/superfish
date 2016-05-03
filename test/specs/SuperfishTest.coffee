$ = jQuery

describe "Superfish", ->

  $menu = null
  $li_with_sub = null

  beforeEach ->
    $menu = $('ul.sf-menu')
    $li_with_sub = $menu.find('li:has(ul):first')
    $menu.superfish()
  
  afterEach ->
    $menu.superfish('destroy')

  it "should exist", ->
    expect($.fn.superfish).toBeDefined()

  it "should be chainable", ->
    $menu.superfish('destroy')
    expect($menu.superfish()).toBeMatchedBy 'ul'

  it "should store options", ->
    expect($menu.data('sfOptions') ).toBeDefined()


  describe "options", ->

    it "should have default options", ->
      options = $menu.data('sfOptions')
      expect(options.speed).toMatch 'normal'

    it "should allow default options to be overridden", ->
      $menu.superfish('destroy')
      $menu.superfish
        speed: 1000
      options = $menu.data('sfOptions')
      expect(options.speed).toEqual 1000


  describe "method access", ->

    it "'show' method should exist", ->
      expect($li_with_sub.superfish('show')).toBeDefined()

    it "'hide' method should exist", ->
      expect($li_with_sub.superfish('hide')).toBeDefined()

    it "'destroy' method should exist", ->
      expect($menu.superfish('destroy')).toBeDefined()
      $menu.superfish()

    it "should not allow access to private functions", ->
      expect( ->
        $menu.superfish('close')
      ).toThrow new Error('Method close does not exist on jQuery.fn.superfish')

    it "should not throw an error when accessing a valid method", ->
      expect( ->
        $li_with_sub.superfish('show')
      ).not.toThrow new Error('Method show does not exist on jQuery.fn.superfish')


  describe "'destroy' method", ->

    it "should handle multiple calls gracefully", ->
      $menu.superfish('destroy')
      expect( ->
        $menu.superfish('destroy')
      ).not.toThrow new Error("Uncaught TypeError: Cannot read property 'sfTimer' of null")
      expect($menu.superfish('destroy')).toBeMatchedBy 'ul'


  describe "'show' method", ->
    it "should fail silently if Superfish is uninitialised", ->
      $menu.superfish('destroy')
      expect( $li_with_sub.superfish('show') ).toBeMatchedBy 'li'

    it "should cause child ul to be visible", ->
      $submenu = $li_with_sub.children('ul')
      expect($submenu).toBeHidden()
      expect($li_with_sub).not.toBeMatchedBy '.sfHover'
      $li_with_sub.superfish('show')
      expect($submenu).toBeVisible()
      expect($li_with_sub).toBeMatchedBy '.sfHover'


  describe "'hide' method", ->
    it "should fail silently if Superfish is uninitialised", ->
      $menu.superfish('destroy')
      expect( $li_with_sub.superfish('hide') ).toBeMatchedBy 'li'
      
    it "should cause child ul to be hidden", ->
      $submenu = $li_with_sub.children('ul')
      $li_with_sub.superfish('show')
      expect($li_with_sub).toBeMatchedBy '.sfHover'
      expect($submenu).toBeVisible()
      # do an instant hide for now until I figure out why .toBeHidden fails when animated
      $li_with_sub.superfish('hide', true)
      expect($submenu).toBeHidden()
      expect($li_with_sub).not.toBeMatchedBy '.sfHover'


  describe "initialisation", ->
    it "should fail silently if already initialised", ->
      $menu.superfish('destroy')
      init_count = 0
      $.fn.superfish.defaults.onInit = -> init_count++
      $menu.superfish().superfish()
      expect(init_count).toEqual 1
      $.fn.superfish.defaults.onInit = $.noop

    it "should not remove sf-arrows class if already present in markup", ->
      $menu.superfish('destroy')
      $menu.addClass('sf-arrows')
      $menu.superfish()
      expect($('.sf-arrows').length).toEqual 1

    it "should be able to store the path to the 'current' menu item (pathClass)", ->
      expect($menu.data('sfOptions').$path.length).toEqual 0
      $menu.superfish('destroy')
      $menu.superfish
        pathClass: 'current'
      expect($menu.data('sfOptions').$path.length).toEqual 1


  describe "pathClass feature", ->
    it "should show 'current' submenu", ->
      $menu.superfish('destroy')
      $menu.superfish
        pathClass: 'current'
      expect($li_with_sub).toBeMatchedBy '.sfHover'


  describe "callbacks", ->

    describe "onDestroy", ->
      it "should fire", ->
        destroy_count = 0
        $menu.superfish('destroy')
        $menu.superfish
          onDestroy: -> destroy_count++
        $menu.superfish('destroy')
        expect(destroy_count).toEqual 1
