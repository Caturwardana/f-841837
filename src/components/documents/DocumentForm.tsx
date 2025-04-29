
import React, { useState, useEffect } from "react";
import { Document, Category } from "@/types/document";
import { useDocuments } from "@/contexts/DocumentContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface DocumentFormProps {
  document?: Document;
  open: boolean;
  onClose: () => void;
}

const DocumentForm: React.FC<DocumentFormProps> = ({
  document,
  open,
  onClose,
}) => {
  const { categories, addDocument, updateDocument } = useDocuments();
  const { user } = useAuth();
  const isEditing = !!document;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    file: null as File | null,
  });

  useEffect(() => {
    if (document) {
      setFormData({
        title: document.title,
        description: document.description,
        categoryId: document.category.id,
        file: null,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        categoryId: categories[0]?.id || "",
        file: null,
      });
    }
  }, [document, categories]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, categoryId: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.categoryId) {
      toast.error("Please select a category");
      return;
    }

    const selectedCategory = categories.find(c => c.id === formData.categoryId);

    if (!selectedCategory) {
      toast.error("Invalid category selected");
      return;
    }

    if (isEditing && document) {
      updateDocument({
        ...document,
        title: formData.title,
        description: formData.description,
        category: selectedCategory,
      });
    } else {
      if (!formData.file && !isEditing) {
        toast.error("Please upload a file");
        return;
      }

      // In a real app, we would upload the file to a server here
      const fileSize = formData.file ? `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB` : "1.0 MB";
      const fileType = formData.file ? formData.file.name.split('.').pop()?.toUpperCase() || "Unknown" : "PDF";

      addDocument({
        title: formData.title,
        description: formData.description,
        category: selectedCategory,
        uploadDate: new Date().toISOString().split('T')[0],
        fileSize,
        fileType,
        uploadedBy: user?.name || "Unknown",
        url: "#",
      });
    }

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Document" : "Upload Document"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the document information below"
              : "Fill in the document information and upload the file"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter document title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter document description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.categoryId}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!isEditing && (
            <div className="space-y-2">
              <Label htmlFor="file">File</Label>
              <Input id="file" type="file" onChange={handleFileChange} required />
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update" : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentForm;
