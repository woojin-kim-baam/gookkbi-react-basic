import React, { ReactNode } from "react";

// Properties (속성)
// - 부모 컴포넌트(호출부)에서 자식 컴포넌트로 데이터를 전달하기 위한 *객체*
// - 부모 컴포넌트에서는 HTML과 동일한 방식으로(속성=값) 전달
// - 자식 컴포넌트에서는 함수의 매개변수로 속성을 받음
// - 전달할 수 있는 데이터는 변수에 담을 수 있는 모든 데이터 형식

// - 컴포넌트가 리렌더링 되는 기준
// - Properties 은 부모 -> 자식 으로 데이터 전송은 가능 / 자식 -> 부모 데이터 전송은 불가능

interface Props {
  title: string;
  subTitle: string;
  contents: string;
}

// function Article(props: Props) {
function Article({ title, subTitle, contents }: Props) {
  // 바로 디스터럭터링

  //   const { title, subTitle, contents } = props; // 따로 디스트럭터링

  return (
    <article style={{ border: "1px solid gray", marginBottom: "8px" }}>
      {/* <h1>{props.title}</h1>
      <h2>{props.subTitle}</h2>
      <p>{props.contents}</p> */}
      <h1>{title}</h1>
      <h2>{subTitle}</h2>
      <p>{contents}</p>
    </article>
  );
}

interface Props2 {
  getTitle: () => string;
  children: ReactNode;
}

function Child(props: Props2) {
  return (
    <div>
      <h1>{props.getTitle()}</h1>
      {props.children}
    </div>
  );
}

const getTitle = () => {
  return "컴포넌트 관리";
};

export default function Properties() {
  const article: Props = {
    title: "발로 뛰는 대신 AI로",
    subTitle: "AI가 기업을 바꾼다",
    contents: "제품도 뛰어난데 무엇보다.....",
  };

  return (
    <div>
      <Article
        title="애들 보는거 아닌가요? 찬밥신세..."
        subTitle="C애니의 습격"
        contents="한때 한국 애니의 갑절...."
      />
      <Article title={article.title} subTitle={article.subTitle} contents={article.contents} />
      <Article {...article} />
      <Child getTitle={getTitle}>
        <p>익숙한 속성...</p>
      </Child>
    </div>
  );
}
