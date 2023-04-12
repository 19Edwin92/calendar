import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ko' // (1) 한국어를 위한 지역설정
dayjs.locale('ko') // (2) 한국어를 위한 지역설정, 함께 

function App() {
  const [today, setToday] = useState(dayjs())
  const [date, setDate] = useState(today.format('YYYY-MM-DD'))
  const daysInMonth = today.daysInMonth();
  const firstDayOfMonth = dayjs(today).startOf('month').locale('ko'); // 해당 달의 철날에 대한 정보가 감겨있다.
  const dates = [];
  for (let i = 1; i <= daysInMonth; i++) {  // 이를 해당 달만큼 반복해서 돌리기에, 결국 해당 달의 모든 날에 대한 정보가 여기에 담겨 있습니다. 
    const date = dayjs(firstDayOfMonth).add(i - 1, 'day');
    dates.push(date);
  }

  const premonth = () => {
    console.log(dayjs(date).subtract(1, "month").format());
    setToday(dayjs(dayjs(date).subtract(1, "month").format()))
  }
  const nextmonth = () => {
    setToday(dayjs(dayjs(date).add(1, "month").format()))
  }

  return (
    <div> 
      금년금달 : {date} <br/>
      이번달이름 : {today.format('MMMM')} <br/>
      이번달의 총일수 : {daysInMonth}일<br/>
      이번달의 첫요일 : 
      <div>
        {dates.map(date => {
          if(date.format('dddd') == "토요일") {
           return (
            <div key={date.toString()}><div style={{color:"blue"}}>{date.format('D')}{date.format('dddd')}</div><br/><br/></div>
           )
          } if(date.format('dddd') == "일요일") {
            return (
              <div key={date.toString()}><div style={{color:"red"}}>{date.format('D')}{date.format('dddd')}</div></div>
             )
          }
          else {
            return (
              <div key={date.toString()}>{date.format('D')}{date.format('dddd')}</div>
            )
          }
        })}
      </div>
    <hr/>
    <h1>{today.format('MMMM')}</h1>
    <button onClick={premonth}>이전달</button>
    <button onClick={nextmonth}>다음달</button>
    </div> 
  )
}

export default App