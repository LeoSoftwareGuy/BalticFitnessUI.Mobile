
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getAllPosts, VideoData } from "./getPosts";

const useAppwrite = () => {
  const [data, setData] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await getAllPosts();
      setData(response);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
    console.log(data);
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
