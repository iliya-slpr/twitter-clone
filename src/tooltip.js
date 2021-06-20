import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}></Tooltip>
);

render(
  <OverlayTrigger
    placement="right"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip}
  >
    {props.like}
  </OverlayTrigger>
);
export default OverlayTrigger;
