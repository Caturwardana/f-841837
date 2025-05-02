
import React from "react";
import { Grid, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewToggleProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  onAddClick?: () => void;
  showAddButton?: boolean;
}

const ViewToggle: React.FC<ViewToggleProps> = ({
  viewMode,
  setViewMode,
  onAddClick,
  showAddButton = false,
}) => {
  return (
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
      {showAddButton && (
        <Button onClick={onAddClick}>
          <Plus className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      )}
    </div>
  );
};

export default ViewToggle;
