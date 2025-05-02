
import { useState, useCallback } from "react";
import { Document } from "@/types/document";
import { useDocuments } from "@/contexts/DocumentContext";
import { toast } from "sonner";

export const useDocumentHandlers = () => {
  const { updateDocument, deleteDocument } = useDocuments();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEditDocument = useCallback((document: Document) => {
    setSelectedDocument(document);
    setIsFormOpen(true);
  }, []);

  const handleDeleteDocument = useCallback((document: Document) => {
    setSelectedDocument(document);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleViewDocument = useCallback((document: Document) => {
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
  }, [updateDocument]);

  const openAddDocumentForm = useCallback(() => {
    setSelectedDocument(null);
    setIsFormOpen(true);
  }, []);

  const handleViewDialogClose = useCallback(() => {
    setIsViewDialogOpen(false);
    // Add a small delay before clearing the selected document to avoid UI flickering
    setTimeout(() => {
      setSelectedDocument(null);
    }, 100);
  }, []);

  const handleFormDialogClose = useCallback(() => {
    setIsFormOpen(false);
    // Add a small delay before clearing the selected document to avoid UI flickering
    setTimeout(() => {
      setSelectedDocument(null);
    }, 100);
  }, []);

  const handleDeleteDialogClose = useCallback(() => {
    setIsDeleteDialogOpen(false);
    // Add a small delay before clearing the selected document to avoid UI flickering
    setTimeout(() => {
      setSelectedDocument(null);
    }, 100);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedDocument) {
      deleteDocument(selectedDocument.id);
      setIsDeleteDialogOpen(false);
      toast.success("Document deleted successfully");
      setSelectedDocument(null);
    }
  }, [selectedDocument, deleteDocument]);

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
