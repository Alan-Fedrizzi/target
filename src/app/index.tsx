import { HomeHeader } from "@/components/HomeHeader";
import { View, Text, Button } from "react-native";
// import { router } from "expo-router";
// import { fontFamily } from "@/theme/fontFamily";

// expo-router reconhece o que está dentro da pasta app como rota
// para não precisar do caminho, pode usar o ./

// para o expo-router reconhecer como rota, tem que exportar como default
export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader />
      {/* <Text style={{ fontFamily: fontFamily.bold, fontSize: 34 }}>Index</Text>

      <Button title="Target" onPress={() => router.navigate("target")} />
      <Button
        title="Transaction"
        onPress={() => router.navigate("transaction/7")}
      />
      <Button
        title="InProgress"
        onPress={() => router.navigate("in-progress/13")}
      /> */}
    </View>
  );
}

// instalando fontes
