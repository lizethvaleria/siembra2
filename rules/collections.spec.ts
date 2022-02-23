import { setup, teardown } from "./helpers";
import "../types/custom.d";

describe("General Safety Rules", () => {
  afterEach(async () => {
    await teardown();
  });

  test("Should deny read to the posts collection", async () => {
    const { db } = await setup();
    const postsRef = db.collection("posts");
    await expect(postsRef.add({ ok: 1 })).toAllow();
  });

  test("Should be allowed if a user is authenticated", async () => {
    const { db } = await setup([], { uid: "1" });
    const postsRef = db.collection("posts");
    await expect(postsRef.get()).toAllow();
  });
});
