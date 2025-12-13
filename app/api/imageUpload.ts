import axiosInstance from "./axiosinstance";

export interface ImageUploadResponse {
  success: boolean;
  imageUrl?: string;
  message: string;
}

export const uploadImage = async (file: File): Promise<ImageUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await axiosInstance.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return {
      success: false,
      message: error.response?.data?.message || '圖片上傳失敗',
    };
  }
};

export const deleteImage = async (imageUrl: string): Promise<ImageUploadResponse> => {
  try {
    const response = await axiosInstance.delete('/images/delete', {
      params: { imageUrl },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return {
      success: false,
      message: error.response?.data?.message || '圖片刪除失敗',
    };
  }
};
