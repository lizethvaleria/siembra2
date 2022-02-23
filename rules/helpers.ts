import * as firebase from "@firebase/rules-unit-testing";
import * as fs from "fs";
import dotenv from "dotenv";
import { TokenOptions } from "@firebase/rules-unit-testing/dist/src/api";
dotenv.config();

interface AuthUser {
  uid?: string;
  email?: string;
}

interface Data extends Record<string, Object> {}

export const setup = async (
  dataRecords: Data[] = [],
  user: TokenOptions | undefined = undefined
) => {
  const app = firebase.initializeTestApp({
    projectId: "prueba-b9777",
    auth: user,
  });
  const db = app.firestore();
  await firebase.loadFirestoreRules({
    projectId: "prueba-b9777",
    rules: fs.readFileSync("firestore-test.rules", "utf-8"),
  });

  //   Load data if needed
  for (const key in dataRecords) {
    const ref = db.doc(key);
    await ref.set(dataRecords[key]);
  }

  await firebase.loadFirestoreRules({
    projectId: "prueba-b9777",
    rules: fs.readFileSync("firestore.rules", "utf-8"),
  });

  return { db };
};

export const teardown = async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
};

expect.extend({
  async toAllow(testPromise: Promise<unknown>) {
    let pass = false;
    try {
      await firebase.assertSucceeds(testPromise);
      pass = true;
    } catch (error) {
      console.log(error);
    }
    return {
      pass,
      message: () =>
        "Expected Firebase operation to be allow, but it was denied",
    };
  },
});

expect.extend({
  async toDeny(testPromise: Promise<unknown>) {
    let pass = false;
    try {
      await firebase.assertFails(testPromise);
      pass = true;
    } catch (error) {
      console.log(error);
    }
    return {
      pass,
      message: () =>
        "Expected Firebase operation to be denied, but it was allowed",
    };
  },
});
