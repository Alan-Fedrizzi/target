// import { Slot } from "expo-router";
import { colors } from "@/theme/colors";
import { Stack } from "expo-router";
// import { Tabs } from "expo-router";
// import { MaterialIcons } from "@expo/vector-icons";

// começa com _ é um arquivo de configuração de rotas
// pode ter um por pasta, para ter configurações diferentes de cada rota

export default function Layout() {
  // return <Slot />;
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.white,
        },
      }}
    />
  ); // já cria o tipo de navegação
  /*
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            // para pegar o tamanho e cor padrão
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="target" options={{ title: "Target" }} />
      <Tabs.Screen name="transaction" options={{ title: "Transaction" }} />
      <Tabs.Screen name="in-progress" options={{ title: "In Progress" }} />
    </Tabs>
  ); // já cria o tipo de navegação
  */
}
