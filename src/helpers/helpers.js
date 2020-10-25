export const getDates=(startDate, stopDate)=> {
    for(var arr=[],dt=new Date(startDate); dt<=stopDate; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
}

export const sendMail =async(from, to, subject, message, senderName='')=> {
    const res = await fetch('https://us-central1-cribng.cloudfunctions.net/api/send-mail', {
         method:'post',
         body:JSON.stringify({
             email:to,
             message:message,
             subject:subject,
             from:from,
             senderName:senderName,
             host:process.env.REACT_APP_MAIL_HOST,
             port:process.env.REACT_APP_MAIL_PORT,
             username:process.env.REACT_APP_MAIL_USERNAME,
             password:process.env.REACT_APP_MAIL_PASSWORD
         }),
         headers:{
             'Content-Type':'application/json'
         }
     })
    return await res.json()
    }


    