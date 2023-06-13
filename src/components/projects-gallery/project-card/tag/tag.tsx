import "./tag.css";

function Tag(props: { tag: string }) {
  const { tag } = props;
  return <li className="tag">{tag}</li>;
}

export default Tag;
