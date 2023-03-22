import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function HoverPopUP({ imgData }) {

    const renderTooltip = props => (
        <Tooltip {...props} stylename="tooltip" >
            <div className="" >
                <p >Background Photo Info</p>
                <hr></hr>
                <p>{imgData.copyright}</p>
                <hr></hr>
                <p>From Bing.com</p>
            </div>
        </Tooltip>
    );

    return (
        <div className="popup-icon ">
            <OverlayTrigger placement="top" overlay={renderTooltip}>
                <a href={(imgData ? imgData.copyrightlink : "#")} target="_blank" rel="noreferrer"><i className="fa-solid fa-location-dot" style={{ color: "#ebe5e5" }}></i></a>
            </OverlayTrigger>
        </div>
    );
}

