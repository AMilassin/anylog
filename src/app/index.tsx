import { View, TextInput, Button } from "react-native";
import { useState } from 'react';
import { router } from 'expo-router';

export default function Home() {
  return (
    <View className="bg-white flex-1 justify-end p-4">
      <View className="p-4 w-full border-2 border-gray-300 bg-gray-200 rounded-t-lg shadow-lg self-center">
        <Button title="Add" onPress={() => router.push('/new-event')} />
      </View>
    </View>
  );
}
