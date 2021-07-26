import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { SyncLoader } from 'react-spinners';
import throttle from "lodash/throttle";
import "isomorphic-fetch";
import Gif from './components/Gif';
import Header from './components/Header';
import { fetchGifs, searchGifs } from "./helpers/gipphyApi";
import {
  COLUMNS_COUNTS_BREAK_POINTS,
  TEXT_SEARCH_WAIT,
  GIPPHY_COUNT_PER_REQUEST,
  TIME_BEFORE_NEXT_FETCH,
} from './constants';
import './App.css';

function App() {
  const [gifs, setGifs] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [offSet, setOffSet] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchTimeoutId, setSearchTimeoutId] = useState();

  function scrollHandler() {
    const documentElement = document.documentElement;
    const offset = documentElement.scrollTop + window.innerHeight;
    const height = documentElement.offsetHeight;

    if (!searchText && offset >= height) {
      setIsLoading(true);
      throttle(() => {
        fetchGifs(offSet + GIPPHY_COUNT_PER_REQUEST).then(res => {
        setGifs(gifs.concat(res.data));
        setOffSet(offSet + GIPPHY_COUNT_PER_REQUEST);
        setIsLoading(false);
      }).catch(err => console.log(err));
    }, TIME_BEFORE_NEXT_FETCH)();
    }
  }

  useEffect(() => {
    fetchGifs(offSet).then(res => {
      setGifs(res.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    }
  });

  function handleSearch(e) {
    const text = e.target.value;
    setSearchText(text);
    clearTimeout(searchTimeoutId);

    if(text) {
      const timeoutId = setTimeout(() => {
        searchGifs(text).then(res => {
        setGifs(res.data);
      }).catch(err => console.log(err));
    }, TEXT_SEARCH_WAIT);
    setSearchTimeoutId(timeoutId)
    } else {
      fetchGifs(0).then(res => {
        setGifs(res.data);
        setOffSet(GIPPHY_COUNT_PER_REQUEST);
      });
    }
  }

  return (
    <div className={`App ${isDarkTheme ? 'dark' : ''}`}>
      <Header
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        searchText={searchText}
        handleSearch={handleSearch}
      />
      <ResponsiveMasonry
        className="responsive-grid"
        columnsCountBreakPoints={COLUMNS_COUNTS_BREAK_POINTS}
      >
        <Masonry>
          {gifs && gifs.map(gif => <Gif key={gif.id} gif={gif} />)}
        </Masonry>
      </ResponsiveMasonry>
      {isLoading && <SyncLoader />}
    </div>
  );
}

export default App;
