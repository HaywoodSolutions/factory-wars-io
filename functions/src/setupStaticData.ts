import * as functions from "firebase-functions";
import * as _ from "lodash";
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

  await Promise.all(Structures.map(async (s) => {
    const snap = await db.collection("structures").doc(s.id).get();

    if (!snap.exists) {
      batch.set(db.collection("structures").doc(s.id), {
        ...s
      });
    } else {
      const data = snap.data();
      if (!_.isEqual(data, s)) {
        batch.set(db.collection("structures").doc(s.id), {
          ...s
        });
      }
    }
  }));

  await batch.commit();

  res.send("Success");

  return;
});
