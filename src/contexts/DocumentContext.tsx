
import React, { createContext, useContext, useState, useEffect } from "react";
import { Document, Category } from "@/types/document";
import { toast } from "sonner";

interface DocumentContextType {
  documents: Document[];
  categories: Category[];
  isLoading: boolean;
  addDocument: (document: Omit<Document, "id">) => void;
  deleteDocument: (id: string) => void;
  updateDocument: (document: Document) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
}

const DocumentContext = createContext<DocumentContextType>({
  documents: [],
  categories: [],
  isLoading: true,
  addDocument: () => {},
  deleteDocument: () => {},
  updateDocument: () => {},
  addCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
});

// Sample initial data
const INITIAL_CATEGORIES: Category[] = [
  { id: "1", name: "Guidelines", description: "Standard guidelines for implementation", color: "#3182CE" },
  { id: "2", name: "SOP", description: "Standard Operating Procedures", color: "#48BB78" },
  { id: "3", name: "Forms", description: "Required forms and templates", color: "#ED8936" },
  { id: "4", name: "Reports", description: "Documentation and reports", color: "#9F7AEA" },
];

const INITIAL_DOCUMENTS: Document[] = [
  {
    id: "1",
    title: "SPMI Implementation Guidelines 2023",
    description: "Comprehensive guidelines for SPMI implementation in higher education",
    category: INITIAL_CATEGORIES[0],
    uploadDate: "2023-10-15",
    fileSize: "2.4 MB",
    fileType: "PDF",
    uploadedBy: "Admin User",
    url: "#",
    viewCount: 8,
    tags: ["guidelines", "implementation", "education"]
  },
  {
    id: "2",
    title: "Document Review SOP",
    description: "Standard operating procedure for document review process",
    category: INITIAL_CATEGORIES[1],
    uploadDate: "2023-09-22",
    fileSize: "1.2 MB",
    fileType: "PDF",
    uploadedBy: "Admin User",
    url: "#",
    viewCount: 12,
    tags: ["sop", "review", "process"]
  },
  {
    id: "3",
    title: "Quality Assessment Form",
    description: "Form for internal quality assessment",
    category: INITIAL_CATEGORIES[2],
    uploadDate: "2023-08-10",
    fileSize: "0.5 MB",
    fileType: "DOCX",
    uploadedBy: "Admin User",
    url: "#",
    viewCount: 5,
    tags: ["form", "assessment", "quality"]
  },
  {
    id: "4",
    title: "Annual Quality Review Report",
    description: "Annual report on quality management system performance",
    category: INITIAL_CATEGORIES[3],
    uploadDate: "2023-07-05",
    fileSize: "3.7 MB",
    fileType: "PDF",
    uploadedBy: "Admin User",
    url: "#",
    viewCount: 21,
    tags: ["report", "annual", "quality"]
  },
  {
    id: "5",
    title: "Audit Process Guidelines",
    description: "Guidelines for conducting internal quality audits",
    category: INITIAL_CATEGORIES[0],
    uploadDate: "2023-06-18",
    fileSize: "1.8 MB",
    fileType: "PDF",
    uploadedBy: "Admin User",
    url: "#",
    viewCount: 7,
    tags: ["audit", "process", "internal"]
  },
  {
    id: "6",
    title: "Corrective Action Procedure",
    description: "SOP for implementing corrective actions",
    category: INITIAL_CATEGORIES[1],
    uploadDate: "2023-05-30",
    fileSize: "0.9 MB",
    fileType: "PDF",
    uploadedBy: "Admin User",
    url: "#",
    viewCount: 14,
    tags: ["corrective", "action", "procedure"]
  },
];

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage if available
    const savedDocuments = localStorage.getItem('documents');
    const savedCategories = localStorage.getItem('categories');
    
    // In a real app, we would fetch from a database
    // For demo, we'll use localStorage with initial data as fallback
    setTimeout(() => {
      if (savedDocuments && savedCategories) {
        try {
          setDocuments(JSON.parse(savedDocuments));
          setCategories(JSON.parse(savedCategories));
        } catch (e) {
          console.error("Failed to parse saved data:", e);
          setDocuments(INITIAL_DOCUMENTS);
          setCategories(INITIAL_CATEGORIES);
        }
      } else {
        setDocuments(INITIAL_DOCUMENTS);
        setCategories(INITIAL_CATEGORIES);
      }
      setIsLoading(false);
    }, 500);

    return () => {};
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('documents', JSON.stringify(documents));
      localStorage.setItem('categories', JSON.stringify(categories));
    }
  }, [documents, categories, isLoading]);

  const addDocument = (document: Omit<Document, "id">) => {
    const newDocument = {
      ...document,
      id: Date.now().toString(),
      viewCount: 0,
    };
    setDocuments([...documents, newDocument]);
    toast.success("Document added successfully");
  };

  const deleteDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
    toast.success("Document deleted successfully");
  };

  const updateDocument = (updatedDocument: Document) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === updatedDocument.id ? updatedDocument : doc
      )
    );
    // Only show toast for user-initiated updates, not automatic ones like view count
    if (!updatedDocument.lastViewed || 
        (documents.find(d => d.id === updatedDocument.id)?.viewCount !== updatedDocument.viewCount)) {
      toast.success("Document updated successfully");
    }
  };

  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories([...categories, newCategory]);
    toast.success("Category added successfully");
  };

  const updateCategory = (updatedCategory: Category) => {
    setCategories(
      categories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
    toast.success("Category updated successfully");
  };

  const deleteCategory = (id: string) => {
    // Check if any documents use this category
    const hasDocuments = documents.some((doc) => doc.category.id === id);
    
    if (hasDocuments) {
      toast.error("Cannot delete category that is used by documents");
      return;
    }
    
    setCategories(categories.filter((cat) => cat.id !== id));
    toast.success("Category deleted successfully");
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        categories,
        isLoading,
        addDocument,
        deleteDocument,
        updateDocument,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => useContext(DocumentContext);
