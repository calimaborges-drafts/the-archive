# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

jQuery ($) ->
  $('[wtype="camera-ajax-params"]').live "click", () -> $('[wtype="camera"]').camera('set_ajax_params', $(@).get_attributes('json'))
  $('[wtype="camera-ajax-params"]').live "click", () -> $('[wtype="camera"]').camera('set_img_src', $(@).attr('wprm-img-src'))