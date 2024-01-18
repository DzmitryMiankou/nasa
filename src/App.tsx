import React from "react";
import { useGetTodayQuery } from "./redux/api/rest";
import styled from "styled-components";
import List from "./components/list/List";
import Main from "./components/main/Main";

const Box = styled.div`
  padding: 10px 30px;
  display: grid;
  grid-template-areas:
    "mainText ."
    "today  list";
  gap: 30px;
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

  const actual = data?.find((el) => el.date === `2024-01-18`);

  console.log(actual);

  return (
    <Box>
      <Main isLoading={isLoading} actual={actual} />
      <List data={data}></List>
    </Box>
  );
};

export default App;
