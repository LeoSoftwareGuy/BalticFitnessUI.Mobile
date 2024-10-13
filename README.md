# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.






MY OWN COMMENTS

Shift + Command + F to refactor


You need this
/// <reference types="nativewind/types" /> in nativewind-env.d.ts file to be able to use tailwind className 

This basically renders screen inside some general page. WHere we can add header and footer
  <Stack>
      <Stack.Screen name="index" options={{headerShown:false}} />
    </Stack>



1) npx create-expo-app ./
2) npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
3) npm i nativewind
4) npm i --save-dev tailwindcss@3.3.2
5) npx tailwindcss init

Go through configuration
https://www.nativewind.dev/quick-starts/expo


// bundleId from the app. goes to app.json not sure if i need it for normal backend/