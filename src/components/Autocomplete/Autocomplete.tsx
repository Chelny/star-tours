import React, {useRef, useState} from 'react';
import './Autocomplete.css';

function Autocomplete(props: { id: string, data: any[], onSelectedItem: (value: string) => void }) {
  const [resultsVisibility, setResultsVisibility] = useState(false);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef(null);

  const handleInputChange = (query: string) => {
    setQuery(query);
  }

  const handleListItemClick = (item: string) => {
    props.onSelectedItem(item);
    setResultsVisibility(false);
    if (searchInputRef.current) (searchInputRef.current as any).value = item;
  }

  return (
    <div className="autocomplete">
      <input
        ref={el => (searchInputRef.current as any) = el}
        type="search"
        id={props.id}
        placeholder="Search..."
        onClick={() => setResultsVisibility(true)}
        onMouseOver={() => setResultsVisibility(true)}
        onInput={e => handleInputChange((e.target as any).value)}
      />
      {resultsVisibility && <ul
        className="suggestions"
        onMouseLeave={() => setResultsVisibility(false)}>
        {props.data
          .filter(datum => datum.name.toLowerCase().includes(query.toLowerCase()))
          .map((datum, key) => <li
            key={key}
            onClick={(e) => handleListItemClick(e.currentTarget.innerText)}
          >
            {datum.name}
          </li>)
        }
      </ul>}
    </div>
  );
}

export default Autocomplete;
