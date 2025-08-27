import { openDB } from "idb";

const DB_NAME = "cryptoDB";
const STORE_NAME = "cryptos";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}


export async function saveCryptos(list: any[]) {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  list.forEach((crypto) => store.put(crypto));
  await tx.done;
}


export async function getCryptos() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}
