# ==========================================================
# coffee-plugin.js.coffee v0.0.1
# http://templates.carlosborg.es/coffee-plugin.html
# TODO: Criar o endereço e armazenar meus plugins nele.
# ==========================================================
# Copyright 2012 Carlos Augusto Borges (calimaborges@gmail.com)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ========================================================== 

jQuery ($) ->

  # ========================================================== 
  # Class Definition
  # ========================================================== 
  class window.Camera
    constructor: (@element) ->
      window.URL = window.URL || window.webkitURL;
      navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia || navigator.msGetUserMedia;

      @canvasWidth = 640
      @canvasHeight = 480
      @displayWidth = 530
      @displayHeight = 398
      @topSpace = 65
      @leftSpace = 15
      @displayWidthString = "#{@displayWidth}px"
      @displayHeightString = "#{@displayHeight}px"
      @topSpaceString = "#{@topSpace}px"
      @leftSpaceString = "#{@leftSpace}px"

      @url = @element.attr('wprm-url')
      if (!@url)
        console.error('wprm-url not specified for Camera Widget!')

      @imgSrc = @element.attr('wprm-img-src')

    configure: ->
      @configure_video()
      @configure_canvas()
      @configure_img()
      @configure_spacer()
      @configure_countdown()
    
    configure_spacer: ->
      @divSpacer = $('<div>')
      @divSpacer.css('width', @displayWidthString)
      @divSpacer.css('height', @displayHeightString)

      @element.append @divSpacer

    configure_canvas: -> 
      @canvasElement = $('<canvas>').css('display', 'none')
      @canvasElement.css('border', '1px solid red')
      @canvasElement.get(0).width = @canvasWidth
      @canvasElement.get(0).height = @canvasHeight

      @element.append @canvasElement
      @ctx = @canvasElement.get(0).getContext('2d')
    
    configure_img: (src) -> 
      @imgElement.remove() if @imgElement
      if (!src) 
        return

      @imgElement = $ "<img>"
      @imgElement.css('position', 'absolute')
      @imgElement.css('top', @topSpaceString)
      @imgElement.css('left', @leftSpaceString)
      @imgElement.css('opacity', '0.3')
      @imgElement.css('width', @displayWidthString)
      @imgElement.css('height', @displayHeightString)
      @imgElement.attr('src', src)

      @element.append @imgElement
        

    configure_video: ->
      @videoElement = $ '<video autoplay>'
      @videoElement.css('position', 'absolute')
      @videoElement.css('top', @topSpaceString)
      @videoElement.css('left', @leftSpaceString)
      @videoElement.css('width', @displayWidthString)
      @videoElement.css('height', @displayHeightString)
      videoElement = @videoElement
      return if (!navigator.getUserMedia)
      navigator.getUserMedia({video:true}
        (localMediaStream) -> 
          videoElement.attr('src', window.URL.createObjectURL(localMediaStream))
        () ->
          console.log('User rejected.')
        @element.append @videoElement
      )

    configure_countdown: ->
      @countdownElement = $ '<div>'
      @countdownElement.css('color', 'white')
      @countdownElement.css('font-size', '200px')
      @countdownElement.css('position', 'absolute')
      @countdownElement.css('top', @topSpace + @displayHeight/2 + 'px')
      @countdownElement.css('left', @leftSpaceString)
      @countdownElement.css('width', @displayWidthString)
      @countdownElement.css('height', '10px')
      @countdownElement.css('text-align', 'center')
      @countdownElement.css('display', 'table-cell')
      @countdownElement.css('vertical-align', 'middle')
      @element.append @countdownElement

    start_countdown: ->
      that = @
      i = 3
      that.countdownElement.html(i--)
      timerId = setInterval -> 
          if (i == 0) 
            that.countdownElement.html(''); 
            clearInterval(timerId)
            return
          that.countdownElement.html(i--)
        , 1000

    take_snapshot: ->
      that = @
      @start_countdown()
      setTimeout () ->
          that.ctx.drawImage(that.videoElement.get(0), 0, 0)
          params = {
            foto: that.canvasElement.get(0).toDataURL('image/png'),
            attributes: that.element.get_attributes('json'),
            ajax_params: that.ajax_params
          }
          $.post(
            that.url
            params
          )
        , 3000

    set_ajax_params: (params) ->
      @ajax_params = params

    set_img_src: (src) ->
      @configure_img(src)

  # ========================================================== 
  # Plugin Definition
  # ========================================================== 
  $.fn.camera = (method, params) ->
    @each ->
      $this = $(@)
      data = $this.data('camera')
      $this.data 'camera', (data = new Camera($this)) if not data
      data[method](params)

  $.fn.camera.Constructor = Camera

  $('[wtype="camera"]').camera('configure')
  $('[wtype="camera-button"]').live "click", () -> $('[wtype="camera"]').camera('take_snapshot')