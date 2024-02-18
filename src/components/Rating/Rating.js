import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap'
import { MdOutlineStar,MdOutlineStarBorder, MdOutlineStarHalf  } from "react-icons/md";
import './Rating.css';

const Rating = (props) => {
const { rating } = props;
const cnt_rating = rating[1];
  return (
    <>
    <span className='rating' >
        {rating[0] == null ? <><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/></> :
        rating[0] >= 0 && rating[0] <= 10 ? <><MdOutlineStarHalf size={30}/><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/></> :
        rating[0] > 10 && rating[0] <= 20 ? <><MdOutlineStar size={30}/><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/></> :
        rating[0] > 20 && rating[0] <= 30 ? <><MdOutlineStar size={30}/><MdOutlineStarHalf size={30}/><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/></> :
        rating[0] > 30 && rating[0] <= 40 ? <><MdOutlineStar size={30}/><MdOutlineStar size={30}/><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/></> :
        rating[0] > 40 && rating[0] <= 50 ? <><MdOutlineStar size={30}/><MdOutlineStar size={30}/><MdOutlineStarHalf size={30}/><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/></> :
        rating[0] > 50 && rating[0] <= 60 ? <><MdOutlineStar size={30}/><MdOutlineStar size={30}/><MdOutlineStar size={30}/><MdOutlineStarBorder size={30}/><MdOutlineStarBorder size={30}/></> :
        rating[0] > 60 && rating[0] <= 70 ? <><MdOutlineStar size={30}/><MdOutlineStar size={30}/><MdOutlineStar size={30}/><MdOutlineStarHalf size={30}/><MdOutlineStarBorder size={30}/></> :
        rating[0] > 70 && rating[0] <= 80 ? <><MdOutlineStar size={30}/><MdOutlineStar size={30}/><MdOutlineStar size={30}/><MdOutlineStar size={30}/><MdOutlineStarBorder size={30}/></> :
        rating[0] > 80 && rating[0] <= 90 ? <><MdOutlineStar size={30}/><MdOutlineStar size={30}/><MdOutlineStar size={30}/><MdOutlineStar size={30}/><MdOutlineStarHalf size={30}/></> :
        <><MdOutlineStar size={30}/><MdOutlineStar size={30}/><MdOutlineStar size={30}/><MdOutlineStar size={30}/><MdOutlineStar size={30}/></>
        }
        {cnt_rating !== 0 || cnt_rating === undefined ? <span className='numOfRatings'>({cnt_rating})</span> : <span></span>}
    </span>
  </>
    );
};

export default Rating;
