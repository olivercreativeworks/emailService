function sendMonthlyWCBDIEmail() {
    const date = CustomDate.of(new Date())
    Logger.log('Sending Email')
    GmailApp.sendEmail('oliver@urbanupbound.org', `TA/Edu Services for ${date.month}`, null, EmailTemplate.create(date, new HtmlFormatter()))
    Logger.log('The email has been sent')
  }
  
  class TimeFacts{
    static millisecondsInOneSecond = 1000
    static secondsInOneMinute = 60
    static minutesInOneHour = 60
    static hoursInOneDay = 24
    static daysInOneWeek = 7
    static millisecondsInOneDay = TimeFacts.millisecondsInOneSecond * TimeFacts.secondsInOneMinute * TimeFacts.minutesInOneHour * TimeFacts.hoursInOneDay
    static millisecondsInOneWeek = TimeFacts.millisecondsInOneDay * TimeFacts.daysInOneWeek
  }
  
  class CustomDate{
    /** @param {Date|string|number} date */
    static of(date){
      return new CustomDate(new Date(date), new TimeFacts())
    }
  
    /** @param {Date} date @param {TimeFacts} timeFacts */
    constructor(date, timeFacts){
      this.fullDate = date
      this.dateAsMilliseconds = date.valueOf()
      this.time = timeFacts
    }
  
    /** @private @return {String}*/
    get day(){
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
  
    /** @return {String} */
    get month(){
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
  
    /** @private */
    get date(){
      return this.fullDate.getDate()
    }
  
    /** @private */
    get fullYear(){
      return this.fullDate.getFullYear()
    }
  
    /** @private */
    getsTheNextDay(){
      const nextDay = CustomDate.of(this.dateAsMilliseconds + this.time.millisecondsInOneDay)
      return nextDay
    }
  
    /** @private @param {CustomDate} date */
    static getsDateOneWeekLater(date){
      return date.getsDateOneWeekLater()
    }
  
    /** @return {CustomDate}*/
    getsDateOneWeekLater(){
      return CustomDate.of( this.dateAsMilliseconds + this.time.millisecondsInOneWeek)
    }
  
    /** @private */
    isADayOff(){
      return this.dateIsOnTheWeekend() || this.dateIsAHoliday()
    }
  
    /** @private */
    dateIsOnTheWeekend(){
      const day = this.day
      return day == "Saturday" || day == "Sunday"
    }
  
    /** @private */
    dateIsAHoliday(){
      const holidayOnDate = getHolidayDatesBetween(this.fullDate, this.getsTheNextDay().fullDate)
        .filter( holidayDate => holidayDate == this.fullDate.getDate())
      return holidayOnDate.length > 0
  
      /** @template {Date|string|number} A, B @param{A} startDate, @param{B} endDate */
      function getHolidaysBetween(startDate, endDate){
        return CalendarApp.getCalendarsByName('UU Days Off')[0].getEvents(new Date(startDate), new Date(endDate))
      }
  
      /** @template {Date|string|number} A, B @param{A} startDate, @param{B} endDate */
      function getHolidayDatesBetween(startDate, endDate){
        return getHolidaysBetween(startDate, endDate).map(holiday => holiday.getAllDayStartDate().getDate())
      }
    }
  
    /** @param {function(CustomDate):CustomDate} customDateFn */
    getsDeadline(customDateFn){
      const deadlineDate = validateDate(this, customDateFn)
      return `${deadlineDate.day}, ${deadlineDate.month} ${deadlineDate.date}, ${deadlineDate.fullYear}`
  
      /** @param {CustomDate} date @param {function(CustomDate):CustomDate} customDateFn @return {CustomDate} */
      function validateDate(date, customDateFn){
        const deadlineDate = customDateFn(date)
        return deadlineDate.isADayOff() ? validateDate(date.getsTheNextDay(), customDateFn) : deadlineDate
      }
    }
  
    getsOneWeekDeadline(){
      return this.getsDeadline(CustomDate.getsDateOneWeekLater)
    }
  }
  
  class EmailTemplate{
    /** @param {CustomDate} date @param {HtmlFormatter} htmlFormatter */
    static create(date, htmlFormatter){
      const htmlBody = htmlFormatter.buildHtmlBody(
        EmailTemplate.getGreeting(),
        ...EmailTemplate.getBodyParagraphs(date, htmlFormatter), 
        EmailTemplate.getClosing(htmlFormatter), 
        EmailTemplate.getMySignature()
      )
      return {name:"Oliver Allen-Cummings", htmlBody}
    }
  
    /** @private */
    static getGreeting(){
      const emailGreeting = 'Hi team,'
      return emailGreeting
    }
  
    /** @private @param{CustomDate} date @param{HtmlFormatter} htmlFormatter */
    static getBodyParagraphs(date, htmlFormatter){
      const requirementsDoc = DriveApp.getFileById('1bZwt67lF79O21aXniSIlXNgZcrsYFKEkz8haewUQYac')
      const emailBodyText = [   ``
        `Please send me any services you have for ${date.month}. It would be great if you could share by the end of the day ${date.getsOneWeekDeadline()}.`, 
        `As a reminder, ${htmlFormatter.makeHtmlLink(`here's a list of the info I'll need to record any TA or Education services.`, requirementsDoc.getUrl())}`
      ]
      const emailBodyParagraphs = emailBodyText.map(htmlFormatter.makeHtmlParagraph)
      return emailBodyParagraphs
    }
  
    /** @private @param{HtmlFormatter} htmlFormatter */
    static getClosing(htmlFormatter){
      const lineBreak = htmlFormatter.addLineBreak()
      const emailClosing = `Thanks,${lineBreak}Oliver`
      return emailClosing
    }
  
  
    /** @private */
    static getMySignature(){
      return `<div dir="ltr"><img src="https://i.pinimg.com/originals/c2/51/aa/c251aaaa400eb6fef7e56b602d6f95bd.jpg" width="96" height="78"><br><div><b>Oliver Allen-Cummings</b></div><div>Program Coordinator, Worker Cooperative Program</div><div>4-25 Astoria Blvd.</div><div>Astoria, NY 11102</div><div>Phone: 718-784-0877</div><div><a href="http://urbanupbound.org/" style="color:rgb(17,85,204);font-size:13.3333px" target="_blank">urbanupbound.org</a><br></div><div><a href="https://www.facebook.com/urbanupboundny/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://twitter.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/twitter-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="http://instagram.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/instagram-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://www.youtube.com/channel/UCmHQdYYrZkABaVIm1Xt8wXw" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/youtube-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://urbanupbound.medium.com/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/Medium_32.png?_ga=2.157257915.1874837458.1618585022-1466277378.1618585022"></a><br></div></div>`
    }
  }
  
  class HtmlFormatter{
    constructor(){}
  
    /** @param {...string} content */
    buildHtmlBody(...content){
      return content.join("")
    }
  
    /** @param {string} text */
    makeHtmlParagraph(text){
      return `<p>${text}<\p>`
    }
  
    /** @param {string} text @param {string} url */
    makeHtmlLink(text, url){
      return `<a href=${url}>${text}<\a>`
    }
  
    addLineBreak(){
      return `<br>`
    }
  }
  