import React, {ChangeEvent, RefObject} from 'react';

type ChangesInputsPropsType = {
  error: string
  setError: (value: string) => void
  setNewPhoto: (value: string) => void
  inputRef: RefObject<HTMLInputElement>
}

export const ChangesInputs:React.FC<ChangesInputsPropsType> = (
  {
    error,
    setError,
    setNewPhoto,
    inputRef
  }
) => {

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError('');
    const newFile = e.target.files && e.target.files[0];
    if (newFile && newFile.size > 1048576) {
      return setError('The size of the photo is not more than 1MB');
    }

    if (newFile) {
      const reader = new FileReader();
      reader.onloadend = () => setNewPhoto(reader.result as string);
      reader.readAsDataURL(newFile);
    }
  }

  return (
    <>
      <input ref={inputRef} type='file'
             style={{display: 'none'}}
             onChange={upload}/>
    </>
  );
};
