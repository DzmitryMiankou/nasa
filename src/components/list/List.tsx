import React from "react";
import styled from "styled-components";
import { TodayDataType } from "../../redux/api/rest";

const ListBox = styled.div`
  grid-area: list;
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
    background-color: #e3e3e3;
  }
`;

const List: React.FC<{ data: TodayDataType<string>[] | undefined }> = ({
  data,
}) => {
  return (
    <ListBox>
      <h3>In the last seven days</h3>
      <Ul>
        {data &&
          data.map(({ title, hdurl, date }) => (
            <Li key={hdurl}>
              <p>{date}</p>
              <p>{title}</p>
            </Li>
          ))}
      </Ul>
    </ListBox>
  );
};

export default List;
