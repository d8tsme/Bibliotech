import "./Campo.css";

function Campo(name, link) {
    return (
        <li><a href={link}>{name}</a></li>
    );
}

export default Campo;