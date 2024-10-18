import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.leo.aora",
  projectId: "670b97270016948a9480",
  databaseId: "670b989600056a392df4",
  userCollectionId: "670b98b9001581f8ad5e",
  videoCollectionId: "670b98f2000631162911",
  storageId: "670b9a1500235980efd7",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

interface CreateUserParams {
  email: string;
  password: string;
  username: string;
}

interface Document {
  id: string;
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  creator: {
    username: string;
    email: string;
    avatar: string;
    accountId: string;
  };
}

export const createUser = async ({
  email,
  password,
  username,
}: CreateUserParams) => {
  try {
    // Create the account using Appwrite
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Account creation failed");

    // Get user's initials avatar
    const avatarUrl = avatars.getInitials(username);

    // Automatically sign in the user after creating the account
    //await signIn(email, password);

    // Create the user document in the database
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    console.error("Error creating user:", error.message || error);
    throw new Error(
      error.message || "An unknown error occurred during account creation"
    );
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    console.error("Error during sign in:", error.message || error);
    throw new Error(
      error.message || "An unknown error occurred during sign-in"
    );
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentLoggedUser = await account.get();
    if (!currentLoggedUser) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentLoggedUser.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw Error;
  }
};
