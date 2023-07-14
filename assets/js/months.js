'use strict';
import days from './days.js';
import dom from './dom.js';
import { elements } from './index.js';

const months = {

  render(dataYear, dataMonth) {

    // Kalenderdatensatzes aus einem Datum generiren
    const data = months.calcDataMonth(dataYear.year, dataMonth.month);
    
    // Tage, die nicht sichtbar sollen, erzaügen
    for (let i = 0; i < data.firstDayOfMonth - 1; i++) {
      const emptyDay = dom.create({
        parent: elements.calendarView,
        classes: ['day', 'hide'],
      });
    }
    // Kalendartage erzaügen
    for (let i = 1; i < data.daysInMonth + 1; i++) {

      let dayInfo = {};
      
      // Den heutigen Tag markieren
      const today = this.checkCurrentDay(
        data.currentDay,
        dataMonth.month,
        dataYear.year,
        i
      );
      // Alle Sonntags markieren
      const sunday = this.checkSundays(
        dataYear.year,
        dataMonth.month,
        i,
        data.firstDayOfMonth
      );
      // Alle Feiertage markieren
      const holiday = months.checkDay(
        dataMonth.holidays,
        'holiday',
        i
      );
      // Alle Geburtstage markieren
      const birthday = months.checkDay(
        dataMonth.birthdays,
        'birthday',
        i
      );
      // Alle Geburtstage markieren
      const other = months.checkDay(
        dataMonth.others,
        'other',
        i
      );
      const holidayYear = months.checkDay(
        dataYear,
        'holiday-year',
        i
      );

      dayInfo.holidays = holiday.eventName;
      dayInfo.birthdays = birthday.eventName;
      dayInfo.others = other.eventName;
      dayInfo.holidaysYear = holidayYear.eventName;

      // Erzaüge Tag HTML-Element
      const day = dom.create({
        parent: elements.calendarView,
        classes: ['day', today, sunday, holiday.event, birthday.event, other.event, holidayYear.event],
        content: i,
        listeners: { click: () => days.showInfo(i, dayInfo)},
      });
    }
  },

  calcDataMonth(year, month) {
    const date = new Date();
    const currentDay = date.getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    return { firstDayOfMonth, daysInMonth, currentDay };
  },

  // Prüft wird ob den Tag Heute ist
  checkCurrentDay(day, month, year, i) {
    return day === i &&
      month === new Date().getMonth() + 1 &&
      year === new Date().getFullYear()
      ? 'today'
      : '';
  },

  //Prüft wird ob den Tag Sonntag ist
  checkSundays(year, month, i, firstDay) {
    const dateTocheck = new Date(year, month - 1, i);
    if(firstDay) {
      return dateTocheck.getDay() === 0 ? 'sunday' : '';
    } else {
      return dateTocheck.getDay() === 6 ? 'sunday' : '';
    }
  },

  checkDay(data, name, day){
    let event ='', eventName = '';
    Object.values(data).forEach(item => {
      item.date === day ? event = name : '';
      item.date === day ? eventName = item.name: '';
    });
    return {event, eventName};
  },
  
};

export default months;
