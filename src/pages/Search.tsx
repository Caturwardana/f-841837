
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useDocuments } from "@/contexts/DocumentContext";
import { Document } from "@/types/document";
import DocumentCard from "@/components/documents/DocumentCard";
import DocumentViewDialog from "@/components/documents/DocumentViewDialog";
import DocumentForm from "@/components/documents/DocumentForm";
import DeleteConfirmDialog from "@/components/documents/DeleteConfirmDialog";
import { Search as SearchIcon, Filter, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Search = () => {
  const { documents, categories, isLoading } = useDocuments();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Document[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handleSearch = () => {
    setIsSearching(true);
    setHasSearched(true);

    // Simulate a search delay
    setTimeout(() => {
      let results = [...documents];

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        results = results.filter(
          (doc) =>
            doc.title.toLowerCase().includes(query) ||
            doc.description.toLowerCase().includes(query)
        );
      }

      if (selectedCategory !== "all") {
        results = results.filter((doc) => doc.category.id === selectedCategory);
      }

      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsViewDialogOpen(true);
  };

  const handleEditDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsFormOpen(true);
  };

  const handleDeleteDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsDeleteDialogOpen(true);
  };

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary mb-2">Search Documents</h1>
        <p className="text-muted-foreground">Search for documents in the repository</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,auto] gap-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
          </div>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="All Categories" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleSearch} disabled={isSearching}>
              {isSearching ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <SearchIcon className="h-4 w-4 mr-2" />}
              Search
            </Button>
            {(searchQuery || selectedCategory !== "all") && (
              <Button variant="outline" size="icon" onClick={handleClearSearch}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {(searchQuery || selectedCategory !== "all") && (
          <div className="mt-4 flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="outline" className="flex items-center gap-1">
                <span>Query: {searchQuery}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedCategory !== "all" && (
              <Badge variant="outline" className="flex items-center gap-1">
                <span>
                  Category:{" "}
                  {categories.find((c) => c.id === selectedCategory)?.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => setSelectedCategory("all")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
          </div>
        )}
      </div>

      {isLoading || isSearching ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : hasSearched ? (
        searchResults.length === 0 ? (
          <div className="bg-muted p-8 text-center rounded-lg">
            <h3 className="text-lg font-medium text-primary mb-2">No documents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you're looking for
            </p>
            <Button variant="outline" className="mt-4" onClick={handleClearSearch}>
              Clear Search
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-muted-foreground">
                Found {searchResults.length} document
                {searchResults.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  onEdit={handleEditDocument}
                  onDelete={handleDeleteDocument}
                  onView={handleViewDocument}
                />
              ))}
            </div>
          </>
        )
      ) : (
        <div className="bg-muted p-12 text-center rounded-lg">
          <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium text-primary mb-2">Search the Repository</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Enter keywords to search for documents by title or description, or filter by category
          </p>
        </div>
      )}

      {/* Document view dialog */}
      <DocumentViewDialog
        document={selectedDocument}
        open={isViewDialogOpen}
        onClose={() => setIsViewDialogOpen(false)}
      />

      {/* Document form dialog */}
      <DocumentForm
        document={selectedDocument || undefined}
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      {/* Delete confirmation dialog */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          if (selectedDocument) {
            // Call the delete function from context
            const { deleteDocument } = useDocuments();
            deleteDocument(selectedDocument.id);
            
            // Remove from search results
            setSearchResults(searchResults.filter(doc => doc.id !== selectedDocument.id));
            
            setIsDeleteDialogOpen(false);
          }
        }}
        title="Delete Document"
        description={`Are you sure you want to delete "${selectedDocument?.title}"? This action cannot be undone.`}
      />
    </AppLayout>
  );
};

export default Search;
