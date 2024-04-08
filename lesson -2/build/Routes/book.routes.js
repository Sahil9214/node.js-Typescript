"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_schema_1 = __importDefault(require("../Schema/book.schema"));
const bookRouter = express_1.default.Router();
bookRouter.get("/book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_schema_1.default.find();
        res.status(200).json(books);
    }
    catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
bookRouter.post("/book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req", req.body);
    try {
        const newBook = new book_schema_1.default(req.body);
        const savedBook = yield newBook.save();
        res.status(201).json(savedBook);
    }
    catch (err) {
        console.error("Error saving book:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
bookRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedBook = yield book_schema_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json(updatedBook);
    }
    catch (err) {
        console.error("Error updating book:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
bookRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedBook = yield book_schema_1.default.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully", deletedBook });
    }
    catch (err) {
        console.error("Error deleting book:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = bookRouter;
