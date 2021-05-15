

import NavigateNextSharpIcon from '@material-ui/icons/NavigateNextSharp';
import NavigateBeforeSharpIcon from '@material-ui/icons/NavigateBeforeSharp';
import {Box,Container,Grid, Typography} from '@material-ui/core'



import * as React from "react";
import { motion, AnimatePresence } from "framer-motion"
import { wrap } from "popmotion";
import { images } from "../../assets/fondo/image";
import { useState } from "react";
import {makeStyles } from '@material-ui/core/styles';

import "./imagen.css"










const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};
//........................................

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};


  
















const Imagen = () => {

const [[page, direction], setPage] = useState([0, 0]);

//.......

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };


   

    return (
      <>
         



    
    <NavigateNextSharpIcon className="next" style={{color:"white"}} onClick={() => paginate(1)}>
     
     </NavigateNextSharpIcon>
    
      <AnimatePresence initial={false} custom={direction} >


      



     
      
        <motion.img
          
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
        
      
      </AnimatePresence>

      <NavigateBeforeSharpIcon className="prev" style={{color:"white"}} onClick={() => paginate(-1)}>

</NavigateBeforeSharpIcon>



 


      

      
      </>
      
    )
}

export default Imagen
