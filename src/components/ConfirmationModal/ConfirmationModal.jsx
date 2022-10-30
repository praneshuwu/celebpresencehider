import { TfiClose } from 'react-icons/tfi';

function ConfirmationModal({ deleteHandler, modalHandler }) {
  return (
    <div className='w-screen h-screen bg-gray-600 bg-opacity-50 fixed flex justify-center items-center z-10'>
      <div className='bg-white border-gray-300 rounded-lg p-8 flex flex-col items-center w-5/6 md:w-3/6'>
        <TfiClose
          size={20}
          className='self-end cursor-pointer mr-2 hover:scale-110 transition-all'
          onClick={() => {
            modalHandler(false);
          }}
        />
        <h3 className='text-xl p-3 self-start'>Are you sure you want to delete?</h3>
        <span className='flex justify-end px-10 py-5 md:w-full'>
          <button
            className='bg-white hover:bg-gray-200 text-black rounded-xl px-8 py-3 mx-3 border border-gray-500'
            onClick={() => {
              modalHandler(false);
            }}
          >
            Cancel
          </button>
          <button
            className='bg-red-500 hover:bg-red-600 text-white rounded-xl px-8 py-3 mx-3'
            onClick={deleteHandler}
          >
            Delete
          </button>
        </span>
      </div>
    </div>
  );
}

export default ConfirmationModal;
