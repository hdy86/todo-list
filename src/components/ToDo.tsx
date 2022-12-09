import React from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

const Li = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 10px 0;

  @media all and (max-width: 767px) {
    display: block;
  }
`;
const Text = styled.span`
  flex: 1;
  font-size: 18px;
  line-height: 1.5em;

  @media all and (max-width: 767px) {
    display: block;
    flex: none;
    margin-bottom: 10px;
  }
`;
const Button = styled.button`
  font-size: 18px;
  color: #fff;
  margin-left: 10px;
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 5px;
  background: #102335;
  cursor: pointer;

  @media all and (max-width: 767px) {
    margin-left: 0;
    margin-right: 10px;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
    console.log(category, Categories.DOING);
  };
  const onDelete = () => {
    setToDos((oldToDos) => {
      const newToDos = oldToDos.filter((todo) => todo.id !== id);
      return newToDos;
    });
  };

  return (
    <Li>
      <Text>{text}</Text>
      {category + "" !== Categories.DOING + "" && (
        <Button name={Categories.DOING + ""} onClick={onClick}>
          Doing
        </Button>
      )}
      {category + "" !== Categories.TO_DO + "" && (
        <Button name={Categories.TO_DO + ""} onClick={onClick}>
          To Do
        </Button>
      )}
      {category + "" !== Categories.DONE + "" && (
        <Button name={Categories.DONE + ""} onClick={onClick}>
          Done
        </Button>
      )}
      <Button onClick={onDelete}>Delete</Button>
    </Li>
  );
}

export default ToDo;
