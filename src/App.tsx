import React from "react";
import { useGetTodayQuery } from "./redux/api/rest";
import styled from "styled-components";
import List from "./components/list/List";
import Main from "./components/main/Main";

const Box = styled.div`
  padding: 0px 0px 0px 30px;
  display: grid;
  grid-template-areas:
    "mainText list"
    "today  list"
    ".  list";
  gap: 30px;
`;
const H1 = styled.h1`
  font-size: 40px;
  grid-area: mainText;
`;

const App: React.FC = () => {
  const start = new Date();
  start.setDate(start.getDate() - 7);
  const startDate = start
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/");

  const { data, isLoading } = useGetTodayQuery(
    `${startDate[2]}-${startDate[0]}-${startDate[1]}`
  );
  const [get, set] = React.useState<string>(`2024-01-18`);

  return (
    <Box>
      <H1>Astronomy Picture of the Day</H1>
      <Main
        isLoading={isLoading}
        actual={data?.find((el) => el.date === get)}
      />
      <List data={data} set={set} />
    </Box>
  );
};

export default App;
