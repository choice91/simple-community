import "./App.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import PostList from "./components/PostList";
import PostWrite from "./components/PostWrite";
import PostDetail from "./components/PostDetail";
import PostUpdate from "./components/PostUpdate";

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact component={PostList} />
        <Route path="/write" exact component={PostWrite} />
        <Route path="/write/:id" exact component={PostDetail} />
        <Route path="/update/:id" exact component={PostUpdate} />
      </BrowserRouter>
    </>
  );
}

export default App;
