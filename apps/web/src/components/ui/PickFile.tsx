import { UploadCloudIcon } from 'lucide-react'

export default function PickFile({handleFileSelect}: {handleFileSelect: (event: React.ChangeEvent<EventTarget>) => void}) {
  return (
    <>
      <label className='border border-gray-400 p-2 rounded-lg cursor-pointer' htmlFor='browseFile'>
        <UploadCloudIcon />
      </label>
      <div className='pt-2'>
        <input
        type="file"
        id="browseFile"
        name="browseFile"
        onChange={handleFileSelect}
        className="hidden"
      />
      <p className='text-gray-600 pt-2'>
        Drag files here or 
        <label className="underline pl-1 cursor-pointer" htmlFor="browseFile">Browse.</label>
      </p>
      </div>
    </>
  )
}
