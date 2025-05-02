
import React from "react";
import { Document } from "@/types/document";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";
import { format } from "date-fns";

interface DocumentViewDialogProps {
  document: Document | null;
  open: boolean;
  onClose: () => void;
}

const DocumentViewDialog: React.FC<DocumentViewDialogProps> = ({
  document,
  open,
  onClose,
}) => {
  if (!document) {
    return null;
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <DialogTitle>{document.title}</DialogTitle>
          </div>
          <DialogDescription className="flex items-center space-x-2 pt-1">
            <Badge
              style={{ backgroundColor: document.category.color }}
              className="text-white"
            >
              {document.category.name}
            </Badge>
            <span className="text-xs">
              {document.fileType} • {document.fileSize}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <h4 className="text-sm font-medium mb-1">Description</h4>
          <p className="text-sm text-muted-foreground">{document.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-2">
          <div>
            <h4 className="text-sm font-medium mb-1">Uploaded By</h4>
            <p className="text-sm text-muted-foreground">{document.uploadedBy}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Upload Date</h4>
            <p className="text-sm text-muted-foreground">
              {formatDate(document.uploadDate)}
            </p>
          </div>
        </div>

        <div className="mt-4 p-6 rounded-md bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">Document preview would appear here</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewDialog;
