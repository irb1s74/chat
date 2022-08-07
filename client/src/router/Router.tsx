import {FC, memo} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Chat from "../container/Chat/Chat";
import Auth from "../container/Auth/Auth";

interface RouterProps {
    isAuth: boolean
}

const Router: FC<RouterProps> = memo(({isAuth}) => {
    return (
        <Routes>
            {isAuth ? (
                <>
                    <Route path='' element={<Chat/>}/>
                    <Route path='*' element={<Navigate to=''/>}/>
                </>
            ) : (
                <>
                    <Route path='auth' element={<Auth/>}/>
                    <Route path='*' element={<Navigate to='auth'/>}/>
                </>
            )}
        </Routes>
    );
});

export default Router;