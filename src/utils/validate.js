/**
 * Created by jiachenpan on 16/11/18.
 */
//格式化时间 2016-01-01
export function FormatDate(str) {
    var date = new Date(str);
    var month = date.getMonth()+1;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day >= 0 && day <= 9) {
      day = "0" + day;
    }
    return date.getFullYear()+"-"+month+"-"+day;
}

//获取当前日期或指定日期上一个月的同一天
export function getLastMonthDay(today) {
  var nowdate = new Date(today);
  nowdate.setMonth(nowdate.getMonth() - 1);
  var year = nowdate.getFullYear();
  var month = nowdate.getMonth()+1;
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  var day = nowdate.getDate();
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  return year + '-' + month + '-' + day;
}

//获取当前日期或指定日期前几天
export function getLastDay(today,dayNum) {
  var nowdate = new Date(today);
  nowdate.setDate(nowdate.getDay() - dayNum);
  var year = nowdate.getFullYear();
  var month = nowdate.getMonth()+1;
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  var day = nowdate.getDate();
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  return year + '-' + month + '-' + day;
}

//获取最近几天所有的日期值
export function getLatelyDayArr(today,Num) {
  let nowdate = new Date(today);
  let day2 = nowdate.getDate();
  let arr=[];

  for(let i=0;i<Num;i++){
    nowdate.setDate(day2 - Num);
    
    let nowdate2 = new Date(nowdate);
    let year = nowdate2.getFullYear();
    let month = nowdate2.getMonth()+1;

    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    let day = nowdate2.getDate();
    console.log(day)
    if (day >= 0 && day <= 9) {
      day = "0" + day;
    }
    let dates=year + '-' + month + '-' + day;
    arr.push(dates);
  }
  
  return arr;
}