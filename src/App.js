import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ko' // (1) 한국어를 위한 지역설정
import Calendar from './calendar'
import styled from 'styled-components'
dayjs.locale('ko') // (2) 한국어를 위한 지역설정, 함께 

function App() {
  const [today, setToday] = useState(dayjs())
  const daysInMonth = today.daysInMonth();
  const firstDayOfMonth = dayjs(today).startOf('month').locale('ko'); // 해당 달의 철날에 대한 정보가 감겨있다.
  // console.log("firstDayOfMonth", firstDayOfMonth.day());
  const emptyDates = new Array(firstDayOfMonth.day()).fill(null);
  // 빈배열(new Array)을 만들고 해당 공간은 null로 채워라는 명령어가 fill이다. 
  // 이를 7씩 나누면 원하는 캘린더가 나올 것이다. 
  // const dates = [];
  // for (let i = 1; i <= daysInMonth; i++) {  // 이를 해당 달만큼 반복해서 돌리기에, 결국 해당 달의 모든 날에 대한 정보가 여기에 담겨 있습니다. 
  //   const date = dayjs(firstDayOfMonth).add(i - 1, 'day');
  //   dates.push(date);
  // }
  const dates = Array.from({length:daysInMonth}, (_, index) =>
  dayjs(firstDayOfMonth).add(index, 'day'));

  const calendarLists = [...emptyDates, ...dates]
  console.log(dayjs(today).startOf('year').locale('ko'));
  console.log(firstDayOfMonth.day());
  console.log(emptyDates);
  console.log(calendarLists);

  const preMonth = () => {
    setToday(dayjs(today).subtract(1,"month"))
    setInputValue('')
  }
  const nextMonth = () => {
    setToday(dayjs(today).add(1,"month"))
    setInputValue('')
  }

  const presentMonth = () => {
    setToday(dayjs())
    setInputValue('')
  }

  const [inputValue, setInputValue] = useState('')
  const onChangeInputHandle = (e) => {
    setInputValue(e.target.value)
  }

  useEffect(()=> {
    if(inputValue) {
      setToday(dayjs(inputValue))
    }
  }, [inputValue])

  const 요일 = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"]


  return (
    <div>App
      <h1>{today.format('YYYY-MM-DD')}</h1>
      <h1>{today.format('MMMM')}</h1>
      <h3>이번달 일수 : {daysInMonth}일</h3>
      <button onClick={preMonth}>이전달</button>
      <button onClick={nextMonth}>다음달</button>
      <button onClick={presentMonth}>현재</button>
      <input type='date' value={inputValue} onChange={onChangeInputHandle}/>
      <hr/>
      <h1>{today.format('YYYY년 MMMM')}</h1>
      <button onClick={preMonth}>이전달</button>
      <button onClick={nextMonth}>다음달</button>
      <button onClick={presentMonth}>현재</button>
      <input type='date' value={inputValue} onChange={onChangeInputHandle}/>
      <CalenderLayout>
        {요일.map((요일,index) => (<DateHeaed key={index} height="40">{요일}</DateHeaed>))}
        {calendarLists.map((date, index) => {
          if(date === null) {
            return <DateDiv key={index}></DateDiv>
          }
          else {
            return <DateDiv color='lightsalmon' key={index} onClick={()=>alert(date.format())}>{date.format("DD")}</DateDiv>
          }
        })}
      </CalenderLayout>
      <hr/>
      <Calendar/>
      <hr/>
      <div>
        {dates.map(date => {
          if(date.format('dddd') === "토요일") {
           return (
            <div key={date.toString()}><div style={{color:"blue"}}>{date.format('YYYY-MM-DD')} {date.format('dddd')}</div><br/><br/></div>
           )
          } if(date.format('dddd') === "일요일") {
            return (
              <div key={date.toString()}><div style={{color:"red"}}>{date.format('YYYY-MM-DD')} {date.format('dddd')}</div></div>
             )
          }
          else {
            return (
              <div key={date.toString()}>{date.format('YYYY-MM-DD')} {date.format('dddd')}</div>
            )
          }
        })}
      </div>
      
    </div>
  )
}

export default App

const CalenderLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 10px;
  max-width: 600px;
  min-width: 600px;
  max-height: 500px;
  min-height: 500px;
`

const DateHeaed = styled.div`
  background-color: lightsalmon;
  text-align: center;
  color: white;
  font-weight: 900;
  height: ${prpos=> prpos.height}px;
  line-height:${prpos=> prpos.height}px;
  min-height: 30px;
  height: 50px;
`

const DateDiv = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  &:hover {
    background-color: ${pos=>pos.color};
    border-radius: 50px;
    color: white;
    font-size: 1.5rem;
  }

`