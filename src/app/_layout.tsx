// import { Slot } from "expo-router";
// import { colors } from "@/theme/colors";
import { colors } from "@/theme";
import { Stack } from "expo-router";
// import { Tabs } from "expo-router";
// import { MaterialIcons } from "@expo/vector-icons";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Loading } from "@/components/Loading";

// começa com _ é um arquivo de configuração de rotas
// pode ter um por pasta, para ter configurações diferentes de cada rota

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

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
