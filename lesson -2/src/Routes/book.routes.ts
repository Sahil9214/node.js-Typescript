import express, { Request, Response } from "express";
import BookModel from "../Schema/book.schema";

const bookRouter = express.Router();

bookRouter.get("/book", async (req: Request, res: Response) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

bookRouter.post("/book", async (req: Request, res: Response) => {
  console.log("req", req.body);
  try {
    const newBook = new BookModel(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error("Error saving book:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

bookRouter.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

bookRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedBook = await BookModel.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully", deletedBook });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default bookRouter;
