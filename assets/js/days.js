'use strict';

import dom from "./dom.js";
import { elements } from './index.js';

// Tag Infos anzeigen
const days = {
    showInfo(obj) {
        elements.dayInfo.innerHTML = ''
    
        const info = dom.create({
          parent: elements.dayInfo,
          classes: ['day-info']
        });

        dom.create({
            parent: info,
            type: 'h3',
            content: `Tag ${obj.day}`
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