import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

const Form = styled.form`
  display: flex;
  flex: 1;
`;
const Input = styled.input`
  flex: 1;
  font-size: 20px;
  color: #fff;
  margin-right: 10px;
  padding: 15px 20px;
  border: 2px solid #fff;
  background: transparent;

  &::placeholder {
    color: #ccc;
  }
`;
const Button = styled.button`
  font-size: 20px;
  color: #2f3640;
  width: 100px;
  padding: 10px;
  border: 0;
  background: #fff;
  box-sizing: border-box;
  cursor: pointer;
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", { required: "Please write a To Do." })}
        placeholder="Write a to do"
      />
      <Button>Add</Button>
    </Form>
  );
}

export default CreateToDo;
