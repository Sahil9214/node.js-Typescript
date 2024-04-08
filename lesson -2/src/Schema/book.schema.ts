import mongoose, { Schema, Document } from "mongoose";

// Define a schema for your book model
const bookSchema = new Schema({
  title: String,
  image: String,
  description: String,
  price: Number,
  author: String,
  genre: String,
});

// Define a TypeScript interface to represent the structure of a book document
export interface IBook extends Document {
  title: string;
  image: string;
  description: string;
  price: number;
  author: string;
}

// Create a model for the book schema
const BookModel = mongoose.model<IBook>("Book", bookSchema);

export default BookModel;
