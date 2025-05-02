
import { useState } from "react";
import { Document } from "@/types/document";
import { useDocuments } from "@/contexts/DocumentContext";

export const useDocumentHandlers = () => {
  const { updateDocument, deleteDocument } = useDocuments();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEditDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsFormOpen(true);
  };

  const handleDeleteDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsDeleteDialogOpen(true);
  };

  const handleViewDocument = (document: Document) => {
    // Update view count and last viewed time before opening dialog
    const updatedDocument = {
      ...document,
      viewCount: (document.viewCount || 0) + 1,
      lastViewed: new Date().toISOString(),
    };
    
    // Update the document in context
    updateDocument(updatedDocument);
    
    // Set as selected document and open dialog
    setSelectedDocument(updatedDocument);
    setIsViewDialogOpen(true);
  };

  const openAddDocumentForm = () => {
    setSelectedDocument(null);
    setIsFormOpen(true);
  };

  const handleViewDialogClose = () => {
    setIsViewDialogOpen(false);
    // Clear the selected document after a short delay to allow dialog animation to complete
    setTimeout(() => {
      setSelectedDocument(null);
    }, 300);
  };

  const handleFormDialogClose = () => {
    setIsFormOpen(false);
    // Clear the selected document after a short delay
    setTimeout(() => {
      setSelectedDocument(null);
    }, 300);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
    // Clear the selected document after a short delay
    setTimeout(() => {
      setSelectedDocument(null);
    }, 300);
  };

  const handleConfirmDelete = () => {
    if (selectedDocument) {
      deleteDocument(selectedDocument.id);
      setIsDeleteDialogOpen(false);
      // Clear the selected document after a short delay
      setTimeout(() => {
        setSelectedDocument(null);
      }, 300);
    }
  };

  return {
    selectedDocument,
    isFormOpen,
    isViewDialogOpen,
    isDeleteDialogOpen,
    handleEditDocument,
    handleDeleteDocument,
    handleViewDocument,
    openAddDocumentForm,
    handleViewDialogClose,
    handleFormDialogClose,
    handleDeleteDialogClose,
    handleConfirmDelete,
  };
};
