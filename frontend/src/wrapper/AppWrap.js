import React from 'react'
import { NavigationDots, Socialmedia } from '../components'
const AppWrap = (Component, idName, classNames) => function HOC() {
    return (
        <div id={idName} className={`app__container ${classNames}`}>
            <Socialmedia />
            <div className='app__wrapper app__flex'>
                <Component />
                <div className='copyright'>
                    <p className='p-text'>Created by <span>Nasir Ali ❤️</span></p>
                   
                </div>
            </div>
            <NavigationDots active={idName}/>
        </div>
    )
}

export default AppWrap