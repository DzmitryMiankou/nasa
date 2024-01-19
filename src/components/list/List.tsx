import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { TodayDataType } from "../../redux/api/rest";

const ListBox = styled.aside<{ $open: boolean }>`
  grid-area: list;
  background-color: #d9d9d9;
  min-height: 100vh;
  height: 100%;
  padding-left: 12px;
  @media (max-width: 745px) {
    display: ${(prop) => (prop.$open ? "block" : "none")};
    position: fixed;
    right: 0;
  }
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
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

const Title = styled.p`
  @media (max-width: 1000px) {
    display: none;
  }
`;

const ListButt = styled.div`
  display: none;
  padding: 10px 10px 0px 0px;
  @media (max-width: 745px) {
    display: block;
  }
`;

const Label = styled.label`
  font-weight: 500;
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
  const [val, setVal] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const handlerClick = (date: string): void => {
    get("");
    set(date);
    setVal("");
    setOpen(false);
  };

  const handlerDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    get(e.target.value);
    setVal(e.target.value);
  };

  const handlerClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <ListButt onClick={handlerClickOpen}>List</ListButt>
      <ListBox $open={open}>
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
          <Label htmlFor="date-in">Select date</Label>
          <input
            id="date-in"
            lang="en-US"
            value={val}
            type="date"
            max={max}
            onKeyDown={(e) => e.preventDefault()}
            onChange={handlerDate}
          />
        </CalendarBox>
      </ListBox>
    </>
  );
};

export default List;
