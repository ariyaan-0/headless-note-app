import API from "../lib/axios";

export interface Note {
  _id: string;
  title: string;
  slug: string;
  content?: string;
  featuredImage?: string;
  category?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateNotePayload {
  title: string;
  slug?: string;
  content?: string;
  featuredImage?: string;
  category?: string;
  userId?: string;
}

export class Service {
  async createNote(payload: CreateNotePayload): Promise<Note> {
    try {
      const res = await API.post<Note>("/notes", payload);
      return res.data;
    } catch (error) {
      console.error("Service :: createNote", error);
      throw error;
    }
  }

  async updateNote(slug: string, data: Partial<CreateNotePayload>): Promise<Note> {
    try {
      const res = await API.put<Note>(`/notes/${slug}`, data);
      return res.data;
    } catch (error) {
      console.error("Service :: updateNote", error);
      throw error;
    }
  }

  async deleteNote(slug: string): Promise<boolean> {
    try {
      await API.delete(`/notes/${slug}`);
      return true;
    } catch (error) {
      console.error("Service :: deleteNote", error);
      return false;
    }
  }

  async getNote(slug: string): Promise<Note | null> {
    try {
      const res = await API.get<Note>(`/notes/${slug}`);
      return res.data;
    } catch (error) {
      console.error("Service :: getNote", error);
      return null;
    }
  }

  async getNotes(): Promise<Note[]> {
    try {
      const res = await API.get<Note[]>("/notes");
      return res.data;
    } catch (error) {
      console.error("Service :: getNotes", error);
      return [];
    }
  }

  async uploadFile(file: File): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await API.post<{ url: string }>("/notes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data.url;
    } catch (error) {
      console.error("Service :: uploadFile", error);
      return null;
    }
  }

  async deleteFile(fileUrl: string): Promise<boolean> {
    try {
      const filename = fileUrl.split("/").pop(); // Extract filename from full URL
      if (!filename) throw new Error("Invalid file URL");

      await API.delete(`/notes/upload/${filename}`);
      return true;
    } catch (error) {
      console.error("Service :: deleteFile", error);
      return false;
    }
  }

  getFilePreview(fileUrl: string): string {
    return fileUrl;
  }
}

const service = new Service();
export default service;
