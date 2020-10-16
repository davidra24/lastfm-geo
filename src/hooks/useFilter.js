import React, { useMemo, useState } from "react";

export const useSearchTracks = (tracks) => {
    const [query, setQuery] = useState('');
    const [filteredTracks, setFilteredTracks] = useState(tracks);
  
    useMemo(() => {
      const result = tracks.filter(track => {
        return `${track.name} ${track.artist.name}`
          .toLowerCase()
          .includes(query.toLowerCase());
      });
  
      setFilteredTracks(result);
    }, [tracks, query]);
  
    return { query, setQuery, filteredTracks };
  }
  