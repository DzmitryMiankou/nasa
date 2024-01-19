import React from "react";
import styled from "styled-components";
import { ReactComponent as MenuIcon } from "../../img/menu-svgrepo-com.svg";
import { ReactComponent as ClouseIcon } from "../../img/x-svgrepo-com.svg";
import { ListProps } from "../../interfaces/props.interfaces";
import { DateClient } from "../../options/date.option";

const ListBox = styled.aside<{ $open: boolean }>`
  grid-area: list;
  background-color: #d9d9d9;
  min-height: 100vh;
  height: 100%;
  padding-left: 12px;
  @media (max-width: 745px) {
    display: ${(prop) => (prop.$open ? "block" : "none")};
    padding-right: 5px;
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

const ListButt = styled.button`
  display: none;
  margin: 20px 20px 0px 20px;
  @media (max-width: 745px) {
    display: block;
  }
  @media (max-width: 598px) {
    margin: -20px 20px 0px 20px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const ClouseButt = styled(ListButt)`
  margin: 0px;
`;

const Label = styled.label`
  font-weight: 500;
`;

const List: React.FC<ListProps> = ({ data, set, dateAct, min, max, get }) => {
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
    setOpen(false);
  };

  const handlerClickOpen = (): void => setOpen(true);
  const handlerClickClouse = (): void => setOpen(false);

  return (
    <>
      <ListButt onClick={handlerClickOpen}>
        <MenuIcon width={"20px"} height={"20px"} />
      </ListButt>
      <ListBox $open={open}>
        <Header>
          <H3>Last few days</H3>
          <ClouseButt onClick={handlerClickClouse}>
            <ClouseIcon width={"15px"} height={"15px"} />
          </ClouseButt>
        </Header>
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
                    ...DateClient,
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
            min={min}
            onKeyDown={(e) => e.preventDefault()}
            onChange={handlerDate}
          />
        </CalendarBox>
      </ListBox>
    </>
  );
};

export default List;
