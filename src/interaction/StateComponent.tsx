import React, { ChangeEvent, KeyboardEvent, useState } from "react";

// Hook 함수 : 컴포넌트의 생명 주기를 연관, 이의 등장으로 class 컴포넌트 더이상 사용 X

// 상태(state) :
// - 각 컴포넌트가 독립적으로 가지고 있는 데이터 기억 공간
// - 상태는 컴포넌트가 렌더링되는 기준
// - 상태가 변경되면 컴포넌트는 리렌더링 됨
export default function StateComponent() {
  let letCount: number = 0;

  // const [상태변수, 상태변경함수] = useState<상태변수타입>(초기값);
  // state 선언 방법
  // - useState hook 함수로 상태를 선언
  const [count, setCount] = useState<number>(0);
  let [num, setNumber] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const [array, setArray] = useState<number[]>([]);

  const [comment, setComment] = useState<string>("");

  const onClickHandler = () => {
    letCount++;
    console.log(letCount);
    setCount(count + 1);
    console.log(count);
    // 상태변수는 반드시 상태변경함수를 이용해서 변경해야 변경값이 적용됨
    // 직접 바꾸면 일반 변수와 동일하게 취급됨.
    num++;
    console.log(num);
    console.log("--------------");
  }; // 이 함수가 다 돌고나면 렌더링이 다시되고 letCount가 0에서 1이 되었으나 count를 얻기위해 리렌더링이되서 다시 0이됨

  const onStateClickHandler = () => {
    // 상태변경함수를 사용하여 상태를 변경하더라도 바로 변경되지 않음
    // 함수가 끝나고 렌더링되는 시점에 적용됨
    // console.log(count);
    // setCount(count + 1);
    // console.log(count);
    // setCount(count + 1);
    // console.log(count);
    // setCount(count + 1);
    // console.log(count);
    // console.log("--------------"); // 이렇게하면 값이 1이 나옴! 왜인지는 앓지?

    // let nextCount = count + 1;
    // setCount(nextCount);
    // nextCount += 1;
    // setCount(nextCount);
    // nextCount += 1;
    // setCount(nextCount); // 다른 변수에 넣었으니 얘는 값이 계속 더해져서 나오겠지? ㅇㅇ

    /// 상태변경함수에 콜백함수를 전달하면 해당 콜백 함수를 누적시켜서 실행
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  };

  const onSumHandler = () => {
    //   setCount(count + 1);
    //   setTotal(total + count);
    //! 바로 적용되게 하는 법, 다른 변수에 넣어서 하기!
    const nextCount = count + 1;
    setCount(nextCount);
    const nextTotal = total + nextCount;
    setTotal(nextTotal);
    console.log("--------------");
  };

  const onArrayAddHandler = () => {
    // const nextCount = count + 1;
    // setCount(nextCount);
    // array.push(1);
    const newArray = [...array, 1]; // 그냥 하면 주소값이 같기에 변환이 일어나지 않아 새로운 배열을 두어야 리렌더링이 일어난다.
    setArray(newArray);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setComment(value);
  };

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (key !== "Enter") return;
    onSubmitHandler();
  };

  const onSubmitHandler = () => {
    alert("전송");
  };

  return (
    <div>
      <h2>일반변수 : {letCount}</h2>
      <h2>상태변수 : {count}</h2>
      <h2>let상태변수 : {num}</h2>
      <h2>total : {total}</h2>
      <button onClick={onClickHandler}>증가</button>
      <button onClick={onStateClickHandler}>버튼</button>
      <button onClick={onSumHandler}>더하기</button>
      <div>
        {array.join(", ")} / 길이 : {array.length}
        <button onClick={onArrayAddHandler}>추가</button>
      </div>
      <p> {comment} </p>
      <p> {comment} </p>
      <input value={comment} onChange={onChangeHandler} />

      <div style={{ margin: "40px", padding: "40px", border: "1px solid gray" }}>
        <input value={comment} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} />
        <button onClick={onSubmitHandler}>전송</button>
      </div>
    </div>
  );
}
