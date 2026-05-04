const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="px-3 py-2 bg-wa-dark-bg">
      <div className="flex items-center bg-wa-input rounded-lg px-3 py-1.5 gap-3 group focus-within:bg-wa-panel transition-colors">
        <svg
          className="w-4 h-4 text-wa-text-secondary shrink-0 group-focus-within:text-wa-teal transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search or start new chat"
          className="flex-1 bg-transparent text-wa-text-primary placeholder-wa-text-secondary/60 text-sm py-1 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="text-wa-text-secondary hover:text-wa-text-primary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
