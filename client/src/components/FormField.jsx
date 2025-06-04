import { microphone, remove, mute } from "../assets"
import SpeechRecognition from 'react-speech-recognition';

export const FormField = ({ labelName, name, type, value, placeholder, isSurpriseMe, handleChange, handleSurpriseMe, listening, resetTranscript, transcript }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-900">{labelName} </label>
        {
          isSurpriseMe && <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs py-1 px-2 rounded-[5px] text-black bg-[#ECECF1]"
          >
            surprise me
          </button>
        }
      </div>
      <div className="flex gap-2">
        <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={handleChange} required
          className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg block w-full
               p-3 outline-none focus:border-[#4649ff] focus:ring-[#4649ff]"
        />
        {isSurpriseMe && <>{listening ? (<>
          <button
            type="button"
            className="outline-none bg-transparent border-none"
            onClick={SpeechRecognition.stopListening}
          >
            <img src={mute} alt="download" className="w-6 h-6 object-contain" />
          </button>
        </>) :
          (<button
            type="button"
            className="outline-none bg-transparent rounded-full border hover:border-[#4649ff] hover:bg-gray-100"
            onClick={SpeechRecognition.startListening}
          >
            <img src={microphone} alt="download" className="w-6 h-6 object-contain" />
          </button>)}
          {
            transcript && <button
              type="button"
              className="outline-none bg-transparent border-none"
              onClick={resetTranscript}
            >
              <img src={remove} alt="download" className="w-6 h-6 object-contain" />
            </button>
          }
        </>}
      </div>
    </div>
  )
}
