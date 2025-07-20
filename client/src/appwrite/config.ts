import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf.ts";

export class Service {
	client = new Client();
	databases: Databases;
	bucket: Storage;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteURL)
			.setProject(conf.appwriteProjectID);

		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	async createNote({
		title,
		slug,
		content,
		featuredImage,
		category,
		userId,
	}: {
		title: string;
		slug: string;
		content?: string;
		featuredImage?: string;
		category?: string;
		userId: string;
	}) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseID,
				conf.appwriteCollectionID,
				slug,
				{
					title,
					content,
					featuredImage,
					category,
					userId,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: createNote :: error", error);
		}
	}

	async updateNote(
		slug: string,
		{
			title,
			content,
			featuredImage,
			category,
		}: {
			title: string;
			content?: string;
			featuredImage?: string;
			category?: string;
		}
	) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseID,
				conf.appwriteCollectionID,
				slug,
				{
					title,
					content,
					featuredImage,
					category,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: updateNote :: error", error);
		}
	}

	async deleteNote(slug: string) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseID,
				conf.appwriteCollectionID,
				slug
			);
			return true;
		} catch (error) {
			console.log("Appwrite service :: deleteNote :: error", error);
			return false;
		}
	}

	async getNote(slug: string) {
		try {
			return await this.databases.getDocument(
				conf.appwriteDatabaseID,
				conf.appwriteCollectionID,
				slug
			);
		} catch (error) {
			console.log("Appwrite service :: getNote :: error", error);
			return false;
		}
	}

	async getNotes(userId: string) {
		try {
			return await this.databases.listDocuments(
				conf.appwriteDatabaseID,
				conf.appwriteCollectionID,
				[Query.equal("userId", userId)]
			);
		} catch (error) {
			console.log("Appwrite service :: getNotes :: error", error);
			return false;
		}
	}

	async uploadFile(file: File) {
		try {
			return await this.bucket.createFile(
				conf.appwriteBucketID,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log("Appwrite service :: uploadFile :: error", error);
			return false;
		}
	}

	async deleteFile(fileId: string) {
		try {
			await this.bucket.deleteFile(conf.appwriteBucketID, fileId);
			return true;
		} catch (error) {
			console.log("Appwrite service :: deleteFile :: error", error);
			return false;
		}
	}

	getFilePreview(fileId: string) {
		return this.bucket.getFileView(conf.appwriteBucketID, fileId);
	}
}

const service = new Service();
export default service;
