import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { BiCameraMovie, BiBookmarks } from "react-icons/bi";


interface Props {
    name: string
}

function MenuIcons(props: Props) {
    const { name } = props;
    switch (name) {
        case "Dashboard":
            return <MdOutlineDashboard style={{ strokeWidth: 0.1, fontSize: "25px", marginRight: "5px" }} />;
        case "Movies":
            return <BiCameraMovie style={{ strokeWidth: 0.1, fontSize: "23px", marginRight: "5px" }} />;
        case "Saved":
            return <BiBookmarks style={{ strokeWidth: 0.1, fontSize: "23px", marginRight: "5px" }} />;
        default:
            return null;
    }
}

export default MenuIcons;
