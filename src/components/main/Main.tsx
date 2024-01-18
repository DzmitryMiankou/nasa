import React from "react";
import styled from "styled-components";
import { TodayDataType } from "../../redux/api/rest";

const Today = styled.main`
  grid-area: today;
`;

const Figure = styled.figure`
  display: flex;
  gap: 10px;
  width: 65vw;
  position: relative;
`;

const Img = styled.img<{ $loaded: boolean }>`
  max-height: 70vh;
  max-width: 35vw;
  transition: 0.2s;
  opacity: ${(prop) => (prop.$loaded ? 1 : 0.3)};
`;

const Span = styled.span`
  font-weight: 700;
`;

const Figcaption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const LoadingText = styled.p`
  font-size: 40px;
`;

const Explanat = styled.p`
  margin: 30px 0px 30px 0px;
`;

const LoadingImg = styled.div`
  position: absolute;
  font-size: 30px;
  top: 10px;
  left: 10px;
`;

const Main: React.FC<{
  isLoading: boolean;
  actual: TodayDataType<string> | undefined;
}> = ({ isLoading, actual }) => {
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const onLoad = (): void => setLoaded(true);

  React.useEffect((): void => {
    setLoaded(false);
    const img = new Image();
    img.onload = () => onLoad();
    img.src = actual?.hdurl || "";
  }, [actual?.hdurl]);

  return (
    <Today>
      {!isLoading ? (
        <Figure>
          <Img
            $loaded={loaded}
            src={actual?.hdurl}
            alt={actual?.title}
            onLoad={onLoad}
          />
          <>
            {!loaded && (
              <LoadingImg>
                <p>Loading...</p>
              </LoadingImg>
            )}
          </>
          <Figcaption>
            <time dateTime={actual?.date}>
              <Span>Date: </Span>
              {new Date(actual?.date ?? "").toLocaleDateString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
              })}
            </time>
            <p>
              <Span>Title: </Span>
              {actual?.title}
            </p>
            <Explanat>
              <Span>Explanation: </Span> {actual?.explanation}
            </Explanat>
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