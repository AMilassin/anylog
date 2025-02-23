import { format, isToday, isYesterday, parseISO } from "date-fns";
import { SectionList, Text, TouchableOpacity, View } from "react-native";
import { PlusIcon } from "react-native-heroicons/solid";

// Mock data - replace with your actual data source
const EVENTS = [
  {
    id: "1",
    type: "milestone",
    title: "Got promoted!",
    timestamp: new Date().toISOString(),
    details: "Senior Developer role",
  },
  {
    id: "2",
    type: "memory",
    title: "Anniversary",
    timestamp: "2024-03-14T09:00:00Z",
    details: "10 years together!",
  },
];

const HomeScreen = () => {
  // Group events by day
  const groupedEvents = EVENTS.reduce((acc, event) => {
    const date = format(parseISO(event.timestamp), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});

  const sections = Object.entries(groupedEvents).map(([date, events]) => ({
    title: date,
    data: events,
  }));

  // Format section headers
  const getHeaderTitle = (date) => {
    const parsedDate = parseISO(date);
    if (isToday(parsedDate)) return "Today";
    if (isYesterday(parsedDate)) return "Yesterday";
    return format(parsedDate, "MMM dd, yyyy");
  };

  const EventCard = ({ item }) => (
    <View className="bg-white p-4 rounded-lg mb-2 shadow-sm">
      <View className="flex-row items-center">
        <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center mr-3">
          <Text className="text-lg">{item.type === "milestone" ? "🏆" : item.type === "memory" ? "❤️" : "📝"}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold">{item.title}</Text>
          {item.details && <Text className="text-sm text-gray-500 mt-1">{item.details}</Text>}
        </View>
        <Text className="text-sm text-gray-400">{format(parseISO(item.timestamp), "HH:mm")}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/*<SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard item={item} />}
        renderSectionHeader={({ section }) => (
          <View className="px-4 py-2 bg-gray-100">
            <Text className="font-bold text-gray-600">
              {getHeaderTitle(section.title)} • {section.data.length} events
            </Text>
          </View>
        )}
        contentContainerStyle="pb-16"
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-8">
            <Text className="text-lg text-gray-500 mb-2">No events yet</Text>
            <Text className="text-gray-400 text-center">Tap the + button below to log your first life event</Text>
          </View>
        }
      />*/}

      {/* FAB */}
      <TouchableOpacity
        className="absolute bottom-8 right-6 bg-blue-500 p-4 rounded-full shadow-lg"
        onPress={() => {
          /* Navigate to log screen */
        }}
      >
        <PlusIcon size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
