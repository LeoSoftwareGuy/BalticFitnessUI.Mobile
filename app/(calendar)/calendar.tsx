import { Training } from "@/constants/types";
import BottomSheet from "@gorhom/bottom-sheet";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Calendar, DateData } from "react-native-calendars";
import { SafeAreaView, ScrollView } from "react-native";
import BottomSheetComponent from "@/app/(calendar)/components/BottomSheetCalendarComponent";

export default function CalendarPage() {

    const {
        data: allTrainings,
        isLoading,
        error,
      } = useAllTrainings();


  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selected, setSelected] = useState<string>(""); // to visually distinguish between other dates
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(
    null
  );


  const bottomSheetRef = useRef<BottomSheet>(null);

  let date = `${selectedTraining?.trainedAtDay}.${currentMonth}.${selectedTraining?.trainedAtYear}`;
  const expandBottomSheet = useCallback(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  }, []);

  const closeBottomSheet = useCallback(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  }, []);

  const selectTrainingDay = (day: DateData) => {
    setSelected(day.dateString);

    const trainingForDay = markedDates[day.dateString].training;
    setSelectedTraining(trainingForDay);

    if (bottomSheetRef.current) {
      expandBottomSheet(); 
     }
  };

  const onClose = () => closeBottomSheet();

  useEffect(() => {
    const newMarkedDates: { [key: string]: any } = {};

    // Filter trainings for the current month
    const trainingsForCurrentMonth = allTrainings.filter(
      (training) => training.trainedAtMonth === currentMonth
    );

    // Mark the dates for this month
    trainingsForCurrentMonth.forEach((training) => {
      const trainingDate = `${training.trainedAtYear}-${String(
        training.trainedAtMonth
      ).padStart(2, "0")}-${String(training.trainedAtDay).padStart(2, "0")}`;
      newMarkedDates[trainingDate] = {
        selected: trainingDate === selected,
        marked: true,
        disableTouchEvent: false,
        training: training,
        dotColor:"#2AB38E",
     
      };
    });

    setMarkedDates(newMarkedDates);
  }, [currentMonth, selected]);

  return (
    <>
      <SafeAreaView className="h-full bg-primary ">
        <ScrollView>
          <Calendar
            theme={{
              calendarBackground: "transparent",
              textSectionTitleColor: "#ffffff",
              selectedDayBackgroundColor: "#2AB38E",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#2AB38E",
              dayTextColor: "#ffffff",
              textDisabledColor: "transparent",
              monthTextColor: "#2AB38E",
              textMonthFontSize: 20,
              arrowColor: "#ffffff",
              textMonthFontFamily: "font-pRegular",
            }}
            disableMonthChange={false}
            current={`${currentYear}-${String(currentMonth).padStart(
              2,
              "0"
            )}-01`}
            enableSwipeMonths={true}
            onDayPress={(day: DateData) => {
              if (markedDates[day.dateString]) {
                selectTrainingDay(day);
              }
            }}
            onMonthChange={(month: DateData) => {
              setCurrentMonth(month.month);
              setCurrentYear(month.year);
              setSelected("");
              setSelectedTraining(null);
              closeBottomSheet();
            }}
            markedDates={{ ...markedDates }}
          />
        </ScrollView>

        {selectedTraining && (
          <BottomSheetComponent
            ref={bottomSheetRef}
            training={selectedTraining}
            title={date}
            onClose={onClose}
          />
        )}
      </SafeAreaView>
    </>
  );
}
