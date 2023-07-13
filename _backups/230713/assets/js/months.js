'use strict';
import days from './days.js';
import dom from './dom.js';
import { elements } from './index.js';

const months = {
  // Prüft wird ob den Tag Heute ist
  checkCurrentDay(day, month, year, i) {
    return day === i &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
      ? 'today'
      : '';
  },
  //Prüft wird ob den Tag Sonntag ist
  checkSundays(year, month, i) {
    const dateTocheck = new Date(`${year}-${month + 1}-${i}`);
    return dateTocheck.getDay() === 0 ? 'sunday' : '';
  },

  createMonthData(year, month, data) {
    const dataYear = data.years[year];
    const monthName = new Date(year, month, 1).toLocaleString('de-De', {
      month: 'long',
    });
    const dataMonth = data.months[monthName];
    return dataMonth;
  },

  //Prüft wird ob den Tag Feiertag ist
  checkHolidays(data, year, month, day) {
    const dataMonth = months.createMonthData(year, month, data);

    let result = '',
      name = '';
    dataMonth.holidays.forEach((holiday) => {
      name = holiday.name;
      holiday.date === day ? (result = 'holiday') : (result = '');
    });
    return { result, day, name };
  },

  checkBirthdays(data, year, month, day) {
    const dataMonth = months.createMonthData(year, month, data);
    console.log(dataMonth.birthdays);
    // let result = dataMonth.birthdays.filter(birthday =>  birthday.date === day);
    // console.log(result);
  },

  render(data, currentYear, currentMonth) {
    let date = new Date();
    const currentDay = date.getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDayOfMonth - 1; i++) {
      const emptyDay = dom.create({
        parent: elements.calendarView,
        classes: ['day', 'hide'],
      });
    }

    for (let i = 1; i < daysInMonth + 1; i++) {
      let dayInfo = {};
      // Den heutigen Tag markieren
      const today = this.checkCurrentDay(
        currentDay,
        currentMonth,
        currentYear,
        i
      );
      // Alle Sonntags markieren
      const sunday = this.checkSundays(currentYear, currentMonth, i);
      // Feiertage markieren
      const holiday = this.checkHolidays(data, currentYear, currentMonth, i);
      if (holiday.result) dayInfo.holiday = holiday.name;
      // Geburtstage markieren
      const birthday = this.checkBirthdays(data, currentYear, currentMonth, i);
    //   if (birthday.result) dayInfo.birthday = birthday.name;
    //   console.log(dayInfo);

      const day = dom.create({
        parent: elements.calendarView,
        classes: ['day', today, sunday, holiday.result],
        content: i,
        listeners: { click: () => days.showInfo({ day: i, ...{ dayInfo } }) },
      });
    }
  },
};

export default months;
