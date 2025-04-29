
export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  category: Category;
  uploadDate: string;
  fileSize: string;
  fileType: string;
  uploadedBy: string;
  url: string;
}
