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
      const emailBodyText = [ ``,
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