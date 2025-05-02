
import React from "react";
import { Document } from "@/types/document";
import DocumentCard from "./DocumentCard";
import DocumentList from "./DocumentList";
import DocumentsEmptyState from "./DocumentsEmptyState";
import DocumentsLoading from "./DocumentsLoading";

interface DocumentsDisplayProps {
  documents: Document[];
  isLoading: boolean;
  viewMode: "grid" | "list";
  onEdit: (document: Document) => void;
  onDelete: (document: Document) => void;
  onView: (document: Document) => void;
}

const DocumentsDisplay: React.FC<DocumentsDisplayProps> = ({
  documents,
  isLoading,
  viewMode,
  onEdit,
  onDelete,
  onView,
}) => {
  if (isLoading) {
    return <DocumentsLoading />;
  }
  
  if (documents.length === 0) {
    return <DocumentsEmptyState />;
  }
  
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        ))}
      </div>
    );
  }
  
  return (
    <DocumentList
      documents={documents}
      onEdit={onEdit}
      onDelete={onDelete}
      onView={onView}
    />
  );
};

export default DocumentsDisplay;
