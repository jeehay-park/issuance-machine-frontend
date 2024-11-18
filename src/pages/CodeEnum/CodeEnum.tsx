import React from "react";
import { useLocation } from "react-router-dom";

const CodeEnum: React.FC = () => {

    const { state } = useLocation();

    console.log(state);


    return(<>
    <p>코드 ENUM</p>
    </>)
}

export default CodeEnum;