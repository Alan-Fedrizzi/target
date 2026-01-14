import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Target } from "@/components/Target";
import { router } from "expo-router";
import { View, StatusBar } from "react-native";

// expo-router reconhece o que está dentro da pasta app como rota
// para não precisar do caminho, pode usar o ./

const summary = {
  total: "R$ 2.680,00",
  input: { label: "Entradas", value: "R$ 6.184,90" },
  output: { label: "Saídas", value: "-R$ 883,65" },
};

const targets = [
  {
    id: "1",
    name: "Apple Watch",
    percentage: "50%",
    current: "R$ 580,00",
    target: "R$ 1.790,00",
  },
  {
    id: "2",
    name: "Comprar cadeira ergonômica ergonômica ergonômica ergonômica ergonômica ergonômica",
    percentage: "75%",
    current: "R$ 900,00",
    target: "R$ 1.200,00",
  },
  {
    id: "3",
    name: "Fazer uma viagem para o Rio de Janeiro",
    percentage: "75%",
    current: "R$ 1.200,00",
    target: "R$ 3.000,00",
  },
];

// para o expo-router reconhecer como rota, tem que exportar como default
export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <HomeHeader data={summary} />

      <List
        title="Metas"
        data={targets}
        // data={[]} // para testar lista vazia
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`in-progress/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        emptyMessage="Nenhuma meta. Clique em nova meta para criar."
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate("target")} />
      </View>
    </View>
  );
}

// rodar development build
// npx expo prebuild
// npx expo run:android

// ver banco de dados
// abrir android studio (abrir pasta android do projeto)
// View > Tool windows > Device Explorer
// data > data > com.alanff.target > files > SQLite > target.db
