import StarIcon from '@mui/icons-material/Star';

const ContactCard = ({ name, tag, tagColor, role, image }) => (
  <div className="flex flex-row gap-2 items-center justify-between border-1 p-4 hover:bg-gray-900 rounded-4xl">
    <div className="flex flex-row gap-4 items-center">
      <div className="h-10 w-10 rounded-4xl overflow-hidden">
        <img src={image} className="w-full h-full object-cover" alt={name} />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-3">
          <div className="text-xl font-bold">{name}</div>
          <div className={`p-2 ${tagColor} rounded-3xl text-xs font-bold flex items-center`}>
            {tag}
          </div>
        </div>
        <div>{role}</div>
      </div>
    </div>
    <div className="flex items-center justify-center h-10 w-10 bg-transparent border-2 p-2 rounded-full cursor-pointer">
      <StarIcon className="text-white" />
    </div>
  </div>
);

export default ContactCard;
