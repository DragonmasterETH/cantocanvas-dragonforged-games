import Canvas from "./pages/Canvas";
import logo from './logo.svg';
import { Web3Provider } from './util/Web3Context';
import './App.css';

function App() {
  return (
    <Web3Provider>
    <Canvas/>
    </Web3Provider>
  );
}

export default App;
