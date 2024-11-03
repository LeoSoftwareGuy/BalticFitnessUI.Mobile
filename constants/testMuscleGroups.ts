import { MuscleGroup } from "./types";

const allMuscleGroups: MuscleGroup[] = [
  {
    id: 1,
    name: "Chest",
    imageUrl: "assets/images/chest/Chest.png",
    type:"Upper",
    exercises: [
      {
        id: "d27baf0f-b501-40c5-b6a8-263802bb9261",
        muscleGroupId: 1,
        name: "BenchPress",
        imageUrl: "img/chest/BenchPress.jpg",
      },
      {
        id: "7f69b511-3dec-4783-9e86-9347a747cc41",
        muscleGroupId: 1,
        name: "BenchPressOneHand",
        imageUrl: "img/chest/BenchPressOneHand.jpg",
      },
      {
        id: "68e6b99d-a114-40d4-80c6-4452a814cfa7",
        muscleGroupId: 1,
        name: "CableCrossOver",
        imageUrl: "img/chest/CableCrossOver.jpg",
      },
      {
        id: "87795255-76b6-47f5-8d95-18d0bc5b1321",
        muscleGroupId: 1,
        name: "ChestHammerFlyes",
        imageUrl: "img/chest/ChestHammerFlyes.jpg",
      },
      {
        id: "f68581eb-3ac8-4c01-8934-547d0cfe5af4",
        muscleGroupId: 1,
        name: "ChestPullOver",
        imageUrl: "img/chest/ChestPullOver.jpg",
      },
      {
        id: "321d168b-3260-4660-a0c4-1b2f6c4cefa2",
        muscleGroupId: 1,
        name: "Dips",
        imageUrl: "img/chest/Dips.jpg",
      },
      {
        id: "225a56eb-034e-475a-aa1a-9bb78fb845dd",
        muscleGroupId: 1,
        name: "FlatBarbellPress",
        imageUrl: "img/chest/FlatBarbellPress.jpg",
      },
    ],
  },
  {
    id: 4,
    name: "Shoulders",
    imageUrl: "images/chest/Chest.png",
    type:"Upper",
    exercises: [
      {
        id: "b6978e2d-bfd7-4b8c-bf0d-b99d1260183d",
        muscleGroupId: 4,
        name: "ArnoldPress",
        imageUrl: "img/delts/ArnoldPress.jpg",
      },
      {
        id: "65c5fa62-f772-4cbb-8391-4ff92e46e1f3",
        muscleGroupId: 4,
        name: "FrontDeltRaises",
        imageUrl: "img/delts/FrontDeltRaises.jpg",
      },
      {
        id: "52c5f2bc-17c3-46a5-ae58-7b211350b3cd",
        muscleGroupId: 4,
        name: "RearDeltsRaises",
        imageUrl: "img/delts/RearDeltsRaises.jpg",
      },
      {
        id: "cda4dd94-dc9c-43c4-98ee-66ea884f8cc0",
        muscleGroupId: 4,
        name: "ShouldBarbelSmithPress",
        imageUrl: "img/delts/ShouldBarbelSmithPress.jpg",
      },
      {
        id: "3a8ddb87-5c38-409f-923c-dfc0a9dd53ef",
        muscleGroupId: 4,
        name: "ShouldDumbellPress",
        imageUrl: "img/delts/ShouldDumbellPress.jpg",
      },
    ],
  },
  {
    id: 8,
    name: "Abs",
    imageUrl: "images/chest/Chest.png",
    type:"Cardio",
    exercises: [
      {
        id: "6dd1ec7c-ed6a-4536-9fd5-37c7e80e91f4",
        muscleGroupId: 8,
        name: "AbsHarley",
        imageUrl: "img/abs/AbsHarley.jpg",
      },
      {
        id: "fad646e6-26ce-4bca-9ed5-b3ac67dda1fb",
        muscleGroupId: 8,
        name: "Crunches",
        imageUrl: "img/abs/Crunches.jpg",
      },
      {
        id: "049c8f33-1af9-47dc-9016-e54a2416b6cc",
        muscleGroupId: 8,
        name: "LowerAbsLieRaises",
        imageUrl: "img/abs/LowerAbsLieRaises.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "Legs",
    imageUrl: "images/legs/Glutes.png",
    type:"Lower",
    exercises: [
      {
        id: "4c21eaa6-9ede-49cc-84f2-84ecc2eebd4b",
        muscleGroupId: 3,
        name: "BarbelLunges",
        imageUrl: "img/legs/BarbelLunges.jpg",
      },
      {
        id: "846bee10-cae8-4db4-bb94-55c5e17dd687",
        muscleGroupId: 3,
        name: "Deadlift",
        imageUrl: "img/legs/Deadlift.jpg"
      },
      {
        id: "88257be3-fc96-4f16-9e8b-f78cd0871574",
        muscleGroupId: 3,
        name: "DumbellDeadlift",
        imageUrl: "img/legs/DumbellDeadlift.jpg"
      },
      {
        id: "8db5ef3b-eae7-496d-8d19-0dccd4c961fe",
        muscleGroupId: 3,
        name: "DumbleSqauts",
        imageUrl: "img/legs/DumbleSqauts.jpg"
      },
    ],
  },
  {
    id: 5,
    name: "Biceps",
    imageUrl: "images/chest/Chest.png",
    type:"Upper",
    exercises: [
      {
        id: "08ab7b76-0d58-4d13-aed5-fc11b7d531ed",
        muscleGroupId: 5,
        name: "BicepsHammer",
        imageUrl: "img/biceps/BicepsHammer.jpg",
      },
      {
        id: "c600436a-a9ad-49ef-90c6-98e7f8569a1c",
        muscleGroupId: 5,
        name: "StandingBicepsBenchCurls",
        imageUrl: "img/biceps/StandingBicepsBenchCurls.jpg"
      },
      {
        id: "803970a0-f776-4882-add0-5874d93398f8",
        muscleGroupId: 5,
        name: "StandingBicepsCableCurls",
        imageUrl: "img/biceps/StandingBicepsCableCurls.jpg"
      },
      {
        id: "b7165086-09f0-40f5-bc0d-6c3ababa2434",
        muscleGroupId: 5,
        name: "StandingBicepsDumbellCurls",
        imageUrl: "img/biceps/StandingBicepsDumbellCurls.jpg"
      }
    ],
  },
  {
    id: 6,
    name: "Triceps",
    imageUrl: "images/chest/Chest.png",
    type:"Upper",
    exercises: [
      {
        id: "4f0e5f18-721d-463a-9764-5b8fe3856521",
        muscleGroupId: 6,
        name: "Dips",
        imageUrl: "img/triceps/Dips.jpg"
      },
      {
        id: "212fa653-c21b-475c-95bc-93e5a2d646a9",
        muscleGroupId: 6,
        name: "LyingTricepsDumbellExtensions",
        imageUrl: "img/triceps/LyingTricepsDumbellExtensions.jpg"
      },
      {
        id: "11f8d57e-0ecd-4cec-bf13-31add2c08016",
        muscleGroupId: 6,
        name: "LyingTricepsFrenchPress",
        imageUrl: "img/triceps/LyingTricepsFrenchPress.jpg"
      },
      {
        id: "f7073772-8327-4b74-9f82-a762ca7d86c9",
        muscleGroupId: 6,
        name: "StandingOverheadOneArmCableTricepsExtension",
        imageUrl: "img/triceps/StandingOverheadOneArmCableTricepsExtension.jpg"
      },
      {
        id: "c5bea264-b956-4e6d-9281-c5afca99e2c5",
        muscleGroupId: 6,
        name: "StandingTricepsOverheadCableExtension",
        imageUrl: "img/triceps/StandingTricepsOverheadCableExtension.jpg"
      }
    ]
  },
  {
    id: 7,
    name: "Calves",
    imageUrl: "images/legs/Glutes.png",
    type:"Lower",
    exercises: [
      {
        id: "fb5b7b31-8bf7-4cab-974d-c1f768163c72",
        muscleGroupId: 7,
        name: "CalfRaises",
        imageUrl: "img/calves/CalfRaises.jpg"
      },
      {
        id: "d43a515a-67a8-4a95-b510-1821de2f3887",
        muscleGroupId: 7,
        name: "CalfSmithRaises",
       imageUrl: "img/calves/CalfSmithRaises.jpg"
      }
    ]
  },
  {
    id: 2,
    name: "Back",
    imageUrl: "images/chest/Chest.png",
    type:"Upper",
    exercises: [
      {
        id: "ed8e3489-cb0d-498f-a557-03523281d7cc",
        muscleGroupId: 2,
        name: "TBarRows",
        imageUrl: "img/back/TBarRows.jpg"
      },
      {
        id: "14209cf3-19e7-4599-b3a7-616ef8b4d211",
        muscleGroupId: 2,
        name: "BackPullOver",
        imageUrl: "img/back/BackPullOver.jpg"
      },
      {
        id: "e00527d1-4d4e-4d66-9241-9c2c6fe22711",
        muscleGroupId: 2,
        name: "BarbellShrugs",
        imageUrl: "img/back/BarbellShrugs.jpg"
      },
      {
        id: "979b4687-d02e-44e6-b48e-180c149cc9f4",
        muscleGroupId: 2,
        name: "HorizontalCableRow",
        imageUrl: "img/back/HorizontalCableRow.jpg"
      },
      {
        id: "32982607-a622-4a95-9171-ae1ba0226c3f",
        muscleGroupId: 2,
        name: "HyperExtensions",
        imageUrl: "img/back/HyperExtensions.jpg"
      },
      {
        id: "2f6f0a1a-1f0c-42f5-8d5a-124e0eb7140e",
        muscleGroupId: 2,
        name: "InclineBenchRow",
        imageUrl: "img/back/InclineBenchRow.jpg"
      },
      {
        id: "69b6287f-a927-4d9b-b7a9-e2fd36c7204b",
        muscleGroupId: 2,
        name: "LatPullDown",
        imageUrl: "img/back/LatPullDown.jpg"
      }
    ]
  }
];
export default allMuscleGroups;
