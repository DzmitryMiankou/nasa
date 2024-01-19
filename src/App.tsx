import React from "react";
import { useGetTodayQuery, useLazyGetOneQuery } from "./redux/api/rest";
import styled from "styled-components";
import List from "./components/list/List";
import Main from "./components/main/Main";
import BG from "./img/BG.svg";
import { ListProps } from "./interfaces/props.interfaces";
import { DateServer } from "./options/date.option";

const Box = styled.div`
  padding: 0px 0px 0px 40px;
  display: grid;
  grid-template-areas:
    "mainText list"
    "today  list"
    ".  list";
  row-gap: 20px;
  overflow-x: hidden;
  background-image: url("${BG}");
  background-repeat: no-repeat;
  background-size: cover;
`;

const H1 = styled.h1`
  font-size: 50px;
  padding-top: 20px;
  text-transform: uppercase;
  grid-area: mainText;
  @media (max-width: 1250px) {
    font-size: 40px;
  }
  @media (max-width: 1000px) {
    font-size: 30px;
  }
`;

const App: React.FC = () => {
  const getDate = (params: number): string => {
    const start = new Date();
    start.setDate(start.getDate() - params);
    const result = start
      .toLocaleDateString("en-US", { ...DateServer })
      .split("/");
    return `${result[2]}-${result[0]}-${result[1]}`;
  };

  const { data, isLoading } = useGetTodayQuery(getDate(9));
  const [date, setDate] = React.useState<string>(getDate(0));
  const [trigger, oneDay] = useLazyGetOneQuery();
  const [switche, setSwitch] = React.useState<boolean>(false);

  const get = (date: string): void => {
    if (date.length === 0) return setSwitch(false);
    setSwitch(true);
    trigger(date);
  };

  const listProp: ListProps = {
    min: "1995-08-01",
    max: getDate(0),
    data: data,
    set: setDate,
    dateAct: switche ? oneDay?.data?.date : date,
    get: get,
  };

  return (
    <Box>
      <H1>Astronomy Picture of the Day</H1>
      <Main
        isLoading={isLoading}
        actual={
          switche
            ? oneDay.data
            : data?.find((el) => el.date === date) ??
              (data && data[data.length - 1])
        }
      />
      <List {...listProp} />
    </Box>
  );
};

export default App;
