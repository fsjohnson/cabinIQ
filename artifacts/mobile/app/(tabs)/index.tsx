import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import React, { useState, useMemo } from "react";
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AircraftCard } from "@/components/AircraftCard";
import { SearchBar } from "@/components/SearchBar";
import { useColors } from "@/hooks/useColors";
import { Aircraft, searchAircraft } from "@/data/aircraft";

type FilterType = "All" | "Boeing" | "Airbus" | "Embraer" | "Narrowbody" | "Widebody" | "Jumbo";
const FILTERS: FilterType[] = ["All", "Boeing", "Airbus", "Embraer", "Narrowbody", "Widebody", "Jumbo"];

const PRIVACY_URL = "https://github.com/fsjohnson/cabinIQ/wiki/Privacy-Policy";
const CONTACT_EMAIL = "hello@runway.team";

export default function SearchScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [menuVisible, setMenuVisible] = useState(false);

  const filtered = useMemo<Aircraft[]>(() => {
    let results = searchAircraft(query);
    if (activeFilter !== "All") {
      results = results.filter(
        (a) => a.manufacturer === activeFilter || a.type === activeFilter
      );
    }
    return results;
  }, [query, activeFilter]);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const openSettings = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setMenuVisible(true);
  };

  const closeMenu = () => setMenuVisible(false);

  const handlePrivacyPolicy = () => {
    closeMenu();
    setTimeout(() => Linking.openURL(PRIVACY_URL), 200);
  };

  const handleContactUs = () => {
    closeMenu();
    setTimeout(
      () => Linking.openURL(`mailto:${CONTACT_EMAIL}?subject=CabinIQ%20Support`),
      200
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 16 }]}>
        <View style={styles.titleRow}>
          <View>
            <Text style={[styles.title, { color: colors.primary, fontFamily: "Inter_700Bold" }]}>
              CabinIQ
            </Text>
            <Text style={[styles.subtitle, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Find your best seat, every flight
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.logoMark, { backgroundColor: colors.secondary, borderColor: colors.border }]}
            onPress={openSettings}
            activeOpacity={0.75}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="settings" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>

      <View>
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filtersContainer}
          renderItem={({ item }) => {
            const isActive = item === activeFilter;
            return (
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: isActive ? colors.primary : colors.secondary,
                    borderColor: isActive ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setActiveFilter(item)}
                activeOpacity={0.75}
              >
                <Text
                  style={[
                    styles.filterText,
                    {
                      color: isActive ? colors.primaryForeground : colors.mutedForeground,
                      fontFamily: isActive ? "Inter_600SemiBold" : "Inter_400Regular",
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: bottomPad + 16 },
        ]}
        renderItem={({ item }) => <AircraftCard aircraft={item} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name="search" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
              No aircraft found
            </Text>
            <Text style={[styles.emptyDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              Try a different name, manufacturer, or route.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={closeMenu}
        statusBarTranslucent
      >
        <Pressable style={styles.overlay} onPress={closeMenu}>
          <Pressable
            style={[
              styles.sheet,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                paddingBottom: bottomPad + 12,
              },
            ]}
            onPress={() => {}}
          >
            <View style={[styles.sheetHandle, { backgroundColor: colors.border }]} />

            <View style={styles.sheetHeader}>
              <Text style={[styles.sheetTitle, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}>
                Settings
              </Text>
              <TouchableOpacity
                onPress={closeMenu}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Feather name="x" size={20} color={colors.mutedForeground} />
              </TouchableOpacity>
            </View>

            <View style={[styles.menuList, { borderColor: colors.border }]}>
              <TouchableOpacity
                style={[styles.menuItem, { borderBottomColor: colors.border }]}
                onPress={handlePrivacyPolicy}
                activeOpacity={0.7}
              >
                <View style={[styles.menuIconWrap, { backgroundColor: colors.secondary }]}>
                  <Feather name="shield" size={16} color={colors.primary} />
                </View>
                <View style={styles.menuItemText}>
                  <Text style={[styles.menuLabel, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
                    Privacy Policy
                  </Text>
                  <Text style={[styles.menuDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                    How we handle your data
                  </Text>
                </View>
                <Feather name="external-link" size={15} color={colors.mutedForeground} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleContactUs}
                activeOpacity={0.7}
              >
                <View style={[styles.menuIconWrap, { backgroundColor: colors.secondary }]}>
                  <Feather name="mail" size={16} color={colors.primary} />
                </View>
                <View style={styles.menuItemText}>
                  <Text style={[styles.menuLabel, { color: colors.foreground, fontFamily: "Inter_600SemiBold" }]}>
                    Contact Us
                  </Text>
                  <Text style={[styles.menuDesc, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
                    {CONTACT_EMAIL}
                  </Text>
                </View>
                <Feather name="chevron-right" size={15} color={colors.mutedForeground} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.versionText, { color: colors.mutedForeground, fontFamily: "Inter_400Regular" }]}>
              CabinIQ v1.0.0
            </Text>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 14,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  logoMark: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 18,
  },
  emptyDesc: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 32,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-end",
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 20,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 4,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sheetTitle: {
    fontSize: 18,
  },
  menuList: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemText: {
    flex: 1,
    gap: 2,
  },
  menuLabel: {
    fontSize: 15,
  },
  menuDesc: {
    fontSize: 12,
  },
  versionText: {
    fontSize: 12,
    textAlign: "center",
    paddingBottom: 4,
  },
});
