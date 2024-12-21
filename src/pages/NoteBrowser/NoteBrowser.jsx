import { NoteList } from "containersNoteList/NoteList";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from "./style.module.css";

export function NoteBrowse(props) {
  const noteList = useSelector((store) => store.noteSlice.noteList);
  return (
    <>
      {noteList?.length === 0 && (
        <div className="d-flex justify-content-center">
          <span className={s.link}>
            You don't have any note, do you want to{" "}
            <Link to="/note/new">create one</Link>
          </span>
        </div>
      )}
      <NoteList />
    </>
  );
}
