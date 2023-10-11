import React, {useState, useEffect} from 'react'
import './NavBar.css'
import {Avatar} from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { useLocation } from 'react-router-dom'

export default function NavBar({onThemeToggle, isDark}) {
  const [isLog, setIsLog] = useState(false)

  const handleTheme = () => {
    if(isDark === true){
      localStorage.setItem('isDark','false')
    }
    else if(isDark === false){
      localStorage.setItem('isDark','true')
    }
  }

  const location = useLocation()
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    const pathname = location.pathname
    if(pathname.startsWith('/textEditor') ){
      setActiveTab('textEditor')
    }else if(pathname.startsWith('/tutorial')){
      setActiveTab('tutorial')
    }else if(pathname.startsWith('/quiz')){
      setActiveTab('quiz')
    }else if(pathname.startsWith('/challenges')){
      setActiveTab('challenges')
    }
  }, [location])

  return (
    <div className='navbar'>
      <div style={{paddingLeft:'25px'}}>
        <h1 className='logo-text'>CodePedia</h1>
      </div>
      <div className='navigation-tabs' > 
        <div className='navigation-tabs-container' >
          <a href='/textEditor'><span className={`navigation-tab ${activeTab === 'textEditor'? 'active-navigation-tab' : ''}`}>Online Compiler</span></a>
          <a href='/tutorial/home'><span className={`navigation-tab ${activeTab === 'tutorial'? 'active-navigation-tab' : ''}`}>Tutorials</span></a>
          <a href='/quiz/home'><span className={`navigation-tab ${activeTab === 'quiz'? 'active-navigation-tab' : ''}`}>Quizzes</span></a>
          <a href='/challenges/home'><span className={`navigation-tab ${activeTab === 'challenges'? 'active-navigation-tab' : ''}`}>Challenges</span></a>
        </div>
        <div>
          {isDark &&
            <a onClick={onThemeToggle} >
              <Icon onClick={handleTheme} style={{marginTop:'8px'}} height={25} icon="ph:sun-fill" />
            </a>
          }

          {!isDark &&
            <a onClick={onThemeToggle}>
              <Icon onClick={handleTheme} style={{marginTop:'8px'}} height={25} icon="ph:moon-fill" />
            </a>
          }
        </div>
        <div>
          <Avatar
            size="lg"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            color="primary"
            bordered
          />
        </div>
      </div>
    </div>
  )
}
