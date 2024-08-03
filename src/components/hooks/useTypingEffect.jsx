import { useState, useEffect } from 'react';

const useTypingEffect = (content, speed = 50) => {
  const [displayedContent, setDisplayedContent] = useState('');

  useEffect(() => {
    setDisplayedContent("");
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedContent((prev) => prev + content[index]);
      index++;
      if (index === content.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [content, speed]);
  if(displayedContent !== undefined){
    return displayedContent;
  }
};

export default useTypingEffect;
