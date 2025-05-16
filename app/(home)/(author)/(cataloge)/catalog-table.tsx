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

interface Book {
  book_id: number;
  name: string;
  isbn: string;
  author_id: number;
  file_path: string;
  price: number;
  published_date: Date;
  description: string | null;
  cover_image: string | null;
}

interface CatalogTableProps {
  data: { data: Book[]; total: number };
  offset: number;
  take: number;
  requestUpdateBook: (data: FormData) => Promise<{ message: string }>;
  requestDeleteBook: (
    book_id: number,
    path: string
  ) => Promise<{ message: string }>;
}

export default function CatalogTable({
  data,
  offset,
  take,
  requestUpdateBook,
  requestDeleteBook,
}: CatalogTableProps) {
  const { toast } = useToast();
  const [editBook, setEditBook] = useState<Book | null>(null);

  const handleDelete = async (book_id: number) => {
    try {
      const result = await requestDeleteBook(book_id, "/author");
      toast({
        title: "Success",
        description: result.message,
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit delete book request",
        variant: "error",
      });
    }
  };

  const handleUpdate = async (formData: FormData) => {
    try {
      formData.append("path", "/author");
      const result = await requestUpdateBook(formData);
      toast({
        title: "Success",
        description: result.message,
        variant: "success",
      });
      setEditBook(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit update book request",
        variant: "error",
      });
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((book) => (
            <TableRow key={book.book_id}>
              <TableCell>{book.book_id}</TableCell>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>${book.price.toFixed(2)}</TableCell>
              <TableCell>
                {book.published_date.toISOString().split("T")[0]}
              </TableCell>
              <TableCell>{book.description || "N/A"}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => setEditBook(book)}
                >
                  Request Update
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(book.book_id)}
                >
                  Request Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editBook && (
        <Dialog open={!!editBook} onOpenChange={() => setEditBook(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request to Update Book</DialogTitle>
            </DialogHeader>
            <form action={handleUpdate} className="space-y-4">
              <input type="hidden" name="book_id" value={editBook.book_id} />
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editBook.description || ""}
                />
              </div>
              <div>
                <Label htmlFor="cover_image">Cover Image URL</Label>
                <Input
                  id="cover_image"
                  name="cover_image"
                  defaultValue={editBook.cover_image || ""}
                />
              </div>
              <div>
                <Label htmlFor="file_path">File Path</Label>
                <Input
                  id="file_path"
                  name="file_path"
                  defaultValue={editBook.file_path}
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
                  defaultValue={editBook.price}
                  required
                />
              </div>
              <div>
                <Label htmlFor="published_date">Published Date</Label>
                <Input
                  id="published_date"
                  name="published_date"
                  type="date"
                  defaultValue={
                    editBook.published_date.toISOString().split("T")[0]
                  }
                  required
                />
              </div>
              <Button type="submit">Submit Request</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}

      <div className="mt-4 flex justify-between">
        <Button disabled={offset === 0}>Previous</Button>
        <span>
          Page {offset + 1} of {Math.ceil(data.total / take)}
        </span>
        <Button disabled={(offset + 1) * take >= data.total}>Next</Button>
      </div>
    </div>
  );
}
