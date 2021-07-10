import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@material-ui/core";

// import { history } from "../redux/store";

import { actionCreators as postActions } from "../redux/modules/post";

function PostWrite(props) {
  const { history } = props;
  const dispatch = useDispatch();

  const post_list = useSelector((state) => state.post.list);
  const post_num = post_list[0].post_id + 1;
  // console.log(post_list[0].post_id);

  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [contents, setContents] = React.useState("");

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  return (
    <>
      <Container>
        <TextField
          id="outlined-search"
          label="제목을 입력하세요"
          type="text"
          variant="outlined"
          fullWidth
          onChange={changeTitle}
          style={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-search2"
          label="글쓴이를 입력하세요"
          type="text"
          variant="outlined"
          fullWidth
          onChange={changeAuthor}
          style={{ margin: "10px 0px" }}
        />
        <TextField
          id="outlined-textarea"
          label="내용을 입력하세요"
          placeholder="내용을 입력하세요"
          multiline
          variant="outlined"
          fullWidth
          onChange={changeContents}
          style={{ margin: "10px 0px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(
              postActions.addPostFB({
                post_id: post_num,
                post_title: title,
                author: author,
                contents: contents,
              })
            );
            history.push("/");
          }}
        >
          글쓰기
        </Button>
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

export default PostWrite;
