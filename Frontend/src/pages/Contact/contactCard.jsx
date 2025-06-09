import StarIcon from '@mui/icons-material/Star';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const tagOptions = [
  { value: "Work", label: "Work", color: "bg-amber-800" },
  { value: "Family", label: "Family", color: "bg-blue-800" },
  { value: "Friend", label: "Friend", color: "bg-green-800" },
];

const ContactCard = ({ name, tag, profession }) =>  {
  const currentTagOption = tagOptions.find(opt => opt.value === tag);
  const tagColorClass = currentTagOption ? currentTagOption.color : "bg-gray-500";

  return <>
  <div className="flex items-center justify-between border p-4 hover:bg-gray-900 rounded-xl cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
        <AccountCircleIcon className="text-white w-10 h-10" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-white">{name}</span>
          <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${tagColorClass}`}>
            {tag}
          </span>
        </div>
        <span className="text-sm text-gray-300">{profession}</span>
      </div>
    </div>
    <div className="h-10 w-10 border-2 border-white rounded-full flex items-center justify-center cursor-pointer">
      <StarIcon className="text-white" />
    </div>
  </div>
  </>
};

export default ContactCard;
