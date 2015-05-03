import $ from 'jquery';
import Tooltip from './tooltip';

let pluginName = 'theTooltip';

function Plugin(option = {}) {
  let namespace = `lagden.${pluginName}`;
  return this.each(function(){
    let instance = $.data(this, namespace);
    if (instance) {
      if (typeof option === 'string' && /destroy/.test(option)) {
        $.removeData(this, namespace);
        instance[option]();
        instance = null;
      }
    } else if (typeof option !== 'string') {
      instance = new Tooltip(this, option);
      $.data(this, namespace, instance);
    }
  });
}

let old = $.fn[pluginName];

$.fn[pluginName] = Plugin;
$.fn[pluginName].Constructor = Tooltip;

$.fn[pluginName].noConflict = function () {
  $.fn[pluginName] = old;
  return this;
};
