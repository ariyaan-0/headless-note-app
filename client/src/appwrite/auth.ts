import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf.ts";

export class AuthService {
	client = new Client();
	account: Account;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteURL)
			.setProject(conf.appwriteProjectID);

		this.account = new Account(this.client);
	}

	async createAccount({
		email,
		password,
		name,
	}: {
		email: string;
		password: string;
		name?: string;
	}) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name || ""
			);
			if (userAccount) {
				return this.login({ email, password });
			} else {
				return userAccount;
			}
		} catch (error) {
			console.log("Appwrite service :: createAccount :: error ", error);
		}
	}

	async login({ email, password }: { email: string; password: string }) {
		try {
			return await this.account.createEmailPasswordSession(
				email,
				password
			);
		} catch (error) {
			console.log("Appwrite service :: login :: error ", error);
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log("Appwrite service :: getCurrentUser :: error ", error);
		}

		return null;
	}

	async logout() {
		try {
			await this.account.deleteSessions();
		} catch (error) {
			console.log("Appwrite service :: logout :: error ", error);
		}
	}
}

const authService = new AuthService();

export default authService;
