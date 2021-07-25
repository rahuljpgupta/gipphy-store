import { useState } from 'react';

export default function Gif(props) {
  const [isPaused, setIsPaused] = useState(false);
  const { gif: {images: {fixed_width: gif, fixed_width_still: gifStill}} } = props;

  return (
    <div className="Gif" style={{width: gif.width, height: gif.height}} onClick={() => setIsPaused(!isPaused)}>
      {isPaused? (
        <>
          <img src={gifStill.url} />
          <img
          src="/play.png" width="100"
          style={{
            position: 'absolute',
            transform: `translate(-150px, ${(gifStill.height / 2) - 50}px)`
          }}
        />
      </>
      ) : (
        <img src={gif.url} />
      )}
    </div>
  );
}
