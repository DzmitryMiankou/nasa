import React from "react";
import styled from "styled-components";
import { TodayDataType } from "../../redux/api/rest";

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

const Today = styled.main`
  grid-area: today;
`;

const Main: React.FC<{
  isLoading: boolean;
  actual: TodayDataType<string> | undefined;
}> = ({ isLoading, actual }) => {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLImageElement>(null);

  const onLoad = () => {
    setLoaded(true);
  };

  React.useEffect(() => {
    if (!isLoading && ref.current && ref.current.complete) {
      onLoad();
    }
    console.log(ref);
  }, [actual, isLoading]);

  return (
    <Today>
      {!isLoading ? (
        <Figure>
          <>
            <Img
              ref={ref}
              src={actual?.hdurl}
              onLoad={onLoad}
              alt={actual?.title}
            />
            {!loaded && <p>Load</p>}
          </>

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
  );
};

export default Main;
