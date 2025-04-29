
import React from "react";
import { Document } from "@/types/document";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FileText, Edit, Trash2, MoreVertical, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

interface DocumentCardProps {
  document: Document;
  onEdit: (document: Document) => void;
  onDelete: (document: Document) => void;
  onView: (document: Document) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onEdit, onDelete, onView }) => {
  const { isAdmin } = useAuth();
  
  const getFileIcon = () => {
    // Could expand this to show different icons for different file types
    return <FileText className="h-12 w-12 text-primary" />;
  };
  
  const formattedDate = () => {
    try {
      return format(new Date(document.uploadDate), "MMM d, yyyy");
    } catch (e) {
      return document.uploadDate;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <Badge 
            style={{ backgroundColor: document.category.color }}
            className="text-white"
          >
            {document.category.name}
          </Badge>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(document)}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </DropdownMenuItem>
              {isAdmin() && (
                <>
                  <DropdownMenuItem onClick={() => onEdit(document)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(document)} 
                    className="text-error"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="mr-3">
            {getFileIcon()}
          </div>
          <div>
            <h3 className="font-medium text-primary truncate">{document.title}</h3>
            <p className="text-sm text-muted-foreground">
              {document.fileType} • {document.fileSize}
            </p>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 h-10 mb-2">
          {document.description}
        </p>
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-muted border-t text-xs text-muted-foreground flex justify-between">
        <span>Uploaded by: {document.uploadedBy}</span>
        <span>{formattedDate()}</span>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
