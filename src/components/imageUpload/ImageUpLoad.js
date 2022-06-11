const ImageUpLoad = ({
  className = "",
  srcImage,
  name,
  progress = 0,
  handleDeleteImage = () => {},
  ...props
}) => {
  return (
    <>
      <label
        className={`${className} cursor-pointer flex items-center justify-center rounded-lg border border-dotted overflow-hidden w-full min-h-[200px] relative group`}
      >
        {progress !== 0 && !srcImage && (
          <div className="absolute z-10 w-14 h-14 rounded-full border-2 border-t-transparent animate-spin border-green-500"></div>
        )}
        <input
          type="file"
          name={name}
          onChange={() => {}}
          {...props}
          className="hidden-input"
        />
        {!srcImage && progress === 0 && (
          <>
            <div className="flex flex-col items-center justify-center pointer-events-none text-center ">
              <svg
                width="63"
                height="64"
                viewBox="0 0 63 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="8.91162"
                  y="16.7925"
                  width="52.4992"
                  height="45.9368"
                  rx="2.8"
                  stroke="#C4C4C4"
                  strokeWidth="1.5"
                />
                <path
                  d="M21.4242 34.2903L16.9642 47.2987C16.234 49.4284 17.8166 51.6441 20.068 51.6441H48.5097C51.1714 51.6441 52.7256 48.6417 51.1888 46.4684L45.3517 38.214C44.1548 36.5214 41.7075 36.3492 40.2853 37.8576L37.7391 40.5581C36.3755 42.0044 34.0492 41.9156 32.7998 40.3696L27.08 33.2921C25.4581 31.2851 22.2611 31.8494 21.4242 34.2903Z"
                  stroke="#C4C4C4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="48.2856" cy="28.6757" r="3.2812" fill="#C4C4C4" />
                <path
                  d="M7.55293 41.8889L1.73599 13.024C1.43177 11.5144 2.39708 10.0439 3.90486 9.73074C8.52314 8.77166 18.0562 6.79194 24.8143 5.38851C31.7325 3.9518 41.6079 2.14667 46.1171 1.3332C47.498 1.08408 48.8454 1.89632 49.2522 3.23924C50.1182 6.09842 51.5474 11.0073 52.3063 14.6619"
                  stroke="#C4C4C4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p className="font-semibold">Choose your image</p>
            </div>
          </>
        )}
        {srcImage && (
          <>
            <img
              src={srcImage}
              className="absolute inset-0 object-cover w-full h-full "
              alt="post"
            />
            <button
              type="button"
              className="absolute w-16 h-16 bg-white rounded-full border shadow-lg flex items-center justify-center text-red-500 z-10 cursor-pointer opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible"
              onClick={handleDeleteImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </>
        )}
        {!srcImage && (
          <div
            className="absolute w-10 h-1 bg-green-500 bottom-0 left-0 transition-all img-upload-progress"
            style={{
              width: `${Math.ceil(progress)}%`,
            }}
          ></div>
        )}
      </label>
    </>
  );
};

export default ImageUpLoad;
