import { useState, useCallback, useRef, useEffect } from "react";

export function useHeader() {
    const menuRef = useRef<HTMLUListElement>(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const toggleHeader = useCallback(() => {
        setIsMenuVisible(!isMenuVisible);
    }, [isMenuVisible]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return { 
        isMenuVisible, 
        toggleHeader, 
        menuRef
     };
}