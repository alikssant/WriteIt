import { TextCard } from "components/TextCard/TextCard";

export function NoteBrowse(props) {
  return (
    <>
      <TextCard
        title={"Super note"}
        subtitle={"10.12.2024"}
        content={"An apple a day keeps the doctor away"}
        onClick={() => alert("OnClick !")}
        onClickTrash={() => alert("OnclickTrash !")}
      />
    </>
  );
}
