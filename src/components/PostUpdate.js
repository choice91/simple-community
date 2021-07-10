import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";

import { actionCreators as postActions } from "../redux/modules/post";

function PostDetail(props) {
  const dispatch = useDispatch();
  const { history } = props;
  //   console.log(props);
  // console.log(props.match.params.id);

  const post = useSelector((state) => state.post.list);
  // console.log(post);
  const idx = props.match.params.id;
  // console.log("idx: ", idx);
  //   console.log(post[idx]);

  const _post = post.filter((p) => {
    return p.post_id === parseInt(idx);
  });
  // console.log(_post);

  const [title, setTitle] = React.useState(_post[0].post_title);
  const [author, setAuthor] = React.useState(_post[0].author);
  const [contents, setContents] = React.useState(_post[0].contents);

  return (
    <>
      <Container>
        <TextField
          id="outlined-search"
          label="제목을 입력하세요"
          type="text"
          variant="outlined"
          fullWidth
          value={title}
          style={{ margin: "10px 0px" }}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          id="outlined-search2"
          label="글쓴이를 입력하세요"
          type="text"
          variant="outlined"
          fullWidth
          value={author}
          style={{ margin: "10px 0px" }}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <TextField
          id="outlined-textarea"
          label="내용을 입력하세요"
          placeholder="내용을 입력하세요"
          multiline
          variant="outlined"
          fullWidth
          value={contents}
          style={{ margin: "10px 0px" }}
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
        <ButtonBox>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.goBack();
            }}
          >
            돌아가기
          </Button>
          <Button
            variant="contained"
            color="default"
            onClick={() => {
              dispatch(
                postActions.updatePostFB({
                  post_id: parseInt(props.match.params.id),
                  author: author,
                  post_title: title,
                  contents: contents,
                })
              );
              history.replace("/");
            }}
          >
            수정완료
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
  width: 187px;
  display: flex;
  justify-content: space-between;
`;

export default PostDetail;
