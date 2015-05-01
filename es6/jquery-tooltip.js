import $ from 'jquery';
import Tooltip from './tooltip';

$.fn.theTooltip = function(options) {
  this.each(function() {
    if (!$.data(this, 'Tooltip')) {
      $.data(this, 'Tooltip', new Tooltip(this, options));
    }
  });
};
