import {
    Client,
    Databases,
    Models,
  } from "react-native-appwrite";
import { appwriteConfig } from "./appwrite";
  

export interface VideoData {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[];
  $updatedAt: string;
  creator: Creator | null; 
  prompt: string;
  thumbnail: string;
  title: string;
  video: string;
}

export interface Creator {
    username:string |null;
    avatar:string |null;
    email:string,
    accountId:string;
    $createdAt: string;
    $updatedAt: string;
}


  // Init your React Native SDK
  const client = new Client();
  
  client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.
  
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