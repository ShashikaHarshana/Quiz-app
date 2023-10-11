import './App.css';

import {NextUIProvider, createTheme} from "@nextui-org/react";
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import Body from './components/Body';
import {useState, useEffect} from 'react';

const lightTheme = createTheme({
  type: 'light',
  theme: {
   colors:{
    error:'#dc3545',
    secondary:'#edeff1',
   }
  },
  
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors:{
      error:'#dc3545',
      secondary:'#1e2122',
    }
  }
})

function App() {
  const [isDark, setIsDark] = useState()

  useEffect(() => {
    const getIsDark = localStorage.getItem('isDark')
    
    if(getIsDark===null){
      setIsDark(false)
    }else if(getIsDark==='true'){
      setIsDark(true)
    }else if(getIsDark==='false'){
      setIsDark(false)
    }
    
    
  })
  
  return (
    <div style={{overflowY:'hidden', height:'100vh'}}>
      <NextUIProvider theme={isDark? darkTheme : lightTheme}>
        <div className='main'>
          <section className='left-section'>
            <SideBar isDark={isDark}/>
          </section>
          <section className='right-section'>
            <NavBar onTroggleTheme={()=>setIsDark(!isDark)} isDark={isDark}/>
            <Body isDark={isDark}/>
          </section>
        </div>
      </NextUIProvider>
    </div>
  );
}

export default App;
