class TimeFacts{
    static millisecondsInOneSecond = 1000
    static secondsInOneMinute = 60
    static minutesInOneHour = 60
    static hoursInOneDay = 24
    static daysInOneWeek = 7
    static millisecondsInOneDay = TimeFacts.millisecondsInOneSecond * TimeFacts.secondsInOneMinute * TimeFacts.minutesInOneHour * TimeFacts.hoursInOneDay
    static millisecondsInOneWeek = TimeFacts.millisecondsInOneDay * TimeFacts.daysInOneWeek
  }