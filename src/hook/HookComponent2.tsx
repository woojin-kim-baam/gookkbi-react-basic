import React, { KeyboardEvent, useRef, useState } from "react";

export default function HookComponent2() {
  // useRef :
  // - 렌더링 없이 값을 기억하고 변경하고자 할 때 사용
  // - DOM 요소를 참조하기 위해 자주 사용
  // - const 변수 = useRef<타입>(초기값)
  // - useRef 생성하는 참조 변수의 데이터는 해당 변수의 current 속성에 들어 있음

  let number = 0;
  const [state, setState] = useState<number>(0);
  const ref = useRef<number>(0);

  // HTML DOM 요소를 참조하기 위해서 useRef를 사용할 수 있음
  // 이땐 해당 요소 시작 태그의 ref 속성에 해당 참조 변수를 지정해야 함함
  const secondRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    setState(state + 1);
  };

  const onVar = () => {
    number++;
    console.log(number);
  };

  const onRef = () => {
    ref.current++;
    console.log(ref.current);
  };

  const onFirstKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (key !== "Enter") return;

    // 1)
    // react에서는 document.getElementXXX 사용을 지양
    // - 실제 HTML이 render되기 전에 코드를 읽는다면 요소를 찾을 수 없음
    // 1-1)
    // const secondInputElement = document.getElementById("second-input");
    // secondInputElement?.focus();
    // 1-2)
    // 물음표 안쓰는 법
    // const secondInputElement = document.getElementById("second-input");
    // if (secondInputElement) {
    //   secondInputElement.focus();
    // }

    // 특정 객체에서 속성 혹은 함수 호출을 실행하고자 할 때
    // 해당 객체가 null 혹은 undefined를 가질 수 있는 경우라면
    // 해당 객체에 ?연산자를 사용하여 존재할때만 접근 및 호출할 수 있도록 함
    // 사용 지양 -> 상단에서 검증 -> if 문 사용
    secondRef.current?.focus();
  };

  return (
    <div>
      <h1>일반 변수 : {number} </h1>
      <h1>상태 변수 : {state} </h1>
      <h1>참조 변수 : {ref.current} </h1>
      <button onClick={onVar}>일반 증가!</button>
      <button onClick={onClick}>클릭!</button>
      <button onClick={onRef}>Ref 증가!</button>
      <div style={{ margin: "40px", padding: "40px", border: "1px solid gray" }}>
        <input id="first-input" onKeyDown={onFirstKeyDownHandler} />
        <input ref={secondRef} id="second-input" />
        <button>버튼</button>
      </div>
    </div>
  );
}
