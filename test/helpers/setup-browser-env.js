'use strict';

global.document = require('jsdom').jsdom('<div id="apenasUmShow">Apenas um show</div><div id="ulala" data-lagden-tip="Awesome!">Tip</div>');
global.window = document.defaultView;
global.HTMLElement = window.HTMLElement;
global.navigator = window.navigator;
