'use strict';

import dom from './dom.js';
import months from './months.js';
import ajax from './ajax.js';
import { elements } from './index.js';

// Render Monat Ansicht
const calendar = {
  render(year, month) {
    elements.monthInfo.innerHTML = '';
    elements.calendarView.innerHTML = '';

    let date = new Date();
    if (year && (month != '' || month === 0)) date = new Date(year, month);

    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    // Render Monat&Jahr Ansicht
    dom.create({
      parent: elements.monthInfo,
      type: 'span',
      content: '<<',
      classes: ['arrow'],
      listeners: {
        click: () => this.changeMonth(currentYear, currentMonth, -1),
      },
    });

    const dateTxt = date.toLocaleDateString('de-DE', {
      month: 'long',
      year: 'numeric',
    });
    dom.create({
      parent: elements.monthInfo,
      type: 'h1',
      content: dateTxt,
    });

    dom.create({
      parent: elements.monthInfo,
      type: 'span',
      content: '>>',
      classes: ['arrow'],
      listeners: {
        click: () => this.changeMonth(currentYear, currentMonth, 1),
      },
    });

    // Hintergrund dynamisch aktualisiert
    const body = document.body;
    body.style.backgroundImage = `url(../assets/img/${currentMonth}.png)`;

    ajax.fetchData().then((data) => {
      months.render(data, currentYear, currentMonth);
    });
  },

  // Monat ändern
  changeMonth(year, month, action) {
    if (action === -1) {
      month--;
    } else if (action === 1) {
      month++;
    }
    this.render(year, month);
  },
};

export default calendar;
