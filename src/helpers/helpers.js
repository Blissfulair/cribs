export const getDates=(startDate, stopDate)=> {
    for(var arr=[],dt=new Date(startDate); dt<=stopDate; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
}
 export const getMonthInWord = (date) => {

        const d = new Date(date);
        return d.toLocaleString('default', { month: 'short' });
    };
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
export const getFav = (id)=>{
    let favourite = false
    let favourites = JSON.parse(window.localStorage.getItem('@fi'))
    if(favourites !== null){
        favourites.forEach(propId=>{
            if(propId === id)
            favourite = true
        })
    }
    return favourite
}

export const getFavs = ()=>{
    let data = [];
    let favourites = JSON.parse(window.localStorage.getItem('@fi'))
    if(favourites !== null){
        data = [...favourites]
    }
    return data
}

export const getWeekNumber = ()=>{
    const today = new Date()
    const onejan = new Date(today.getFullYear(), 0, 1);
    const weekNumber = Math.ceil( (((today.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7 )
    return weekNumber
}
    