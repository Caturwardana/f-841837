
import React, { useState, useMemo, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useDocuments } from "@/contexts/DocumentContext";
import { useAuth } from "@/contexts/AuthContext";
import { Document, Category } from "@/types/document";
import DocumentCard from "@/components/documents/DocumentCard";
import DocumentList from "@/components/documents/DocumentList";
import DocumentForm from "@/components/documents/DocumentForm";
import DocumentViewDialog from "@/components/documents/DocumentViewDialog";
import DeleteConfirmDialog from "@/components/documents/DeleteConfirmDialog";
import {
  Filter,
  Search,
  Loader2,
  Plus,
  Grid,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Home = () => {
  const { documents, categories, isLoading, updateDocument, deleteDocument } = useDocuments();
  const { isAdmin } = useAuth();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

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

  // Fix: Renamed from handleAddDocument to openAddDocumentForm for clarity
  const openAddDocumentForm = () => {
    setSelectedDocument(null);
    setIsFormOpen(true);
  };

  // Fixed: Properly handle dialog close to prevent UI from being stuck
  const handleViewDialogClose = () => {
    setIsViewDialogOpen(false);
    // Clear the selected document after a short delay to allow dialog animation to complete
    setTimeout(() => {
      setSelectedDocument(null);
    }, 300);
  };

  // Fixed: Properly handle form dialog close
  const handleFormDialogClose = () => {
    setIsFormOpen(false);
    // Clear the selected document after a short delay
    setTimeout(() => {
      setSelectedDocument(null);
    }, 300);
  };

  // Fixed: Properly handle delete dialog close
  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
    // Clear the selected document after a short delay
    setTimeout(() => {
      setSelectedDocument(null);
    }, 300);
  };

  // Fixed: Handle confirm delete operation
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

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Documents</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className={`${viewMode === "grid" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`${viewMode === "list" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              <List className="h-4 w-4" />
            </Button>
            {isAdmin() && (
              <Button onClick={openAddDocumentForm}>
                <Plus className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-auto min-w-[200px]">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Filter by category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="bg-muted p-8 text-center rounded-lg">
          <h3 className="text-lg font-medium text-primary mb-2">No documents found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
              onEdit={handleEditDocument}
              onDelete={handleDeleteDocument}
              onView={handleViewDocument}
            />
          ))}
        </div>
      ) : (
        <DocumentList
          documents={filteredDocuments}
          onEdit={handleEditDocument}
          onDelete={handleDeleteDocument}
          onView={handleViewDocument}
        />
      )}

      {/* Document form dialog - improved with proper closing handler */}
      <DocumentForm
        document={selectedDocument || undefined}
        open={isFormOpen}
        onClose={handleFormDialogClose}
      />

      {/* Document view dialog - Fixed to properly clean up when closed */}
      <DocumentViewDialog
        document={selectedDocument}
        open={isViewDialogOpen}
        onClose={handleViewDialogClose}
      />

      {/* Delete confirmation dialog - Fixed with proper handlers */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleConfirmDelete}
        title="Delete Document"
        description={`Are you sure you want to delete "${selectedDocument?.title}"? This action cannot be undone.`}
      />
    </AppLayout>
  );
};

export default Home;
