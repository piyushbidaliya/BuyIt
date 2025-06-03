import { IoClose } from 'react-icons/io5'

function ConfirmBox({close, cancel, confirm}) {
  return (
    <div className='fixed top-28 lg:top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
        <div className='bg-white max-w-lg w-full p-4 rounded'>
            <div className='flex items-center justify-between'>
                <h1 className='font-semibold'>Permanent Delete</h1>
                <button onClick={close} className='w-fit block ml-auto'>
                    <IoClose size={25}/>
                </button>
            </div>
            <div className='mt-2'>
                <p className=''>Are you sure you want to delete?</p>
                <div className='flex gap-4'>
                    <button onClick={cancel} className='border border-[#ffbf00] px-3 py-1 rounded hover:bg-green-500 hover:border-green-500'>Cancel</button>
                    <button onClick={confirm} className='border border-[#ffbf00] bg-[#ffbf00] px-3 py-1 rounded hover:bg-red-500 hover:border-red-500'>Confirm</button>
                </div>   
            </div>
        </div>
    </div>
  )
}

export default ConfirmBox
