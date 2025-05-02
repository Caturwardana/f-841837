
import React from "react";
import ViewToggle from "./ViewToggle";
import { useAuth } from "@/contexts/AuthContext";

interface DocumentHeaderProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  onAddDocument: () => void;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({
  viewMode,
  setViewMode,
  onAddDocument,
}) => {
  const { isAdmin } = useAuth();
  
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-primary">Documents</h1>
      <ViewToggle 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        onAddClick={onAddDocument}
        showAddButton={isAdmin()}
      />
    </div>
  );
};

export default DocumentHeader;
