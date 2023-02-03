import { TimeFacts } from "./TimeFacts"
import { DateStringOrNumber } from "./UtilityTypes"

export class CustomDate{
    fullDate:Date
    dateAsMilliseconds:number
    
    static of(date:DateStringOrNumber){
      return new CustomDate(new Date(date))
    }

    constructor(date:Date){
      this.fullDate = date
      this.dateAsMilliseconds = date.valueOf()
    }
  
    get day():string{
      const day = this.fullDate.getDay()
      const daysDict = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
      }
      return daysDict[day]
    }
  
    get month():string{
      const month = this.fullDate.getMonth()
      const monthsDict = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
      }
      return monthsDict[month]
    }
  
    private get date(){
      return this.fullDate.getDate()
    }
  
    private get fullYear(){
      return this.fullDate.getFullYear()
    }
  
    private getsTheNextDay(){
      const nextDay = CustomDate.of(this.dateAsMilliseconds + TimeFacts.millisecondsInOneDay)
      return nextDay
    }
  
    private static getsDateOneWeekLater(date:CustomDate){
      return date.getsDateOneWeekLater()
    }
  
    getsDateOneWeekLater():CustomDate{
      return CustomDate.of( this.dateAsMilliseconds +  TimeFacts.millisecondsInOneWeek)
    }
  
    /** @private */
    private isADayOff(){
      return this.dateIsOnTheWeekend() || this.dateIsAHoliday()
    }
  
    private dateIsOnTheWeekend(){
      const day = this.day
      return day == "Saturday" || day == "Sunday"
    }
  
    private dateIsAHoliday(){
      const holidayOnDate = getHolidayDatesBetween(this.fullDate, this.getsTheNextDay().fullDate)
        .filter( holidayDate => holidayDate == this.fullDate.getDate())
      return holidayOnDate.length > 0
  
      function getHolidaysBetween(startDate:DateStringOrNumber, endDate:DateStringOrNumber){
        return CalendarApp.getCalendarsByName('UU Days Off')[0].getEvents(new Date(startDate), new Date(endDate))
      }
  
      function getHolidayDatesBetween(startDate:DateStringOrNumber, endDate:DateStringOrNumber){
        return getHolidaysBetween(startDate, endDate).map(holiday => holiday.getAllDayStartDate().getDate())
      }
    }
  
    getsDeadline(customDateFn:(customDate: CustomDate) => CustomDate){
      const deadlineDate = validateDate(this, customDateFn)
      return `${deadlineDate.day}, ${deadlineDate.month} ${deadlineDate.date}, ${deadlineDate.fullYear}`
  
      function validateDate(date:CustomDate, customDateFn:(customDate: CustomDate) => CustomDate){
        const deadlineDate = customDateFn(date)
        return deadlineDate.isADayOff() ? validateDate(date.getsTheNextDay(), customDateFn) : deadlineDate
      }
    }
  
    getsOneWeekDeadline(){
      return this.getsDeadline(CustomDate.getsDateOneWeekLater)
    }
  }