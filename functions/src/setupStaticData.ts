import * as functions from "firebase-functions";
import {
  db
} from "./admin";

type Structure = {
  id: string,
  name: string
} & ({
  buildable: true,
  build?: {
    requiresBuiltOn?: string,
    requiresBuildings?: Record<string, number>
  }
} | {
  buildable: false
})

// type StructureInstance = {
//   id: string,
//   typeId: string
// }

const Structures: Structure[] = [
  {
    id: "HEADQUATERS",
    name: "Headquarters",
    buildable: true
  },
  {
    id: "RESOURCE",
    name: "Resource",
    buildable: false
  },
  {
    id: "EXTRACTOR",
    name: "Extractor",
    buildable: true,
    build: {
      requiresBuiltOn: "RESOURCE",
      requiresBuildings: {
        "HEADQUARTERS": 1
      }
    }
  },
  {
    id: "DRONE_BASE",
    name: "Drone Base",
    buildable: true,
    build: {
      requiresBuildings: {
        "HEADQUARTERS": 1
      }
    }
  }
];

export const setupStaticSturctures = functions.https.onRequest(async (req, res) => {
  const batch = db.batch();

  Structures.map((s) => {
    batch.set(db.collection("structures").doc(s.id), {
      ...s
    });
  });

  await batch.commit();

  res.send("Success");

  return;
});
