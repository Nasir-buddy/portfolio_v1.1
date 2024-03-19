import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Autotype = ({ strings }) => {
  const typedElement = useRef(null);
  let typed = null;

  useEffect(() => {
    if (typedElement.current) {
      typed = new Typed(typedElement.current, {
        strings: strings,
        typeSpeed: 100, 
        backSpeed: 40, 
        loop: true, 
      });
    }

    return () => {
      if (typed) {
        typed.destroy();
      }
    };
  }, [strings]);

  return <span ref={typedElement} />;
};

export default Autotype