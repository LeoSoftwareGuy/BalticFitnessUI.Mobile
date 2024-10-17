import {
    Client,
    Databases,
    Models,
    Query,
  } from "react-native-appwrite";
import { appwriteConfig } from "./appwrite";
import { VideoData } from "./getPosts";
  

  // Init your React Native SDK
  const client = new Client();
  
  client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.
  
  const databases = new Databases(client);


 export async function getLatestPosts(): Promise<VideoData[]> {
    try {
        const posts = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.videoCollectionId,
          [
            Query.orderDesc('$createdAt'),
            Query.limit(7)
          ]
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