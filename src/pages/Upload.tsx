
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useDocuments } from "@/contexts/DocumentContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Upload as UploadIcon } from "lucide-react";

const Upload = () => {
  const { categories, addDocument } = useDocuments();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    file: null as File | null,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    if (!formData.title.trim()) {
      toast.error("Title is required");
      setIsSubmitting(false);
      return;
    }

    if (!formData.categoryId) {
      toast.error("Please select a category");
      setIsSubmitting(false);
      return;
    }

    const selectedCategory = categories.find(c => c.id === formData.categoryId);

    if (!selectedCategory) {
      toast.error("Invalid category selected");
      setIsSubmitting(false);
      return;
    }

    if (!formData.file) {
      toast.error("Please upload a file");
      setIsSubmitting(false);
      return;
    }

    // In a real app, we would upload the file to a server here
    const fileSize = formData.file ? `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB` : "1.0 MB";
    const fileType = formData.file ? formData.file.name.split('.').pop()?.toUpperCase() || "Unknown" : "PDF";

    // Add a small delay to simulate file upload
    setTimeout(() => {
      try {
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
        
        // Reset form
        setFormData({
          title: "",
          description: "",
          categoryId: "",
          file: null,
        });
        
        toast.success("Document uploaded successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload document");
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Upload Document</h1>
        <p className="text-muted-foreground">Add a new document to the repository</p>
      </div>

      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Document Information</CardTitle>
          <CardDescription>
            Fill in the details and upload the document file
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="space-y-2">
              <Label htmlFor="file">File</Label>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <UploadIcon className="h-4 w-4 mr-2" />
                  Upload Document
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Upload;
