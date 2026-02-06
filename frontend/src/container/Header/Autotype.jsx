import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Autotype = ({ strings }) => {
  const typedElement = useRef(null);
  const typedRef = useRef(null);

  useEffect(() => {
    if (typedElement.current) {
      typedRef.current = new Typed(typedElement.current, {
        strings: strings,
        typeSpeed: 100, 
        backSpeed: 40, 
        loop: true, 
      });
    }

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, [strings]);

  return <span ref={typedElement} />;
};

export default Autotype