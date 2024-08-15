import { CsvReader } from "../../src/reader/readers/csv.ts";

const csvData = `"Accessory","Backpack","Body","Camp","Clothing","Episode","FGI__-","Hat","Kid Number","Kidz Journal__Achievement","Kidz Journal__Customizations","Mask","Necklace","Region","Role","Staff","Straps","Website","Wheelchair","files__mediaType","files__name","files__src","image","mediaType","name"
"None","None","Icy Lavender","BURUKA","None","Beyond The Forest","e03c9389d69-202111002110","None","3195","None","1","None","None","Mountains","Scout","None","None","https://fort-gotten.com","None","image/png","Fort Gotten Ep02 Kid #3195","ipfs://QmWhS125ua7fV3JNy4mDb5HxeuJxQyd75Yokn67jmiJqxR","ipfs://QmXTstzWgt3vs135V8J63sFVGDJnyBaEmFtFq23Xro8uPJ","image/png","Fort Gotten Ep02 Kid #3195"
`;

const csvReader = new CsvReader();
csvReader.Load(csvData);

const data = csvReader.Read();

console.log("DATA TO VALIDATE", data);