import { DARK_THEME_COLOR, LIGHT_THEME_COLOR } from '../constants';

export default function Header(props) {
  const { isDarkTheme, setIsDarkTheme, searchText, handleSearch } = props;
  return (
    <div className="header">
      <h1 style={{color: `${isDarkTheme ? DARK_THEME_COLOR : LIGHT_THEME_COLOR}`}}>Trending Gifs</h1>
      <input placeholder="Search Giffy" value={searchText} onChange={handleSearch} className="search-bar" />
      <button
        onClick={() => setIsDarkTheme(!isDarkTheme)}
        className="theme-button"
      >
        {`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
      </button>
    </div>
  );
}
