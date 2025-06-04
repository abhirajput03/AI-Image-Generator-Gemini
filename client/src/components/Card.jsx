import { useLocation } from 'react-router';
import { download, remove } from '../assets';
import { downloadImage } from '../utils';

export const Card = ({ _id, user: { username }, prompt, postUrl, removePost, fetchGallery }) => {
  const location = useLocation();

  const handleRemove = async (_id) => {
    await removePost(_id)
    await fetchGallery()
  }
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full object-cover rounded-xl"
        src={postUrl}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{username[0].toUpperCase()}</div>
            <p className="text-white text-sm">{username}</p>
          </div>
          <div className='flex gap-2'>
            <button type="button" onClick={() => downloadImage(postUrl, _id)} className="outline-none bg-transparent border-none">
              <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
            </button>
            {location.pathname == "/gallery" && <button type="button" onClick={() => handleRemove(_id)} className="outline-none bg-transparent border-none">
              <img src={remove} alt="download" className="w-6 h-6 object-contain invert" />
            </button>}
          </div>
        </div>
      </div>
    </div>
  )
}
