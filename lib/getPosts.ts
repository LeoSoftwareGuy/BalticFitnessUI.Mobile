import {
    Client,
    Account,
    ID,
    Avatars,
    Databases,
    Query,
    Models,
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
  
export interface VideoData {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[];
  $updatedAt: string;
  creator: string | null; 
  prompt: string;
  thumbnail: string;
  title: string;
  video: string;
}


  // Init your React Native SDK
  const client = new Client();
  
  client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.
  
  const account = new Account(client);
  const avatars = new Avatars(client);
  const databases = new Databases(client);


 export async function getAllPosts(): Promise<VideoData[]> {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    // Map Models.Document to VideoData
    const videoDataArray: VideoData[] = posts.documents.map((document: Models.Document) => ({
      $collectionId: document.$collectionId,
      $createdAt: document.$createdAt,
      $databaseId: document.$databaseId,
      $id: document.$id,
      $permissions: document.$permissions,
      $updatedAt: document.$updatedAt,
      creator: document.creator,
      prompt: document.prompt,
      thumbnail: document.thumbnail,
      title: document.title,
      video: document.video,
    }));

    return videoDataArray;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}