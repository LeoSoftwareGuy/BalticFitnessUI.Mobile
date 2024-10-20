import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  Calendar,
  CalendarList,
  Agenda,
  DateData,
} from "react-native-calendars";
import React, { useEffect, useRef, useState } from "react";
import BottomSheetComponent from "@/components/BottomSheetComponent";
import BottomSheet from "@gorhom/bottom-sheet";

// Type for Exercise
interface Exercise {
  id: string;
  muscleGroupId: number;
  name: string;
  imageUrl: string;
}

// Type for ExerciseSet
interface ExerciseSet {
  reps: number;
  weight: number;
  pre: number;
  exercise: Exercise;
}

// Type for Training
interface Training {
  trainedAtTime: string;
  trainedAtMonth: number;
  trainedAtDay: number;
  trainedAtYear: number;
  muscleGroups: string[];
  exerciseSets: ExerciseSet[];
}

const Bookmark = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selected, setSelected] = useState<string>(""); // to visually distinguish between other dates
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  const allTrainings: Training[] = [
    {
      trainedAtTime: "09:38",
      trainedAtMonth: 10,
      trainedAtDay: 20,
      trainedAtYear: 2024,
      muscleGroups: ["Shoulders"],
      exerciseSets: [
        {
          reps: 10,
          weight: 40,
          pre: 8,
          exercise: {
            id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
            muscleGroupId: 4,
            name: "ArnoldPress",
            imageUrl: "img/delts/ArnoldPress.jpg",
          },
        },
      ],
    },
    {
      trainedAtTime: "12:30",
      trainedAtMonth: 10,
      trainedAtDay: 18,
      trainedAtYear: 2024,
      muscleGroups: ["Chest"],
      exerciseSets: [
        {
          reps: 10,
          weight: 10,
          pre: 8,
          exercise: {
            id: "321d168b-3260-4660-a0c4-1b2f6c4cefa2",
            muscleGroupId: 1,
            name: "Dips",
            imageUrl: "img/chest/Dips.jpg",
          },
        },
      ],
    },
    {
      trainedAtTime: "12:30",
      trainedAtMonth: 10,
      trainedAtDay: 10,
      trainedAtYear: 2024,
      muscleGroups: ["Chest"],
      exerciseSets: [
        {
          reps: 10,
          weight: 89,
          pre: 8,
          exercise: {
            id: "68e6b99d-a114-40d4-80c6-4452a814cfa7",
            muscleGroupId: 1,
            name: "CableCrossOver",
            imageUrl: "img/chest/CableCrossOver.jpg",
          },
        },
      ],
    },
    {
      trainedAtTime: "12:30",
      trainedAtMonth: 9,
      trainedAtDay: 18,
      trainedAtYear: 2024,
      muscleGroups: ["Chest"],
      exerciseSets: [
        {
          reps: 7,
          weight: 70,
          pre: 7,
          exercise: {
            id: "3930435c-94fa-4a0c-8d46-5a59dae283e4",
            muscleGroupId: 1,
            name: "BenchPress",
            imageUrl: "img/chest/BenchPress.jpg",
          },
        },
      ],
    },
  ];

const bottomSheetRef = useRef<BottomSheet>(null);
  const selectTrainingDay = (day: DateData) => {
    setSelected(day.dateString);
   
    const trainingForDay = markedDates[day.dateString].training
    setSelectedTraining(trainingForDay);
    console.log(day.dateString);
    console.log(trainingForDay);
    console.log(selected);
  };

  
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
        dotColor: "green",
        disableTouchEvent: false,
        training: training,
      };
    });

    setMarkedDates(newMarkedDates);
  }, [currentMonth, selected]);

  return (
    <>
      <SafeAreaView className="h-full bg-primary">
        <ScrollView>
          <Calendar
            style={{
              borderWidth: 1,
              borderColor: "gray",
              height: 350,
            }}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: "#00adf5",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
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
            }}
            markedDates={{
              ...markedDates           
            }}
          />
<BottomSheetComponent ref={bottomSheetRef} training ={selectedTraining} title='Your training that day' />
          {/* {selectedTraining && <BottomSheetComponent ref={bottomSheetRef} training ={selectedTraining} title='Your training that day' />} */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Bookmark;
