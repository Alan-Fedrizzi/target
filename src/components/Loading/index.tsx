import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";

export function Loading() {
  return (
    <ActivityIndicator color={colors.blue[500]} style={styles.container} />
  );
}
