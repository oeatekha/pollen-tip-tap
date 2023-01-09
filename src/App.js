import logo from "./logo.svg";
import "./App.css";
import Tiptap from "./Tiptap";
import NiceModal from '@ebay/nice-modal-react';
import ChannelComponent from "./channel/ChannelComponent";

// import HeaderMenu from "./HeaderMenu";

function App() {
  return (
    <NiceModal.Provider>
      <div className="App">
        <Tiptap />
      </div>
    </NiceModal.Provider> 
  );
}

export default App;
