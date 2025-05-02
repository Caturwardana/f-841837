
import React from "react";

const DocumentsEmptyState: React.FC = () => {
  return (
    <div className="bg-muted p-8 text-center rounded-lg">
      <h3 className="text-lg font-medium text-primary mb-2">No documents found</h3>
      <p className="text-muted-foreground">
        Try adjusting your search or filter to find what you're looking for
      </p>
    </div>
  );
};

export default DocumentsEmptyState;
