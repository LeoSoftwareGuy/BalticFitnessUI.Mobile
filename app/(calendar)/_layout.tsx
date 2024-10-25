import { Stack } from "expo-router"

const CalendarLayout = () => {
    return (
        <>
        <Stack>
            <Stack.Screen name="calendar"
              options={{
                headerShown: false,
              }} />
        </Stack>
        </>
    )
}


export default CalendarLayout