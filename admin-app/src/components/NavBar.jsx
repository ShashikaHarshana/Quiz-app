import {Avatar, Navbar, Popover, Switch, Link} from '@nextui-org/react'
import React, {useEffect, useState} from 'react'
import { Icon } from '@iconify/react';

export default function NavBar({onTroggleTheme, isDark}) {

  const[username, setUsername] = useState('User')

  const handleDarkMode = () => {
    if(isDark){
      localStorage.setItem('isDark', 'false' )
    } else if(!isDark){
      localStorage.setItem('isDark', 'true' )
    }
  }

  const[timeOfDay, setTimeOfDay] = useState('')

  useEffect(() => {
    const currentHour = new Date().getHours()

    if(currentHour >= 5 && currentHour < 12){
      setTimeOfDay('Morning')
    } else if(currentHour >= 12 && currentHour < 17){
      setTimeOfDay('Afternoon')
    } else if(currentHour >= 17 && currentHour < 21){
      setTimeOfDay('Evening')
    } else {
      setTimeOfDay('Night')
    }
  })

  return (
    <div className={`${isDark? 'dark' : ''}`}>
      {/*<Navbar  css={{shadow:'none'}} isBordered >
        <Navbar.Brand css={{fontSize:'20px',fontWeight:'$semibold'}}>
          WelcomeBack! 👋
        </Navbar.Brand>
        <Navbar.Content>
            {isDark===true &&
              <Navbar.Link onClick={handleDarkMode}>
                <Icon onClick={onTroggleTheme} height={25} icon="ri:sun-fill" />
              </Navbar.Link>
            }
            {isDark===false &&
              <Navbar.Link onClick={handleDarkMode}>
                <Icon onClick={onTroggleTheme} height={25} icon="ri:moon-fill" />
              </Navbar.Link>
            }
          
          
          {/*<Popover placement='bottom-right'>
            <Popover.Trigger>
              <Icon height={25} icon="uil:setting" />
            </Popover.Trigger>
            <Popover.Content>
              <div style={{paddingTop:'5px'}}>
                <div className='setting-item'>
                  <span style={{fontWeight:'bold'}}>
                    Dark Mode
                  </span>
                  <span>
                    <Switch checked onChange={onTroggleTheme}/>
                  </span>
                </div>
                <div className='setting-item'>
                  <span style={{fontWeight:'bold'}}>
                    Dark Mode
                  </span>
                  <span>
                    <Switch />
                  </span>
                </div>
              </div>
            </Popover.Content>
          </Popover>}
          <Avatar
            size="lg"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            color="primary"
            bordered
          />
        </Navbar.Content>
      </Navbar>*/}
      <nav className='navbar'>
        <div>
          <h4 style={{marginTop:'3px'}}>Good {timeOfDay}!&nbsp;{username}</h4>
        </div>
        <div className='navbar-content'>
          <div>
            {isDark &&
              <a onClick={handleDarkMode}>
                <Icon onClick={onTroggleTheme} height={25} icon="ri:sun-fill" />
              </a>
            }
            {!isDark  &&
              <a onClick={handleDarkMode}>
                <Icon onClick={onTroggleTheme} height={25} icon="ri:moon-fill" />
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
        
      </nav>
    </div>
  )
}
