import { Routes, Route } from 'react-router-dom';

import { Home, NotFound } from './index';
import { Footer, Header } from './components';

const App = () => {
  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
