import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, View } from "react-native";

// mock
// const details = {
//   current: "R$ 580,00",
//   target: "R$ 1.790,00",
//   percentage: 25,
// };

// const transactions: TransactionProps[] = [
//   {
//     id: "1",
//     value: "R$ 20,00",
//     date: "12/04/25",
//     type: TransactionTypes.Output,
//   },
//   {
//     id: "2",
//     value: "R$ 300,00",
//     date: "12/04/25",
//     description: "CDB de 110% no banco XPTO",
//     type: TransactionTypes.Input,
//   },
// ];

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>();
  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionsDatabase();
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  // useFocusEffect - quando a rota recebe o focus, chama o método
  // usar com useCallback
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  async function fetchTargetDetails() {
    try {
      const response = await targetDatabase.show(Number(params.id));

      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.");
      console.log(error);
    }
  }

  async function fetchTransactions() {
    try {
      const response = await transactionsDatabase.listByTargetId(
        Number(params.id),
      );

      setTransactions(
        response.map((item) => ({
          id: String(item.id),
          value: numberToCurrency(item.amount),
          date: String(item.created_at),
          description: item.observation,
          type:
            item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input,
        })),
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as transações.");
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchTargetDetailsPromise = fetchTargetDetails();
    const fetchTransactionsPromise = fetchTransactions();

    await Promise.all([fetchTargetDetailsPromise, fetchTransactionsPromise]);
    setIsFetching(false);
  }

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButton={{
          icon: "edit",
          // na rota target, o id é opcional
          onPress: () => router.navigate(`/target?id=${params.id}`),
        }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        // data={[]}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu dinheiro aqui."
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  );
}
