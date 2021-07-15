import { firestore } from "../../firebase";

const postIdDB = firestore.collection("post_num");

// Action Type
const INCREASE = "pid/INCREASE";

// initialState
const initialState = {
  post_num: 3,
};

// Action Creator
const increase = (num) => {
  return { type: INCREASE, num };
};

const increaseFB = () => {
  return function (dispatch, getState) {
    postIdDB
      .doc("post_num")
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log("doc: ", doc.data().max_num);
        }
        dispatch(increase(doc.data().max_num));
      });
  };
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREASE: {
      return { max_num: action.num };
    }
    default:
      return state;
  }
}

const actionCreators = {
  increase,
  increaseFB,
};

export { actionCreators };
