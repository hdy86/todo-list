import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Box = styled.div`
  width: 96%;
  max-width: 800px;
  margin: 100px auto;

  @media all and (max-width: 1000px) {
    margin: 40px auto;
  }
`;
const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
`;
const Hr = styled.hr`
  height: 4px;
  margin: 20px 0;
  border: 0;
  background: #fff;
`;
const Select = styled.select`
  font-size: 20px;
  color: #fff;
  width: 30%;
  margin-bottom: 10px;
  padding: 15px 20px 15px 15px;
  border: 2px solid #fff;
  background: transparent;

  option {
    background: #666;
  }

  @media all and (max-width: 767px) {
    width: 50%;
  }
`;
const Ul = styled.ul`
  margin-top: 40px;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <Box>
      <Title>To Dos</Title>
      <Hr />
      <Select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </Select>
      <CreateToDo />
      <Ul>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Ul>
    </Box>
  );
}

export default ToDoList;
