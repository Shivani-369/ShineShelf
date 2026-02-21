"use client";
import React, { useState } from 'react';

interface BookCoverProps {
    src?: string;
    title: string;
    className?: string;
}

const BookCover: React.FC<BookCoverProps> = ({ src, title, className = "" }) => {
    const [primaryError, setPrimaryError] = useState(false);
    const [fallbackError, setFallbackError] = useState(false);

    // Open Library cover image fetched by title as a fallback
    const openLibraryUrl = `https://covers.openlibrary.org/b/title/${encodeURIComponent(title)}-L.jpg`;

    // Decide which image URL to use
    const imageSrc = src && !primaryError ? src : (!primaryError ? src : openLibraryUrl);
    const showOpenLibrary = (!src || primaryError) && !fallbackError;

    // Last resort: plain placeholder when both images fail
    if ((!src || primaryError) && fallbackError) {
        return (
            <div
                className={`w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center p-4 text-center border border-white/10 rounded-lg overflow-hidden shadow-inner ${className}`}
            >
                <span className="text-white/50 text-sm font-medium leading-tight select-none line-clamp-4">
                    {title}
                </span>
            </div>
        );
    }

    return (
        <div className={`relative w-full h-full group overflow-hidden rounded-lg ${className}`}>
            {showOpenLibrary ? (
                <img
                    src={openLibraryUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={() => setFallbackError(true)}
                />
            ) : (
                <img
                    src={src}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={() => setPrimaryError(true)}
                />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        </div>
    );
};

export default BookCover;
