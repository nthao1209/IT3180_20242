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

interface AddBookButtonProps {
  requestAddBookAction: (formData: FormData) => Promise<{ message: string }>;
}

export default function AddBookButton({
  requestAddBookAction,
}: AddBookButtonProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    try {
      formData.append("path", "/author");
      const result = await requestAddBookAction(formData);
      toast({
        title: "Success",
        description: result.message,
        variant: "success",
      });
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit add book request",
        variant: "error",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">Request to Add Book</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request to Add Book</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div>
            <Label htmlFor="isbn">ISBN</Label>
            <Input id="isbn" name="isbn" required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" />
          </div>
          <div>
            <Label htmlFor="cover_image">Cover Image URL</Label>
            <Input id="cover_image" name="cover_image" />
          </div>
          <div>
            <Label htmlFor="file_path">File Path</Label>
            <Input id="file_path" name="file_path" required />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" name="price" type="number" step="0.01" required />
          </div>
          <div>
            <Label htmlFor="published_date">Published Date</Label>
            <Input
              id="published_date"
              name="published_date"
              type="date"
              required
            />
          </div>
          <Button type="submit">Submit Request</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
