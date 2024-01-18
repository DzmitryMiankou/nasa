import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { TodayDataType } from "../../redux/api/rest";

const ListBox = styled.aside`
  grid-area: list;
  background-color: #d9d9d9;
  height: 100vh;
  padding-left: 12px;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
`;

const Li = styled.li`
  cursor: pointer;
  transition: 0.2s;
  border-left: solid 3px black;
  padding-left: 8px;
  &:hover {
    background-color: #ffffff;
  }
`;

const H3 = styled.h3`
  padding: 10px 0px;
`;

const List: React.FC<{
  data: TodayDataType<string>[] | undefined;
  set: Dispatch<SetStateAction<string>>;
}> = ({ data, set }) => {
  const handlerClick = (date: string) => {
    set(date);
  };

  return (
    <ListBox>
      <H3>In the last seven days</H3>
      <Ul>
        {data &&
          data.map(({ title, hdurl, date }) => (
            <Li key={hdurl} onClick={() => handlerClick(date)}>
              <p>{date}</p>
              <p>{title}</p>
            </Li>
          ))}
      </Ul>
    </ListBox>
  );
};

export default List;
