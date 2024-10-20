import { StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

// interface Props {
//     title:string;
//     training:any
// }
// type Ref = BottomSheet;

// const BottomSheetComponent =forwardRef<Ref,Props>((props,ref) => {
//   const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);

//   const bottomSheetRef = useRef<BottomSheet>(null);

//   const handleClosePress = () => bottomSheetRef.current?.close();
//   const handleOpenPress = () => bottomSheetRef.current?.expand();
// //   const renderBackdrop = useCallback((props:any)=><BottomSheetBackdrop
// //    appearsOnIndex={1}
// //    disappearsOnIndex={-1}/>,[])

//   return ( 
//       <BottomSheet
//        ref={ref}
//         index={1}
//          snapPoints={snapPoints}
//          backgroundStyle={{backgroundColor:'#fff'}}
//          handleIndicatorStyle={{backgroundColor:'#fff'}}>
//         <View style={styles.contentContainer}>
//           <Text style={styles.containerHeadline}>{props.title}</Text>
//           <Text>Time: {props.training.trainedAtTime}</Text>
//             <Text>Muscle Groups: {props.training.muscleGroups.join(", ")}</Text>
//             {props.training.exerciseSets.map((set:any, idx:any) => (
//               <View key={idx}>
//                 <Text>{set.exercise.name}</Text>
//                 <Text>Reps: {set.reps}, Weight: {set.weight}</Text>
//               </View>
//             ))}
//         </View>
//       </BottomSheet>
//   );
// });

// export default BottomSheetComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: 600,
    padding: 20,
  },
});





const BottomSheetComponent = ((props:any) => {
    const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  
    const bottomSheetRef = useRef<BottomSheet>(null);
  
    const handleClosePress = () => bottomSheetRef.current?.close();
    const handleOpenPress = () => bottomSheetRef.current?.expand();
  //   const renderBackdrop = useCallback((props:any)=><BottomSheetBackdrop
  //    appearsOnIndex={1}
  //    disappearsOnIndex={-1}/>,[])
  
    return ( 
        <BottomSheet
       
          index={1}
           snapPoints={snapPoints}
           backgroundStyle={{backgroundColor:'red'}}
           handleIndicatorStyle={{backgroundColor:'#fff'}}>
           <Text>Show Something Bithc</Text>
        </BottomSheet>
    );
  });
  
  export default BottomSheetComponent;