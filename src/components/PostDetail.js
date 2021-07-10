import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";

import { actionCreators as postActions } from "../redux/modules/post";

function PostDetail(props) {
  const dispatch = useDispatch();
  const { history } = props;
  // console.log(props);
  // console.log(props.match.params.id);

  const idx = props.match.params.id;
  // console.log("idx: ", idx);

  const post = useSelector((state) => state.post.list);
  // console.log(post);
  // console.log(post[idx]);
  const _post = post.filter((p) => {
    return p.post_id === parseInt(idx);
  });
  // console.log(_post);

  return (
    <>
      <Container>
        <TextField
          id="outlined-search"
          label="제목을 입력하세요"
          type="text"
          variant="outlined"
          fullWidth
          disabled
          value={_post[0].post_title}
          style={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-search2"
          label="글쓴이를 입력하세요"
          type="text"
          variant="outlined"
          fullWidth
          disabled
          value={_post[0].author}
          style={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-textarea"
          label="내용을 입력하세요"
          placeholder="내용을 입력하세요"
          multiline
          variant="outlined"
          fullWidth
          disabled
          value={_post[0].contents}
          style={{ margin: "10px 0px" }}
        />
        <ButtonBox>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push("/");
            }}
          >
            돌아가기
          </Button>
          <Button
            variant="contained"
            color="default"
            onClick={() => {
              history.push(`/update/${idx}`);
            }}
          >
            수정하기
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              dispatch(postActions.deletePostFB(_post[0].post_id));
              history.replace("/");
            }}
          >
            삭제하기
          </Button>
        </ButtonBox>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 500px;
  margin: 200px auto 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonBox = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-between;
`;

export default PostDetail;
