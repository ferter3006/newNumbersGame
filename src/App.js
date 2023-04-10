import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from './Redux/store'
import { Provider } from 'react-redux'
import HomeScreen from "./Screens/HomeScreen";
import Login from "./Screens/Login";
import ClassicGameScreen from "./Screens/ClassicGameScreen";
import { useState } from "react";
import CarreraModeScreen from "./Screens/CarreraModeScreen";


function App() {

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [boardSize, setBoardSize] = useState(isMobile ? 340 : 650 )

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/clasic" element={<ClassicGameScreen boardSize={boardSize} />} />
          <Route path="/carrera" element={<CarreraModeScreen boardSize={boardSize} />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;