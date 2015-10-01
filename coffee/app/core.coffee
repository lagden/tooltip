'use strict'

define [
  'templates/sample'
  'component/jquery-tooltip'
], (template) ->

  $info = $ '#info'
  $info[0].insertAdjacentHTML 'afterbegin', template
    name: navigator.appName
    version: navigator.appVersion

  $info.theTooltip
    content: '''
      <h3>Title</h3>
      <p>Some pretty cool stuff!</p>
    '''
    html: true

  $tips = $ '.tips'
  $tips.theTooltip()

  return
