import { createRoot } from 'react-dom/client';
import { MainView } from './Components/main-view/main-view';
import Container from 'react-bootstrap/Container';

import "bootstrap/dist/css/bootstrap.min.css";


// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
import React from 'react';
const App = () => {
  return (
    <Container style=  {{border: "1px solid red"}}>
      <MainView />
    </Container>
  );
};
 

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
