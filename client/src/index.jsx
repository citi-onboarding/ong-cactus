import React from 'react';
import ReactDOM from 'react-dom';

import {
  Example,
  Navbar,
  Slider,
  Guests,
  Contact,
  Footer,
  Test,
} from './components';

function App() {
  return (
    <section className="app">
      <Navbar />
    </section>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))