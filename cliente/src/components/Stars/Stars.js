import React from 'react';
import './Stars.scss';


export const Stars = function (props){
    const stars = props.value
    const setStars = props.function
    const clck = props.click === "true";
    var draw = [];
    let clname = "";
    for(let i = 1; i <= 5; i++){
        if(stars>=i){//i = 3, stars = 4
            clname = "icon-star-full boldStar"
        }
        else{//i = 5, stars = 4
            clname = "icon-star-empty boldStar"
        }
        if(clck){
            draw.push(<span 
                key={i}
                className={clname}
                onClick={()=>{
                    setStars(i);
                }}
            ></span>)
        }
        else{
            draw.push(<span key={i} className={clname}/>)
        }
    }
    return(
        <div className="allStars">
            {draw}
        </div>
    )
}