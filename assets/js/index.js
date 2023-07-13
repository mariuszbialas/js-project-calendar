'use strict';

import dom from './dom.js';
import calendar from './calendar.js';

// KONSTANTEN / VARIABLEN
export const elements = {};

// FUNKTIONEN
const domMapping = () => {
  elements.monthInfo = dom.sel('header');
  elements.left = dom.sel('#left');
  elements.right = dom.sel('#right');
  elements.main = dom.sel('main');
  elements.calendarView = dom.sel('#calendar');
  elements.dayInfo = dom.sel('#day-info');
};

const appendEventlisteners = () => {};

const init = () => {
  domMapping();
  appendEventlisteners();
  calendar.render();
};

// INIT
init();
