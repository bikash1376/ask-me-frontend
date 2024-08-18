import "./App.css";
import AskMeForm from "./components/AskMeForm";
import MessageList from "./components/MessageList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AskMeForm />} />
          <Route path="/admin-sees-everything" element={<MessageList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
