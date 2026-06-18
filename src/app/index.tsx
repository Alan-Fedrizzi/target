import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { Target, TargetProps } from "@/components/Target";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StatusBar, View } from "react-native";
import { numberToCurrency } from "@/utils/numberToCurrency";

// expo-router reconhece o que está dentro da pasta app como rota
// para não precisar do caminho, pode usar o ./

const summary = {
  total: "R$ 2.680,00",
  input: { label: "Entradas", value: "R$ 6.184,90" },
  output: { label: "Saídas", value: "-R$ 883,65" },
};

const TARGETS_MOCK = [
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
  const [isFetching, setIsFetching] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>([]);

  const targetDatabase = useTargetDatabase();

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listBySavedValue();

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurrency(item.current),
        percentage: `${item.percentage.toFixed(0)}%`,
        target: numberToCurrency(item.amount),
      }));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as metas.");
      console.log(error);
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();
    // para resolver tudo de uma vez só
    const [targetData] = await Promise.all([targetDataPromise]);

    setTargets(targetData);
    setIsFetching(false);
  }

  // useFocusEffect - quando a rota recebe o focus, chama o método
  // usar com useCallback
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (isFetching) {
    return <Loading />;
  }

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
// no beekeeper > SQLite
// target.db clica com o direito > save as
// no beekeeper > SQLite > arrasta o arquivo salvo para  Choose File
