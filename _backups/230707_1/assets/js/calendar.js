'use strict';

import dom from './dom.js';
import { elements } from './index.js';

// Render Monat Ansicht
const calendar = {

  date(year, month) {
    let date = new Date();
    if (year && month) date = new Date(year, month - 1);
    const currentDay = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    return { date, currentDay, currentMonth, currentYear}
  },

  render(year, month) {
    elements.monthInfo.innerHTML = '';
    elements.calendarView.innerHTML = '';

    const { date, currentDay, currentMonth, currentYear } = this.date();
    console.log(currentDay, currentMonth, currentYear );
    // year = 2022, month = 1;
    // let date = new Date();
    // if (year && month) date = new Date(year, month - 1);
    // console.log('date: ' + date);
    // const currentDay = date.getDate();
    // const currentMonth = date.getMonth();
    // const currentYear = date.getFullYear();

    // TODO:
    // console.log('day: ' + currentDay);
    // console.log('month:'+currentMonth);

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

    //   const body = document.body;
    //   body.style.backgroundImage = `url(images/${currentMonth + 1}.jpg)`;

    // Render Tag ANsicht
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDayOfMonth - 1; i++) {
      const emptyDay = dom.create({
        parent: elements.calendarView,
        classes: ['day', 'hide'],
      });
    }

    for (let i = 1; i < daysInMonth + 1; i++) {
      // Markiert wird den heutigen Tag
      const today = currentDay === i ? 'today' : '';
      // Alle Sonntags markieren

      const day = dom.create({
        parent: elements.calendarView,
        classes: ['day', today],
        content: i,
        listeners: { click: () => this.showDayInfo(i) },
      });
    }

    console.log('now: ' + currentYear, currentMonth, currentDay);
  },
  // Tag Infos anzeigen
  showDayInfo(day) {
    const info = dom.create({
      parent: elements.calendarView,
      classes: ['day-info'],
      content: `Tag ${day}`,
    });

    const closeBtn = dom.create({
      parent: info,
      type: 'button',
      content: 'Close',
      listeners: { click: () => info.remove() },
    });
  },
  // Monat ändern
  changeMonth(year, month, action) {

    console.log(action + ': ' + year, month, );

    if (action === 1) {
      if (month > 11) this.render(year + action, 1);
    } else if (action === -1) {
        if (month < 1) this.render(year + action, month);
    } else this.render(year, month  + action);
  },
};

export default calendar;
