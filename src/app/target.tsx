import { PageHeader } from "@/components/PageHeader";
import { router } from "expo-router";
import { Button, StatusBar, Text, View } from "react-native";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <StatusBar barStyle="dark-content" />
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta funanceira."
        rightButton={{
          icon: "edit",
          onPress: () => {},
        }}
      />
      <Text>Target</Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
