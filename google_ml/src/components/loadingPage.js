import React from 'react'
import './loadingPage.css'
import Loading1 from '../static/Ouroboros.png'
import { useSpring, animated } from 'react-spring';

export default (props) => {
        const styles = useSpring({
            loop: true,
            from: { rotateZ: 0 },
            to: { rotateZ: 360 },
            config: {duration: 5000},
        })
  return (
    <div className='loadingPageWrapper'>
        <div className='loadingImgDiv'>
        <animated.img 
                src={Loading1} 
                style={{
                    ...styles
                }}/>
        </div>
        <h1>...Loading</h1>
    </div>
  )
}
