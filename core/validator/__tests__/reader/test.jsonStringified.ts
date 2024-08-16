import { JsonReader } from "../../src/reader/readers/json.ts";

const jsonStringified = JSON.stringify([
  {
    "721": {
      "48ef9fb80a0ad2fd9f3d5b981ef3bfac2bae84137523217b387a775b": {
        FortGottenEp02Kid3195: {
          Accessory: "None",
          Backpack: "None",
          Body: "Icy Lavender",
          Camp: "BURUKA",
          Clothing: "None",
          Episode: "Beyond The Forest",
          FGI: ["e03c9389d69-202111002110"],
          Hat: "None",
          "Kid Number": "3195",
          "Kidz Journal": {
            Achievement: "None",
            Customizations: 1,
          },
          Mask: "None",
          Necklace: "None",
          Region: "Mountains",
          Role: "Scout",
          Staff: "None",
          Straps: "None",
          Website: "https://fort-gotten.com",
          Wheelchair: "None",
          files: [
            {
              mediaType: "image/png",
              name: "Fort Gotten Ep02 Kid #3195",
              src: "ipfs://QmWhS125ua7fV3JNy4mDb5HxeuJxQyd75Yokn67jmiJqxR",
            },
          ],
          image: "ipfs://QmXTstzWgt3vs135V8J63sFVGDJnyBaEmFtFq23Xro8uPJ",
          mediaType: "image/png",
          name: "Fort Gotten Ep02 Kid #3195",
        },
      },
    },
  },
  {
    "721": {
      "48ef9fb80a0ad2fd9f3d5b981ef3bfac2bae84137523217b387a775b": {
        FortGottenEp02Kid3963: {
          attributes: { Head: 21 },
          traits: ["test", 21],
          Accessory: "None",
          Backpack: "None",
          Body: "Icy Lavender",
          Camp: "BURUKA",
          Clothing: "None",
          Episode: "Beyond The Forest",
          FGI: ["e141ec5373712224-202111022212"],
          Hat: "None",
          "Kid Number": "3963",
          "Kidz Journal": {
            Achievement: "None",
            Customizations: 1,
          },
          Mask: "None",
          Necklace: "None",
          Region: "Mountains",
          Role: "Cleric",
          Staff: "None",
          Straps: "None",
          Website: "https://fort-gotten.com",
          Wheelchair: "None",
          files: [
            {
              mediaType: "image/png",
              name: "Fort Gotten Ep02 Kid #3963",
              src: "ipfs://QmPAA4Y9SQdCFwWbDqJfk614huHwujnvy2AQN35mYbWBBr",
            },
          ],
          image: "ipfs://QmW1Z98f2u8oPJK9E9Hi3KEXNjzwdas3aT7iQzpX1525yS",
          mediaType: "image/png",
          name: "Fort Gotten Ep02 Kid #3963",
        },
      },
    },
  },
]);

const jsonReader = new JsonReader();
jsonReader.Load(jsonStringified);

const data = jsonReader.Read();

console.log("DATA TO VALIDATE", data);
