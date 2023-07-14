'use strict';

import dom from "./dom.js";
import { elements } from './index.js';

// Tag Infos anzeigen
const days = {
    showInfo(day, names) {
        elements.dayInfo.innerHTML = ''
    
        const info = dom.create({
          parent: elements.dayInfo,
          classes: ['day-info']
        });

        dom.create({
            parent: info,
            type: 'h3',
            content: `Tag ${day}`,
            classes: ['title']
        });
        
        Object.values(names).forEach(item => {
            if(item)
                dom.create({
                    parent: info,
                    type: 'p',
                    content: item
                });
        });
    
        const closeBtn = dom.create({
          parent: info,
          type: 'button',
          content: 'Schließen',
          listeners: { click: () => info.remove() },
        });
      },
  
}

export default days ;