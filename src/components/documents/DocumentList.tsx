
import React from "react";
import { Document } from "@/types/document";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

interface DocumentListProps {
  documents: Document[];
  onEdit: (document: Document) => void;
  onDelete: (document: Document) => void;
  onView: (document: Document) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onEdit,
  onDelete,
  onView,
}) => {
  const { isAdmin } = useAuth();
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">{doc.title}</TableCell>
              <TableCell>
                <Badge
                  style={{ backgroundColor: doc.category.color }}
                  className="text-white"
                >
                  {doc.category.name}
                </Badge>
              </TableCell>
              <TableCell>{doc.fileType}</TableCell>
              <TableCell>{doc.fileSize}</TableCell>
              <TableCell>{formatDate(doc.uploadDate)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onView(doc)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  {isAdmin() && (
                    <>
                      <Button variant="ghost" size="icon" onClick={() => onEdit(doc)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(doc)}
                        className="text-error hover:text-error hover:bg-error/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentList;
