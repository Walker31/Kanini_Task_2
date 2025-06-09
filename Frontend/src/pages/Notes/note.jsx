import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Note = ({ note, onClick, onDelete }) => {
  return (
    <div className="bg-gray-700 m-4 p-4 max-w-xl rounded-2xl h-52 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xl text-white font-bold truncate">
          {note.title}
        </div>
        <div className="text-sm text-gray-300 px-2 py-1 bg-gray-800 rounded whitespace-nowrap">
          {note.category}
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div className="pr-1 text-white text-sm">{note.content}</div>
        <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-gray-700 to-transparent pointer-events-none" />
      </div>

      <div className="flex justify-between">
        <div className="text-xs text-gray-400 mt-2 self-start">
          {note.updatedAt
            ? new Date(note.updatedAt).toUTCString()
            : "No date"}
        </div>
        <div>
          <IconButton onClick={onClick}>
            <EditIcon className="text-gray-500" />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteIcon className="text-gray-500" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Note;
