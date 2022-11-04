import * as functions from "firebase-functions";
import * as _ from "lodash";
import {
  db
} from "./admin";

type Structure = {
  id: string,
  name: string,
  description: string,
  size: {
    width: number,
    height: number
  },
  grid: string // "0|1[]"
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
    description: "",
    size: {
      width: 3,
      height: 3
    },
    grid: "111111111",
    buildable: true
  },
  {
    id: "RESOURCE",
    name: "Resource",
    description: "",
    size: {
      width: 1,
      height: 1
    },
    grid: "1",
    buildable: false
  },
  {
    id: "EXTRACTOR",
    name: "Extractor",
    description: "",
    size: {
      width: 1,
      height: 1
    },
    grid: "1",
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
    description: "",
    size: {
      width: 2,
      height: 2
    },
    grid: "1111",
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
