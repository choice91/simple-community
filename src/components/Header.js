import React from "react";
import styled from "styled-components";

import { Typography, Container, Button } from "@material-ui/core";

function Header(props) {
  const { history } = props;

  return (
    <>
      <Container maxWidth="md">
        <Typography
          component="div"
          style={{
            backgroundColor: "#cfe8fc",
            height: "30vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: "10px",
          }}
        >
          <Title>나만의 게시판</Title>
          <TitleSub>아주 간단한 게시판</TitleSub>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push("/write");
            }}
          >
            글쓰기
          </Button>
        </Typography>
      </Container>
    </>
  );
}

const Title = styled.div`
  font-size: 50px;
`;

const TitleSub = styled.div`
  margin-bottom: 20px;
`;

export default Header;
