"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import UploadImage from "./UploadImage";

const AddBookForm = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    release_date: "",
    pages: 0,
    cover: null as string | null,
  });

  const supabase = createClientComponentClient();

  // Handle the file upload event
  const handleFileUpload = (imagePath: string | null, file: File | null) => {
    setBookData({
      ...bookData,
      cover: imagePath,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Make a request to API route to add book information
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      console.log("API Response:", response);

      if (response.ok) {
        console.log("Book added successfully!");
      } else {
        console.error("Error adding book:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div>
      <h2 className="heading">Add a Book</h2>
      <UploadImage onUpload={handleFileUpload} />
      <form onSubmit={handleSubmit}>
        <label className="text text-dark">
          Title:
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="text text-dark">
          Author:
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="text text-dark">
          Genre:
          <input
            type="text"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="text text-dark">
          Release Date:
          <input
            type="date"
            name="release_date"
            value={bookData.release_date}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="text text-dark">
          Pages:
          <input
            type="number"
            name="pages"
            value={bookData.pages}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button className="button" type="submit">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
