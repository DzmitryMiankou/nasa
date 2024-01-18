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

const Li = styled.li<{ $date: boolean }>`
  cursor: pointer;
  transition: 0.2s;
  border-left: solid 3px black;
  padding-left: 8px;
  background-color: ${(prop) => (prop.$date ? "#ffffff" : "")};
  &:hover {
    background-color: #e9e9e9;
  }
`;

const H3 = styled.h3`
  padding: 10px 0px;
`;

const List: React.FC<{
  data: TodayDataType<string>[] | undefined;
  set: Dispatch<SetStateAction<string>>;
  dateAct: string;
}> = ({ data, set, dateAct }) => {
  const handlerClick = (date: string): void => set(date);

  return (
    <ListBox>
      <H3>In the last seven days</H3>
      <Ul>
        {data &&
          data.map(({ title, hdurl, date }) => (
            <Li
              key={hdurl}
              onClick={() => handlerClick(date)}
              $date={date === dateAct}
            >
              <p>
                {new Date(date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p>{title}</p>
            </Li>
          ))}
      </Ul>
      <input type="date"></input>
    </ListBox>
  );
};

export default List;
