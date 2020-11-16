import { Link } from "react-router-dom";

export default function PageLink(props) {
  return (
    <>
      <div>
        <Link to={`/${props.name}`} style={{ textDecoration: "none", color: "inherit", backgroundColor: "lightblue" }}>
          {props.name}
        </Link>
      </div>
      <br></br>
    </>
  )
};
