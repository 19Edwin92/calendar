import React from 'react';
import './Calendar.css';

function Calendar() {
  // 캘린더 헤더에 표시할 요일들
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // 현재 월의 첫 날과 마지막 날
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // 현재 월에 표시할 날짜들의 배열
  const dates = [];
  for (let date = new Date(firstDayOfMonth); date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }


  // 그리드 템플릿 칼럼 생성
  const numDaysInMonth = lastDayOfMonth.getDate();
  const numCols = 7; // 일주일 7일
  const numGridCells = Math.ceil((numDaysInMonth + firstDayOfMonth.getDay()) / numCols) * numCols;
  // 일주일 7일을 기준으로 그리드 셀 개수 계산

  // 날짜가 존재하지 않는 셀을 채우기 위한 빈 배열
  const emptyDates = Array.from({ length: numGridCells - numDaysInMonth - firstDayOfMonth.getDay() }, (_, i) => null);
  // console.log(...emptyDates, ...dates);
  return (
    <div className="calendar">
      {/* 요일 헤더 */}
      {daysOfWeek.map(day => (
        <div key={day} className="calendar-header">
          {day}
        </div>
      ))}
      {/* 날짜 셀 */}
      {[...emptyDates, ...dates].map((date, index) => (
        <div key={index} className={`calendar-cell ${date ? '' : 'empty-cell'}`}>
          {date && (
            <button onClick={()=> alert(date.getDate())}>{date.getDate()}</button>
          )}
        </div>
      ))}

    </div>
  );
}

export default Calendar;
