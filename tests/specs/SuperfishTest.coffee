$ = jQuery

describe "Superfish", ->

  $menu = null

  beforeEach ->
    $menu = $('ul.sf-menu').superfish()

  afterEach ->
    $menu.superfish 'destroy'


  it "should exist", ->
    expect($.fn.superfish).toBeDefined()

  it "should be chainable", ->
    expect($menu).toBe 'ul'

  it "should store options", ->
    expect($menu.data('sf-options')).toBeDefined()
  
  describe "options", ->
    
    it "should have default options", ->
      options = $menu.data('sf-options')
      expect(options.speed).toMatch 'normal'

    it "should allow default options to be overridden", ->
      $menu.superfish 'destroy'
      $menu.superfish
        speed: 1000
      options = $menu.data('sf-options')
      expect(options.speed).toEqual 1000


  describe "method access", ->

    $liHasUl = null

    beforeEach ->
      $liHasUl = $menu.find('li:has(ul):first')
    
    it "'show' method should exist", ->
      expect($liHasUl.superfish('show')).toBeDefined()
    
    it "'hide' method should exist", ->
      expect($liHasUl.superfish('hide')).toBeDefined()

    it "'destroy' method should exist", ->
      expect($liHasUl.superfish('destroy')).toBeDefined()

    it "should not allow access to private functions", ->
      expect( ->
        $menu.superfish('close')
      ).toThrow new Error('Method close does not exist on jQuery.fn.superfish')

    it "should not throw an error when accessing a valid method", ->
      expect( ->
        $liHasUl.superfish('show')
      ).not.toThrow new Error('Method show does not exist on jQuery.fn.superfish')


    describe "'destroy' method", ->

      it "should handle multiple calls gracefully", ->
        expect( ->
          $menu.superfish('destroy')
          $menu.superfish('destroy')
        ).not.toThrow new Error("Uncaught TypeError: Cannot read property 'sfTimer' of null")
      