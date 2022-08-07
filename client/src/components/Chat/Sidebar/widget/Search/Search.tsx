import React, {ChangeEvent, FC, memo} from "react";
import {BiSearchAlt2} from "react-icons/bi";
import {useDebounce} from "../../../../../hooks/useDebounce";

interface SidebarSearchProps {
    handleFindUser: (nickname: string) => void
}

const SidebarSearch: FC<SidebarSearchProps> = ({handleFindUser}) => {
    const handleOnChange = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
        handleFindUser(e.target.value)
    }, 1000)

    return (
        <div className="relative">
            <input
                onChange={handleOnChange}
                className="w-full bg-slate-50 px-3 py-4 rounded-md focus:ring ring-indigo-500 focus:outline-none transition ease-in-out shadow"
                placeholder="Поиск"
            />
            <button
                className="absolute top-1/2 translate-y-[-50%] right-2 w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500 hover:bg-indigo-600">
                <BiSearchAlt2 className="text-lg" color="FFF"/>
            </button>
        </div>
    );
};

export default memo(SidebarSearch);