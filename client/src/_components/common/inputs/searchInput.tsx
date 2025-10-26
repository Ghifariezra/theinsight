import { memo } from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    // InputGroupText,
    // InputGroupTextarea,
} from "@/_components/ui/input-group";
import { SearchIcon } from "lucide-react";

export const SearchInput = memo(({ id, setSearchInput}: { id: string, setSearchInput: (e: string) => void; }) => {
    return (
        <InputGroup className="rounded-full w-full min-w-0">
            <InputGroupInput 
                id={id}
                name={id}
                onChange={(e) => setSearchInput(e.target.value)}
                aria-label="Search"
                placeholder="Search..."
            />
            <InputGroupAddon>
                <InputGroupButton>
                    <SearchIcon />
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    );
});