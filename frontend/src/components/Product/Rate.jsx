import { useState } from 'react'

const Rate = ({ stars, setStars, color }) => {
  const [oldStars, setOldStars] = useState(stars)

  const mouseOverHandler = (e) => {
    setOldStars(stars)
    setStars(Number(e.target.id))
  }

  const mouseLeaveHandler = (e) => setStars(oldStars)

  const clickHandler = (e) => {
    setOldStars(Number(e.target.id))
    setStars(Number(e.target.id))
  }

  return (
    <div className='longer-rating'>
      <span>
        <i
          style={{ color }}
          id='1'
          className='fas fa-star'
          onMouseOver={mouseOverHandler}
          onMouseLeave={mouseLeaveHandler}
          onClick={clickHandler}
        ></i>
        <i
          style={{ color }}
          id='2'
          className={stars > 1 ? 'fas fa-star' : 'far fa-star'}
          onMouseOver={mouseOverHandler}
          onMouseLeave={mouseLeaveHandler}
          onClick={clickHandler}
        ></i>
        <i
          style={{ color }}
          id='3'
          className={stars > 2 ? 'fas fa-star' : 'far fa-star'}
          onMouseOver={mouseOverHandler}
          onMouseLeave={mouseLeaveHandler}
          onClick={clickHandler}
        ></i>
        <i
          style={{ color }}
          id='4'
          className={stars > 3 ? 'fas fa-star' : 'far fa-star'}
          onMouseOver={mouseOverHandler}
          onMouseLeave={mouseLeaveHandler}
          onClick={clickHandler}
        ></i>
        <i
          style={{ color }}
          id='5'
          className={stars > 4 ? 'fas fa-star' : 'far fa-star'}
          onMouseOver={mouseOverHandler}
          onMouseLeave={mouseLeaveHandler}
          onClick={clickHandler}
        ></i>
      </span>
    </div>
  )
}

Rate.defaultProps = {
  stars: 5,
  setStars: (v) => (Rate.defaultProps.stars = v),
  color: '#FFB500',
}

export default Rate
