import { getApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, FieldPath, WhereFilterOp, QuerySnapshot, DocumentData, doc, getDoc, CollectionReference, setDoc, updateDoc, UpdateData, limit, addDoc } from "firebase/firestore";

const db = getFirestore(getApp());

type Where = [string | FieldPath, WhereFilterOp, unknown];

export class DB<D extends DocumentData> {
  private pathSegments: string[]

  constructor(private path: string, ...pathSegments: string[]) {
    this.pathSegments = pathSegments;
  }

  private get collection(): CollectionReference<D> {
    return collection(db, this.path, ...this.pathSegments) as CollectionReference<D>;
  }

  private getDocs(whereCommands: Where[] = [], limitVal: number = 25): Promise<QuerySnapshot<D>> {
    const q = query(this.collection, ...whereCommands.map((v) => where(...v)), limit(limitVal));
    return getDocs(q);
  }

  async getIds(): Promise<string[]> {
    const querySnapshot = await this.getDocs();
    const data: string[] = [];

    querySnapshot.forEach((doc) => {
      data.push(doc.id);
    });

    return data;
  }

  async getWhere(whereCommands: Where[] = [], limitVal: number = 25): Promise<Record<string, D>> {
    const querySnapshot = await this.getDocs(whereCommands, limitVal);
    const data: Record<string, D> = {};

    querySnapshot.forEach((doc) => {
      data[doc.id] = doc.data();
    });
    
    return data;
  }

  async getById(id: string): Promise<D> {
    const docRef = doc(this.collection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return Promise.resolve(docSnap.data());
    } else {
      return Promise.reject()
    }
  }

  async set(id: string, value: D): Promise<void> {
    const docRef = doc(this.collection, id);
    return await setDoc(docRef, value);
  }

  async update(id: string, value: UpdateData<D>): Promise<void> {
    const docRef = doc(this.collection, id);
    return await updateDoc(docRef, value);
  }

  async add(value: D): Promise<string> {
    const doc = await addDoc(this.collection, value);
    return doc.id;
  }
}
