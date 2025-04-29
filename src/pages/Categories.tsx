
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useDocuments } from "@/contexts/DocumentContext";
import { Category } from "@/types/document";
import DeleteConfirmDialog from "@/components/documents/DeleteConfirmDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Categories = () => {
  const { categories, isLoading, addCategory, updateCategory, deleteCategory } = useDocuments();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#3182CE",
  });

  const handleOpenForm = (category?: Category) => {
    if (category) {
      setSelectedCategory(category);
      setFormData({
        name: category.name,
        description: category.description || "",
        color: category.color || "#3182CE",
      });
    } else {
      setSelectedCategory(null);
      setFormData({
        name: "",
        description: "",
        color: "#3182CE",
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (selectedCategory) {
      updateCategory({
        ...selectedCategory,
        name: formData.name,
        description: formData.description,
        color: formData.color,
      });
    } else {
      addCategory({
        name: formData.name,
        description: formData.description,
        color: formData.color,
      });
    }

    setIsFormOpen(false);
  };

  const handleOpenDeleteDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory.id);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <AppLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">Categories</h1>
          <p className="text-muted-foreground">Manage document categories</p>
        </div>
        <Button onClick={() => handleOpenForm()}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Categories</CardTitle>
          <CardDescription>
            Create and manage categories for organizing documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No categories found</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => handleOpenForm()}
              >
                Add your first category
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Color</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: category.color || "#3182CE" }}
                      ></div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Badge
                        style={{ backgroundColor: category.color }}
                        className="text-white"
                      >
                        {category.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {category.description || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenForm(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDeleteDialog(category)}
                          className="text-error hover:text-error hover:bg-error/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Category form dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCategory ? "Edit Category" : "Add Category"}
            </DialogTitle>
            <DialogDescription>
              {selectedCategory
                ? "Update the category information below"
                : "Fill in the category information"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter category name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter category description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="color"
                  name="color"
                  type="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-12 h-8 p-1"
                />
                <Input
                  value={formData.color}
                  onChange={handleChange}
                  name="color"
                  className="flex-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseForm}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedCategory ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        description={`Are you sure you want to delete "${selectedCategory?.name}"? This action cannot be undone. If documents are using this category, they will need to be updated.`}
      />
    </AppLayout>
  );
};

export default Categories;
