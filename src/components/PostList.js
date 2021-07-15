import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as postNumActions } from "../redux/modules/postNum";

import Header from "./Header";

// import { firestore } from "../firebase";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "0 auto",
    maxWidth: 910,
  },
});

function PostList(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { history } = props;
  const post = useSelector((state) => state.post.list);
  // console.log(post_num);
  // console.log("post: ", post);

  const num = useSelector((state) => state.postNum.max_num);
  // console.log("max_num: ", num);

  React.useEffect(() => {
    dispatch(postActions.loadPostFB());
    dispatch(postNumActions.increaseFB());
  }, []);

  return (
    <>
      <Header history={props.history} />
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">글번호</TableCell>
              <TableCell align="center">글쓴이</TableCell>
              <TableCell align="center">글제목</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {post.map((list, idx) => {
              // console.log(list, idx);
              return (
                <TableRow
                  key={idx}
                  onClick={() => {
                    history.push(`/write/${post[idx].post_id}`);
                  }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {list.post_id}
                  </TableCell>
                  <TableCell align="center">{list.author}</TableCell>
                  <TableCell align="center">{list.post_title}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default PostList;
