
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { User as UserType } from "@/types/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Key } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import UserFormDialog from "@/components/users/UserFormDialog";
import DeleteConfirmDialog from "@/components/documents/DeleteConfirmDialog";
import ResetPasswordDialog from "@/components/users/ResetPasswordDialog";
import { format } from "date-fns";

const Users = () => {
  const { users, user: currentUser, isAdmin } = useAuth();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  // Ensure only admins can access this page
  if (!isAdmin()) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">You do not have permission to view this page.</p>
        </div>
      </AppLayout>
    );
  }

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: UserType) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (user: UserType) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleResetPassword = (user: UserType) => {
    setSelectedUser(user);
    setIsResetPasswordDialogOpen(true);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    try {
      return format(new Date(dateString), "MMM d, yyyy, h:mm a");
    } catch (e) {
      return dateString;
    }
  };

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">User Management</h1>
          <Button onClick={handleAddUser}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border bg-background">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={user.role === "admin" ? "bg-primary" : "bg-secondary text-secondary-foreground"}>
                    {user.role === "admin" ? "Admin" : "User"}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(user.lastLogin)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditUser(user)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleResetPassword(user)}>
                      <Key className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteUser(user)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      disabled={user.id === currentUser?.id} // Can't delete yourself
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* User form dialog */}
      <UserFormDialog
        user={selectedUser}
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedUser(null);
        }}
      />
      
      {/* Delete confirmation dialog */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          if (selectedUser) {
            const { deleteUser } = useAuth();
            deleteUser(selectedUser.id);
            setIsDeleteDialogOpen(false);
          }
        }}
        title="Delete User"
        description={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
      />
      
      {/* Reset password dialog */}
      <ResetPasswordDialog
        open={isResetPasswordDialogOpen}
        onClose={() => setIsResetPasswordDialogOpen(false)}
        userId={selectedUser?.id || ""}
        userName={selectedUser?.name || ""}
      />
    </AppLayout>
  );
};

export default Users;
