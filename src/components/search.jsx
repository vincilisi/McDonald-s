import React from 'react';

import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchButtonWithInput = () => {
    const [showInput, setShowInput] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    const doSearch = () => {
        const trimmed = query.trim().toLowerCase();
        if (trimmed) {
            navigate("prodotti/" + trimmed);
            // NON cancelliamo il testo
        }
    };

    const handleClick = () => {
        if (!showInput) {
            setShowInput(true);
        } else if (query.trim()) {
            doSearch();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setShowInput(false);
            setQuery("");
        } else if (e.key === "Enter") {
            doSearch();
        }
    };

    // Chiudi se clic fuori
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                if (query.trim() === "") {
                    setShowInput(false);
                    setQuery("");
                }
            }
        };
        if (showInput) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showInput, query]);

    // Focus automatico
    useEffect(() => {
        if (showInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showInput]);

    return (
        <div ref={containerRef} className="flex items-center gap-2 relative">
            {showInput && (
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="Cerca prodotto..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-48 px-3 py-2 text-sm rounded-md border-none outline-none transition duration-300 text-black"
                />
            )}
            <button
                onClick={handleClick}
                aria-label="Search"
                className={`text-lg p-2 rounded-full transition-colors duration-300 ${showInput
                    ? "bg-mcdRed text-white"
                    : "bg-mcdYellow text-black hover:bg-mcdRed hover:text-white"
                    }`}
            >
                <FaSearch />
            </button>
        </div>
    );
};

export default SearchButtonWithInput;
