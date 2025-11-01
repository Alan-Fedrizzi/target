import { View, Text, Button } from "react-native";
import { router } from "expo-router";

// expo-router reconhece o que está dentro da pasta app como rota
// para o expo-router reconhecer como rota, tem que exportar como default
export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Index</Text>

      <Button title="Target" onPress={() => router.navigate("target")} />
      <Button
        title="Transaction"
        onPress={() => router.navigate("transaction/7")}
      />
      <Button
        title="InProgress"
        onPress={() => router.navigate("in-progress/13")}
      />
    </View>
  );
}

// instalando fontes
