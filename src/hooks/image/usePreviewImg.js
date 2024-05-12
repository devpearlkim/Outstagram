import { useState } from 'react';
import useShowToast from '../useShowToast';

const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();
  const maxFileSizeInBytes = 2 * 1024 * 1024;

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith('image/')) {
      if (file.size > maxFileSizeInBytes) {
        showToast('Error', '2MB이하의 파일을 선택해주세요', 'error');
        setSelectedFile(null);
        return;
      }
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };

      reader.onerror = (error) => {
        console.error('File읽는중 에러발생', error);
        showToast('Error', '파일을 다시 선택해주세요', 'error');
        setSelectedFile(null);
      };
    } else {
      showToast('Error', '이미지 파일을 선택해주세요', 'error');
      setSelectedFile(null);
    }
  };

  return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;
