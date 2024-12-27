import { ActivityIndicator, SafeAreaView, Text } from "react-native";

const LoadingIndicator = () => (
    <SafeAreaView className="h-full flex items-center justify-center">
        <ActivityIndicator size="large" color="#2AB38E" />
        <Text className="text-white mt-4">Loading Trainings...</Text>
    </SafeAreaView>
);

export default LoadingIndicator;