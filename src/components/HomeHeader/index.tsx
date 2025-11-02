import { colors } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { styles } from "./styles";

export function HomeHeader() {
  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.blue[500], colors.blue[800]]}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
      </View>
    </LinearGradient>
  );
}
