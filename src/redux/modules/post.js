import { firestore } from "../../firebase";
import firebase from "firebase/app";

const post_db = firestore.collection("post");
const post_id_db = firestore.collection("post_num").doc("post_num");

const increment = firebase.firestore.FieldValue.increment(1);

// Actions
const ADD = "post/ADD";
const LOAD = "post/LOAD";
const DELETE = "post/DELETE";
const UPDATE = "post/UPDATE";
const INCREASE = "post/INCREASE";

// initialState
const initialState = {
  list: [
    // {
    //   post_id: 1,
    //   author: "홍길동",
    //   post_title: "홍길동전",
    //   contents: "옛날 옛적에 ~",
    // },
  ],
};

// ActionCreator
const addPost = (post) => {
  return { type: ADD, post };
};

const loadPost = (post) => {
  return { type: LOAD, post };
};

const deletePost = (post_id) => {
  return { type: DELETE, post_id };
};

const updatePost = (post) => {
  return { type: UPDATE, post };
};

const increase = (num) => {
  return { type: INCREASE, num };
};

const loadPostFB = () => {
  return function (dispatch, getState) {
    post_db
      .orderBy("post_id", "desc")
      .get()
      .then((docs) => {
        let post_data = [];

        docs.forEach((doc) => {
          // console.log(doc.id);
          if (doc.exists) {
            post_data = [...post_data, { id: doc.id, ...doc.data() }];
          }
        });
        // console.log("post_data: ", post_data);
        dispatch(loadPost(post_data));
      });
  };
};

const addPostFB = (post) => {
  return function (dispatch, getState) {
    let post_data = post;
    // console.log("post_data: ", post_data);

    post_db.add(post_data).then((docRef) => {
      post_data = { ...post_data };
      // dispatch(addPost(post_data));
    });

    post_id_db.update({ max_num: increment });
  };
};

const deletePostFB = (post_id) => {
  return function (dispatch, getState) {
    const post_data = getState().post.list;
    // console.log("post_data: ", post_data);

    const _post_data = post_data.filter((p, idx) => {
      // console.log("pid: ", p.post_id, "post_id: ", post_id);
      return p.post_id === post_id;
    });
    // console.log(_post_data[0].id);

    if (!_post_data) {
      return;
    }

    post_db
      .doc(_post_data[0].id)
      .delete()
      .then((docRef) => {
        dispatch(deletePost(post_id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const updatePostFB = (post) => {
  return function (dispatch, getState) {
    const post_list = getState().post.list;
    // console.log("기존값: ", post_list);
    // console.log("수정할값: ", post);

    const _post_list = post_list.filter((p, idx) => {
      return p.post_id === post.post_id;
    });
    // console.log("_post_list: ", _post_list);

    const result = {
      post_id: post.post_id,
      author: post.author,
      contents: post.contents,
      post_title: post.post_title,
    };
    // console.log("result: ", result);

    post_db
      .doc(_post_list[0].id)
      .update(result)
      .then((docRef) => {
        dispatch(updatePost(post));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD: {
      // console.log("action: ", action);
      if (action.post.length > 0) {
        return { list: action.post };
      }
      return state;
    }
    case ADD: {
      const new_post = [action.post, ...state.list];
      return { list: new_post };
    }
    case DELETE: {
      const post_list = state.list.filter((list, idx) => {
        if (list.post_id !== action.post_id) {
          return list;
        }
      });
      return { list: post_list, max_num: state.max_num };
    }
    case UPDATE: {
      // console.log("action: ", action.post);
      // console.log("state: ", state);
      const post_list = state.list.map((list, idx) => {
        // console.log("리스트: ", list);
        // console.log(
        //   "list번호: ",
        //   list.post_id,
        //   "action번호: ",
        //   action.post.post_id
        // );
        if (list.post_id === action.post.post_id) {
          // console.log("t/f: ", list.post_id === action.post.post_id);
          // console.log("수정됨: ", {
          //   ...list,
          //   author: action.post.author,
          //   post_title: action.post.post_title,
          //   contents: action.post.contents,
          // });
          return {
            ...list,
            author: action.post.author,
            post_title: action.post.post_title,
            contents: action.post.contents,
          };
        }
        // console.log("t/f: ", list.post_id === action.post.post_id);
        // console.log("수정안됨: ", list);
        return list;
      });
      // console.log(post_list);
      return { list: post_list, max_num: state.max_num };
    }
    case INCREASE: {
      return { ...state, max_num: action.num };
    }
    default:
      return state;
  }
}

const actionCreators = {
  addPost,
  loadPost,
  deletePost,
  updatePost,
  increase,
  loadPostFB,
  addPostFB,
  deletePostFB,
  updatePostFB,
};

export { actionCreators };
