"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Decimal } from "@prisma/client/runtime/library";

interface Book {
  book_id: number;
  name: string;
  isbn: string;
  author_id: number;
  file_path: string | null;
  price: Decimal;
  published_date: Date;
  description: string | null;
  cover_image: string | null;
  author: {
    user_id: number;
    name: string | null;
  };
  book_photos: { photo_id: number; url: string; }[];
  book_category_links: { category_id: number; }[];
}

interface CatalogTableProps {
  data: {
    data: Book[];
    total: number;
  };
  offset: number;
  take: number;
  requestUpdateBook: (formData: FormData) => Promise<{ message: string }>;
  requestDeleteBook: (formData: FormData) => Promise<{ message: string }>;
}

export default function CatalogTable({
  data,
  offset,
  take,
  requestUpdateBook,
  requestDeleteBook,
}: CatalogTableProps) {
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [deleteBook, setDeleteBook] = useState<Book | null>(null);
  const { toast } = useToast();

  const handleEdit = async (formData: FormData) => {
    try {
      formData.append("path", "/author");
      const result = await requestUpdateBook(formData);
      toast({
        title: "Success",
        description: result.message,
        variant: "default",
      });
      setEditBook(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update book",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (formData: FormData) => {
    try {
      formData.append("path", "/author");
      const result = await requestDeleteBook(formData);
      toast({
        title: "Success",
        description: result.message,
        variant: "default",
      });
      setDeleteBook(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete book",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Published Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((book) => (
            <TableRow key={book.book_id}>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.price.toString()}</TableCell>
              <TableCell>{book.published_date.toLocaleDateString()}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => setEditBook(book)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteBook(book)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!editBook} onOpenChange={() => setEditBook(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          {editBook && (
            <form action={handleEdit} className="space-y-4">
              <input type="hidden" name="id" value={editBook.book_id} />
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editBook.name}
                  required
                />
              </div>
              <div>
                <Label htmlFor="isbn">ISBN</Label>
                <Input
                  id="isbn"
                  name="isbn"
                  defaultValue={editBook.isbn}
                  required
                />
              </div>
              <div>
                <Label htmlFor="file_path">File Path</Label>
                <Input
                  id="file_path"
                  name="file_path"
                  defaultValue={editBook.file_path || ""}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={editBook.price.toString()}
                  required
                />
              </div>
              <div>
                <Label htmlFor="published_date">Published Date</Label>
                <Input
                  id="published_date"
                  name="published_date"
                  type="date"
                  defaultValue={editBook.published_date.toISOString().split('T')[0]}
                  required
                />
              </div>
              <Button type="submit">Update</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteBook} onOpenChange={() => setDeleteBook(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Book</DialogTitle>
          </DialogHeader>
          {deleteBook && (
            <form action={handleDelete} className="space-y-4">
              <input type="hidden" name="id" value={deleteBook.book_id} />
              <p>Are you sure you want to delete {deleteBook.name}?</p>
              <Button type="submit" variant="destructive">Delete</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
