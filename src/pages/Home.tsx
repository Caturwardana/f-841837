
import React, { useState, useMemo, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useDocuments } from "@/contexts/DocumentContext";
import DocumentForm from "@/components/documents/DocumentForm";
import DocumentViewDialog from "@/components/documents/DocumentViewDialog";
import DeleteConfirmDialog from "@/components/documents/DeleteConfirmDialog";
import DocumentHeader from "@/components/documents/DocumentHeader";
import DocumentFilterBar from "@/components/documents/DocumentFilterBar";
import DocumentsDisplay from "@/components/documents/DocumentsDisplay";
import { useDocumentHandlers } from "@/hooks/useDocumentHandlers";

const Home = () => {
  const { documents, categories, isLoading } = useDocuments();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const {
    selectedDocument,
    isFormOpen,
    isViewDialogOpen,
    isDeleteDialogOpen,
    handleEditDocument,
    handleDeleteDocument,
    handleViewDocument,
    openAddDocumentForm,
    handleFormDialogClose,
    handleViewDialogClose,
    handleDeleteDialogClose,
    handleConfirmDelete,
  } = useDocumentHandlers();

  // Load saved view preference from localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem("documentViewMode");
    if (savedViewMode && (savedViewMode === "grid" || savedViewMode === "list")) {
      setViewMode(savedViewMode as "grid" | "list");
    }
  }, []);

  // Save view preference to localStorage when changed
  useEffect(() => {
    localStorage.setItem("documentViewMode", viewMode);
  }, [viewMode]);

  const filteredDocuments = useMemo(() => {
    let filtered = documents;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(query) ||
          doc.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((doc) => doc.category.id === selectedCategory);
    }

    return filtered;
  }, [documents, searchQuery, selectedCategory]);

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-4">
        <DocumentHeader 
          viewMode={viewMode} 
          setViewMode={setViewMode}
          onAddDocument={openAddDocumentForm}
        />

        <DocumentFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
      </div>

      <DocumentsDisplay
        documents={filteredDocuments}
        isLoading={isLoading}
        viewMode={viewMode}
        onEdit={handleEditDocument}
        onDelete={handleDeleteDocument}
        onView={handleViewDocument}
      />

      {/* Only render dialogs when needed */}
      {isFormOpen && (
        <DocumentForm
          document={selectedDocument || undefined}
          open={isFormOpen}
          onClose={handleFormDialogClose}
        />
      )}

      {isViewDialogOpen && selectedDocument && (
        <DocumentViewDialog
          document={selectedDocument}
          open={isViewDialogOpen}
          onClose={handleViewDialogClose}
        />
      )}

      {isDeleteDialogOpen && (
        <DeleteConfirmDialog
          open={isDeleteDialogOpen}
          onClose={handleDeleteDialogClose}
          onConfirm={handleConfirmDelete}
          title="Delete Document"
          description={`Are you sure you want to delete "${selectedDocument?.title}"? This action cannot be undone.`}
        />
      )}
    </AppLayout>
  );
};

export default Home;
