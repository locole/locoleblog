import React from "react";
import { useForm } from "react-hook-form";
import { getStorage, ref } from "firebase/storage";
const ImageUpload = (props) => {
  return (
    <label className="relative w-full h-[400px] mb-8 border-2 border-gray-400 border-solid rounded-2xl" > 
      <input
        type="file"
        name={props.name}
        className="hidden-input"
        onChange={props.onchange}
      />
      {props.image ? (
        <>
          <img
            src={props.image}
            className="object-cover w-full h-full rounded-2xl"
            alt=""
          />
          <button type="button" onClick={props.handleDeleteImage} className="absolute p-3 text-red-500 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-slate-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </>
      ) : (
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 justify-center items-center cursor-pointer">
          <img src="./gallery.png" className="w-[100px] h-[100px] " alt="" />
          <span className="text-center font-lg text-medium">
            Choose your images{" "}
          </span>
        </div>
      )}
    </label>
  );
};

export default ImageUpload;
