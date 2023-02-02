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
  
  type DateStringOrNumber = Date|string|number

  class CustomDate{
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
  
  class EmailTemplate{
    static create(date:CustomDate, htmlFormatter:HtmlFormatter){
      const htmlBody = htmlFormatter.buildHtmlBody(
        EmailTemplate.getGreeting(),
        ...EmailTemplate.getBodyParagraphs(date, htmlFormatter), 
        EmailTemplate.getClosing(htmlFormatter), 
        EmailTemplate.getMySignature()
      )
      return {name:"Oliver Allen-Cummings", htmlBody}
    }
  
    private static getGreeting(){
      const emailGreeting = 'Hi team,'
      return emailGreeting
    }
  
    private static getBodyParagraphs(date:CustomDate, htmlFormatter:HtmlFormatter){
      const requirementsDoc = DriveApp.getFileById('1bZwt67lF79O21aXniSIlXNgZcrsYFKEkz8haewUQYac')
      const emailBodyText = [   ``,
        `Please send me any services you have for ${date.month}. It would be great if you could share by the end of the day ${date.getsOneWeekDeadline()}.`, 
        `As a reminder, ${htmlFormatter.makeHtmlLink(`here's a list of the info I'll need to record any TA or Education services.`, requirementsDoc.getUrl())}`
      ]
      const emailBodyParagraphs = emailBodyText.map(htmlFormatter.makeHtmlParagraph)
      return emailBodyParagraphs
    }
  
    private static getClosing(htmlFormatter:HtmlFormatter){
      const lineBreak = htmlFormatter.addLineBreak()
      const emailClosing = `Thanks,${lineBreak}Oliver`
      return emailClosing
    }
  
    private static getMySignature(){
      return `<div dir="ltr"><img src="https://i.pinimg.com/originals/c2/51/aa/c251aaaa400eb6fef7e56b602d6f95bd.jpg" width="96" height="78"><br><div><b>Oliver Allen-Cummings</b></div><div>Program Coordinator, Worker Cooperative Program</div><div>4-25 Astoria Blvd.</div><div>Astoria, NY 11102</div><div>Phone: 718-784-0877</div><div><a href="http://urbanupbound.org/" style="color:rgb(17,85,204);font-size:13.3333px" target="_blank">urbanupbound.org</a><br></div><div><a href="https://www.facebook.com/urbanupboundny/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/facebook-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://twitter.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/twitter-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="http://instagram.com/urbanupbound_ny" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/instagram-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://www.youtube.com/channel/UCmHQdYYrZkABaVIm1Xt8wXw" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/youtube-icon_32x32.png?_ga=2.195531820.1874837458.1618585022-1466277378.1618585022"></a>&nbsp;<a href="https://urbanupbound.medium.com/" target="_blank"><img src="https://cdn.exclaimer.com/Handbook%20Images/Medium_32.png?_ga=2.157257915.1874837458.1618585022-1466277378.1618585022"></a><br></div></div>`
    }
  }
  
  class HtmlFormatter{
    constructor(){}
  
    buildHtmlBody(...content: string[]):string{
      return content.join("")
    }
  
    makeHtmlParagraph(text:string):string{
      return `<p>${text}<\p>`
    }
  
    /** @param {string} text @param {string} url */
    makeHtmlLink(text:string, url:string):string{
      return `<a href=${url}>${text}<\a>`
    }
  
    addLineBreak():string{
      return `<br>`
    }
  }
  