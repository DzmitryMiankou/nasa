import React from "react";
import styled from "styled-components";
import { TodayDataType } from "../../redux/api/rest";

const H1 = styled.h1`
  font-size: 40px;
  grid-area: mainText;
`;

const Figure = styled.figure`
  display: flex;
  gap: 10px;
  width: 60vw;
`;

const Img = styled.img`
  max-height: 70vh;
  max-width: 35vw;
`;

const Span = styled.span`
  font-weight: 700;
`;

const Figcaption = styled.div``;

const LoadingText = styled.p`
  font-size: 40px;
`;

const Today = styled.div`
  grid-area: today;
`;

const Main: React.FC<{
  isLoading: boolean;
  actual: TodayDataType<string> | undefined;
}> = ({ isLoading, actual }) => {
  return (
    <>
      <H1>Astronomy Picture of the Day</H1>
      <Today>
        {!isLoading ? (
          <Figure>
            <Img src={actual?.hdurl} alt={actual?.title} />
            <Figcaption>
              <time dateTime={actual?.date}>
                <Span>Date: </Span>
                {actual?.date}
              </time>
              <figcaption>
                <Span>Title: </Span>
                {actual?.title}
              </figcaption>
              <p>
                <Span>Copyright: </Span>
                {actual?.copyright}
              </p>
            </Figcaption>
          </Figure>
        ) : (
          <LoadingText>Loading...</LoadingText>
        )}
      </Today>
    </>
  );
};

export default Main;
