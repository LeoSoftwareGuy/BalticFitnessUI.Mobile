import {
  Client,
  Databases,
  Models,
  Query,
  Storage,
  ID,
  ImageGravity,
} from "react-native-appwrite";
import { ImagePickerAsset } from "expo-image-picker";

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

const databases = new Databases(client);
const storage = new Storage(client);

export interface FormProp {
  title: string;
  video: ImagePickerAsset | null;
  prompt: string;
  thumbnail: ImagePickerAsset | null;
  userId: string;
}

export const getFilePreview = async (fileId: string, type: string) => {
  try {
    let fileUrl;
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    return fileUrl;
  } catch (error: any) {
    console.error("Error fetching file preview:", error.message);
    throw new Error(`Failed to get file preview: ${error.message}`);
  }
};

export const uploadFile = async (
  file: ImagePickerAsset | null,
  type: string
) => {
  if (!file) return;

  const asset = {
    name: file.fileName!,
    type: file.mimeType!,
    size: file.fileSize!,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createPost = async (form: FormProp) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error: any) {
    throw new Error(error);
  }
};
