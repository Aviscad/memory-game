function Modal({ message, handleResetClick }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center">
      <div className="h-auto max-w-md md:h-auto ">
        <div className="bg-white rounded-lg shadow px-10 py-2">
          <div className="p-4 text-center">
            <h3 className="text-lg p-1">{message}</h3>
            <button
              type="button"
              className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-5 border border-red-500 hover:border-transparent rounded"
              onClick={handleResetClick}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
