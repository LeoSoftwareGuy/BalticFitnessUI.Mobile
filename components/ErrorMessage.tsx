import { SafeAreaView, Text } from "react-native";

const ErrorMessage = ({ message }: { message: string }) => (
    <SafeAreaView className="h-full flex items-center justify-center">
        <Text className="text-red-500">{message}</Text>
    </SafeAreaView>
);

export default ErrorMessage;