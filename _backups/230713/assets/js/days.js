'use strict';

import dom from "./dom.js";
import { elements } from './index.js';

// Tag Infos anzeigen
const days = {
  showInfo(obj) {

    console.log(obj);

    const info = dom.create({
      parent: elements.calendarView,
      classes: ['day-info'],
      content: `Tag ${obj.day}`,
    });

    Object.values(obj.dayInfo).forEach(el => {
      dom.create({
        parent: info,
        type: 'p',
        content: el,
      });
    });

    const closeBtn = dom.create({
      parent: info,
      type: 'button',
      content: 'Close',
      listeners: { click: () => info.remove() },
    });
  },
}

export default days ;