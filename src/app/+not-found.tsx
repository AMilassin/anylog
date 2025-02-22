import { Txt } from "@components/Text";
import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center p-8">
        <Txt>This screen doesn't exist.</Txt>
        <Txt>This screen doesn't exist.</Txt>
        <Txt>This screen doesn't exist.</Txt>
        <Txt>This screen doesn't exist.</Txt>
        <Txt>This screen doesn't exist.</Txt>
        <Txt>This screen doesn't exist.</Txt>
        <Link href="/">
          <Txt>Go to home screen!</Txt>
        </Link>
      </View>
    </>
  );
}
