import "./App.css";
import React from "react";
import { Route } from "react-router";

import PostList from "./components/PostList";
import PostWrite from "./components/PostWrite";
import PostDetail from "./components/PostDetail";
import PostUpdate from "./components/PostUpdate";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={PostList} />
      <Route path="/write" exact component={PostWrite} />
      <Route path="/write/:id" exact component={PostDetail} />
      <Route path="/update/:id" exact component={PostUpdate} />
    </div>
  );
}

export default App;
