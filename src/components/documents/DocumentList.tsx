
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
    <div className="overflow-x-auto rounded-md border bg-background shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100 dark:bg-slate-800">
            <TableHead className="w-[30%] font-medium">Title</TableHead>
            <TableHead className="font-medium">Category</TableHead>
            <TableHead className="font-medium">Type</TableHead>
            <TableHead className="font-medium">Size</TableHead>
            <TableHead className="font-medium">Upload Date</TableHead>
            <TableHead className="text-right font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <TableCell className="font-medium text-primary-500">{doc.title}</TableCell>
              <TableCell>
                <Badge
                  style={{ backgroundColor: doc.category.color }}
                  className="text-white"
                >
                  {doc.category.name}
                </Badge>
              </TableCell>
              <TableCell className="text-slate-900 dark:text-slate-100">{doc.fileType}</TableCell>
              <TableCell className="text-slate-900 dark:text-slate-100">{doc.fileSize}</TableCell>
              <TableCell className="text-slate-900 dark:text-slate-100">{formatDate(doc.uploadDate)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" onClick={() => onView(doc)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  {isAdmin() && (
                    <>
                      <Button variant="outline" size="icon" onClick={() => onEdit(doc)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(doc)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
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
