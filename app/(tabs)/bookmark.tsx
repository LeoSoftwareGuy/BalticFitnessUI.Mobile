import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  Calendar,
  CalendarList,
  Agenda,
  DateData,
} from "react-native-calendars";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheetComponent from "@/components/BottomSheetComponent";
import BottomSheet from "@gorhom/bottom-sheet";

// Type for Exercise
export interface Exercise {
  id: string;
  muscleGroupId: number;
  name: string;
  imageUrl: string;
}

// Type for ExerciseSet
export interface ExerciseSet {
  reps: number;
  weight: number;
  pre: number;
  exercise: Exercise;
}

export interface ExerciseGroupDto {
  name: string;
  id: string; 
  exerciseSets: ExerciseSet[];
}
// Type for Training
export interface Training {
  trainedAtTime: string;
  trainedAtMonth: number;
  trainedAtDay: number;
  trainedAtYear: number;
  exercisesPerMuscleGroup: Record<string, ExerciseGroupDto[]>;
}

const Bookmark = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selected, setSelected] = useState<string>(""); // to visually distinguish between other dates
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(
    null
  );


  //try more sets per exercise
  // try more exercies per muscleGroup
  // try more muscleGroups per training
  const allTrainings: Training[] = [
    {
      trainedAtTime: "09:38",
      trainedAtMonth: 10,
      trainedAtDay: 20,
      trainedAtYear: 2024,
      exercisesPerMuscleGroup: {
        "Shoulders":[
          {
            name: "Arnold Press",
            id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
            exerciseSets : [
              {
                reps: 10,
                weight: 40,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Arnold Press",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                }
              },
              {
                reps: 10,
                weight: 45,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Arnold Press",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
              {
                reps: 15,
                weight: 50,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Arnold Press",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
            ]
          },
          {
            name: "Lateral Raises",
            id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
            exerciseSets : [
              {
                reps: 20,
                weight: 10,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Lateral Raises",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                }
              },
              {
                reps: 15,
                weight: 12,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Lateral Raises",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
              {
                reps: 10,
                weight: 15,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Lateral Raises",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
            ]
          },
          {
            name: "Rear Delts Cable Pull",
            id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
            exerciseSets : [
              {
                reps: 20,
                weight: 7.5,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Rear Delts Cable Pull",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                }
              },
              {
                reps: 15,
                weight:  7.5,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Rear Delts Cable Pull",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
              {
                reps: 10,
                weight:  7.5,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Rear Delts Cable Pull",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
            ]
          }
       
        ]
      }      
    },
    {
      trainedAtTime: "12:30",
      trainedAtMonth: 10,
      trainedAtDay: 18,
      trainedAtYear: 2024,
      exercisesPerMuscleGroup: {
        "Chest":[
          {
            name: "Bench Press",
            id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
            exerciseSets : [
              {
                reps: 10,
                weight: 80,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Bench Press",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                }
              },
              {
                reps: 10,
                weight: 80,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Bench Press",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
              {
                reps: 8,
                weight: 80,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Bench Press",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
            ]
          },
          {
            name: "Cable Chest Extensions",
            id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
            exerciseSets : [
              {
                reps: 20,
                weight: 20,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Cable Chest Extensions",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                }
              },
              {
                reps: 20,
                weight: 20,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Cable Chest Extensions",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
              {
                reps: 20,
                weight: 20,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Cable Chest Extensions",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
            ]
          },
          {
            name: "Rear Delts Cable Pull",
            id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
            exerciseSets : [
              {
                reps: 20,
                weight: 7.5,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Rear Delts Cable Pull",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                }
              },
              {
                reps: 15,
                weight:  7.5,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Rear Delts Cable Pull",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
              {
                reps: 10,
                weight:  7.5,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Rear Delts Cable Pull",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
            ]
          }
       
        ]
      }      
    },
    {
      trainedAtTime: "12:30",
      trainedAtMonth: 10,
      trainedAtDay: 10,
      trainedAtYear: 2024,
      exercisesPerMuscleGroup: {
        "Shoulders":[
          {
            name: "Arnold Press",
            id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
            exerciseSets : [
              {
                reps: 10,
                weight: 40,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Arnold Press",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                }
              },
              {
                reps: 10,
                weight: 45,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Arnold Press",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
              {
                reps: 15,
                weight: 50,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Arnold Press",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
            ]
          },
          {
            name: "Lateral Raises",
            id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
            exerciseSets : [
              {
                reps: 20,
                weight: 10,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Lateral Raises",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                }
              },
              {
                reps: 15,
                weight: 12,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Lateral Raises",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
              {
                reps: 10,
                weight: 15,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Lateral Raises",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
            ]
          },
          {
            name: "Rear Delts Cable Pull",
            id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
            exerciseSets : [
              {
                reps: 20,
                weight: 7.5,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Rear Delts Cable Pull",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                }
              },
              {
                reps: 15,
                weight:  7.5,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Rear Delts Cable Pull",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
              {
                reps: 10,
                weight:  7.5,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Rear Delts Cable Pull",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
            ]
          }   
        ]
      }      
    },
    {
      trainedAtTime: "12:30",
      trainedAtMonth: 9,
      trainedAtDay: 18,
      trainedAtYear: 2024,
      exercisesPerMuscleGroup: {
        "Shoulders":[
          {
            name: "Arnold Press",
            id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
            exerciseSets : [
              {
                reps: 10,
                weight: 40,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Arnold Press",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                }
              },
              {
                reps: 10,
                weight: 45,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Arnold Press",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
              {
                reps: 15,
                weight: 50,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Arnold Press",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
            ]
          },
          {
            name: "Lateral Raises",
            id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
            exerciseSets : [
              {
                reps: 20,
                weight: 10,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Lateral Raises",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                }
              },
              {
                reps: 15,
                weight: 12,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Lateral Raises",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
              {
                reps: 10,
                weight: 15,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Lateral Raises",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
            ]
          },
          {
            name: "Rear Delts Cable Pull",
            id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
            exerciseSets : [
              {
                reps: 20,
                weight: 7.5,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Rear Delts Cable Pull",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                }
              },
              {
                reps: 15,
                weight:  7.5,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Rear Delts Cable Pull",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
              {
                reps: 10,
                weight:  7.5,
                pre: 8,
                exercise: {
                  id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
                  muscleGroupId: 4,
                  name: "Rear Delts Cable Pull",
                  imageUrl: "img/delts/ArnoldPress.jpg",
                },
              },
            ]
          }
       
        ]
      }      
    },
  ];
 
  const bottomSheetRef = useRef<BottomSheet>(null);

  const getMonthName = ()=>{
    switch(currentMonth){
      case 1:return "January";       
      case 2:  return "February";     
      case 3: return "March";    
      case 4:return "April";       
      case 5: return "May";
      case 6: return "June";
      case 7: return "July";
      case 8: return "August";
      case 9: return "September";
      case 10: return "October";
      case 11: return "November";
      case 12: return "December";
    }
  }
  let date = `${selectedTraining?.trainedAtDay} ${getMonthName()} ${selectedTraining?.trainedAtYear}: ${selectedTraining?.trainedAtTime}`;
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
      // If the sheet is already open, close it first, then expand it with new data
      closeBottomSheet();

      setTimeout(() => {
        expandBottomSheet(); // Ensure it expands after it closes
      }, 300); // Adjust this delay to match the closing animation timing
    } else {
      expandBottomSheet(); // If the sheet isn't open, simply expand it
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
              setSelectedTraining(null);
              closeBottomSheet();
            }}
            markedDates={{ ...markedDates }}
          />
        </ScrollView>

        {/* Bottom Sheet Component should be placed outside of ScrollView */}
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
};

export default Bookmark;
