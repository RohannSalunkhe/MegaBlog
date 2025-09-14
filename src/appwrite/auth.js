import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      console.log("Account creation called");

      // ✅ FIXED: Use create() method to create account
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // After creating account, automatically log them in
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount :: error", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      console.log("Login called");
      // ✅ This is correct for creating a session
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite service :: login :: error", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      console.log("Get current user called");
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      // ✅ IMPORTANT: Don't throw error, return null for unauthenticated users
      return null;
    }
  }

  async logout() {
    try {
      console.log("Logout called");
      // ✅ FIXED: Specify 'current' session to delete
      await this.account.deleteSession("current");
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
