import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { TodayDataType } from "../../redux/api/rest";

const ListBox = styled.aside`
  grid-area: list;
  background-color: #d9d9d9;
  min-height: 100vh;
  height: 100%;
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
  @media (max-width: 1300px) {
    font-size: 14px;
  }
`;

const CalendarBox = styled.div`
  margin: 40px 0px;
`;

const Title = styled.p`
  @media (max-width: 1000px) {
    display: none;
  }
`;

type Props = {
  data: TodayDataType<string>[] | undefined;
  set: Dispatch<SetStateAction<string>>;
  dateAct: string | undefined;
  min: string;
  max: string;
  get: (date: string) => void;
};

const List: React.FC<Props> = ({ data, set, dateAct, min, max, get }) => {
  const handlerClick = (date: string): void => {
    get("");
    set(date);
  };

  const handlerDate = (e: React.ChangeEvent<HTMLInputElement>): void =>
    get(e.target.value);

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
              <Title>{title}</Title>
            </Li>
          ))}
      </Ul>
      <CalendarBox>
        <h4>Select date</h4>
        <input
          type="date"
          min={min}
          max={max}
          onKeyDown={(e) => e.preventDefault()}
          onChange={handlerDate}
        />
      </CalendarBox>
    </ListBox>
  );
};

export default List;
