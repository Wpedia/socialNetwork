import React, { useState } from 'react'
import Avatar from 'react-avatar-edit'
import useProfileStore from '../../../zustand/useProfileStore';
import { useAuthContext } from '../../../context/AuthContext';

export const AvatarUploader = () => {
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const uploadAvatar = useProfileStore(state => state.uploadAvatar);
  const { authUser } = useAuthContext();

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = view => {
    setPreview(view);
  };

  const handleUpload = async () => {
    try {
      if (!preview) {
        console.error('No image to upload');
        return;
      }

      await uploadAvatar(preview, authUser._id);

      setPreview(null);
      document.getElementById('my_modal_3').close();
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };
  
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
          <Avatar
            width={400}
            exportAsSquare={true}
            height={300} 
            onCrop={onCrop}
            onClose={onClose}
            label="Выберите файл" 
            src={src}
          />
          <button onClick={handleUpload}>Загрузить</button>
      </div>
    </dialog>
  );
};