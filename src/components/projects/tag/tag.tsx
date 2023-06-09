import "./tag.css";
type TagProps = {
	tag:string,
	key:string
}

function Tag(props:TagProps) {
	const tagName = props.tag;
	return (
		<li className="tag">
			{tagName}
		</li>
	);
}
export default Tag;
