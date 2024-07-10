import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home/home';
import { Trends } from './Pages/Trends/trends';
import { Archive } from './Pages/Archive/archive';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h1: {
      color: 'white'
    },
    h2: {
      color: 'white'
    },
    h3: {
      color: 'white'
    },
    h4: {
      color: 'white'
    },
    h5: {
      color: 'white'
    },
    body1: {
      color: 'black'
    },
    body2: {
      color: 'white'
    }
  },
  components: {
    // Name of the component
    
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          color: '#fff',
          borderColor: '#fff'
        },
        MuiFocused : {
          borderrColor: '#ff0'
        },
        inputRoot: {
          color: '#fff',
          borderColor: '#fff',
        },
        clearIndicator: {
          color: 'white'
        },
        popupIndicator: {
          color: '#fff'
        },
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          color: '#fff'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#fff',
          
        }
      }
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'white' },
          style: {
            textTransform: 'none',
            color: 'white',
            width: '100%',
            border: `2px solid #fff`,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
            border: `4px dashed #f00`,
          },
        },
      ],
    },
  },
 
});

function App() {
  return (
    <ThemeProvider theme={theme}>
       <BrowserRouter  basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wxtrends" element={<Trends />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
        
        
      </BrowserRouter>
    </ThemeProvider>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
   
  );
}

export default App;
