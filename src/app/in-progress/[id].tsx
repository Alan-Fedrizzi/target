import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Button } from "react-native";

export default function InProgress() {
  const id = useLocalSearchParams<{ id: string }>().id;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>InProgress {id}</Text>

      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
