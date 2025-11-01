import { router, useLocalSearchParams } from "expo-router";
import { View, Text, Button } from "react-native";

// rota transaction tem o parâmetro id
// /transaction/7

export default function Transaction() {
  const id = useLocalSearchParams<{ id: string }>().id;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Transaction {id}</Text>

      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
