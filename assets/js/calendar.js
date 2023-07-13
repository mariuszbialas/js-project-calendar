'use strict';

import dom from './dom.js';
import months from './months.js';
import ajax from './ajax.js';
import { elements } from './index.js';

// Render Monat Ansicht
const calendar = {
  createArrowsBtn(content, year, month, number) {
    dom.create({
      parent: elements.monthInfo,
      type: 'span',
      content,
      classes: ['arrow'],
      listeners: {
        click: () => this.changeMonth(year, month, number),
      },
    });
  },

  render(year, month) {
    elements.monthInfo.innerHTML = '';
    elements.calendarView.innerHTML = '';

    // Datum zum Kalender rendern rechnen
    let date = new Date();
    if (year && (month != '' || month === 0)) date = new Date(year, month);
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    // Datum in detsche umwandeln
    const monthTxt = date.toLocaleDateString('de-DE', {
      month: 'long',
    });

    // Render Pfeile und Monat/Jahr Info
    calendar.createArrowsBtn('<<', currentYear, currentMonth, -1);
    dom.create({
      parent: elements.monthInfo,
      type: 'h1',
      content: monthTxt + ' ' + currentYear,
      listeners: { click: () => calendar.render() },
      attr: { title: 'zum laufenden Monat' },
    });
    calendar.createArrowsBtn('>>', currentYear, currentMonth, 1);

    // Hintergrund dynamisch aktualisiert
    const body = document.body;
    body.style.backgroundImage = `url(../assets/img/${currentMonth}.png)`;

    // Render Monatsausicht
    ajax.fetchData().then((data) => {
      const monthData = data.months[monthTxt];

      if(data.years[currentYear]) {
        const yearData = data.years[currentYear].filter(
          (item) => item.month === 4
        );

        months.render(
          {
            year: currentYear,
            month: currentMonth + 1,
            ...yearData,
          },
          {
            month: currentMonth + 1,
            ...monthData,
          }
        );
        
      } else {
        months.render(
          {
            year: currentYear,
            month: currentMonth + 1
          },
          {
            month: currentMonth + 1,
            ...monthData,
          }
        );
      }
    });
  },

  // Monat ändern und Kalendar neu erzaügen
  changeMonth(year, month, action) {
    if (action === -1) {
      month--;
    } else if (action === 1) {
      month++;
    }
    calendar.render(year, month);
  },
};

export default calendar;
