import React from "react";
import { useGetTodayQuery } from "./redux/api/rest";
import styled from "styled-components";
import List from "./components/list/List";
import Main from "./components/main/Main";

const Box = styled.div`
  padding: 0px 0px 0px 40px;
  display: grid;
  grid-template-areas:
    "mainText list"
    "today  list"
    ".  list";
  row-gap: 20px;
`;
const H1 = styled.h1`
  font-size: 50px;
  padding-top: 20px;
  text-transform: uppercase;
  grid-area: mainText;
`;

const App: React.FC = () => {
  const getDate = (params: number): string => {
    const start = new Date();
    start.setDate(start.getDate() - params);
    const result = start
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .split("/");
    return `${result[2]}-${result[0]}-${result[1]}`;
  };

  const { data, isLoading } = useGetTodayQuery(getDate(7));
  const [date, setDate] = React.useState<string>(getDate(0));

  return (
    <Box>
      <H1>Astronomy Picture of the Day</H1>
      <Main
        isLoading={isLoading}
        actual={data?.find((el) => el.date === date)}
      />
      <List data={data} set={setDate} dateAct={date} />
    </Box>
  );
};

export default App;
