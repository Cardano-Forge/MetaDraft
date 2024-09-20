# Output from errors and warnings

The validation process produces output the following formats.
You can find more examples in the `__tests__/` directory.

Each validator's output is sorted into either the `warnings` or `errors` array within the asset object.

The top-level status is an `error` if any test returns an error.
Otherwise, it can be a `warning` or `success` using the same logic as the `error`.

**State Output Type**:

```json
{
  <asset_name>: {
    status: "success" | "warning" | "error" ,
    warnings: [
      {
        validatorId: <string>,
        validationError: ZodError;
      },
    ],
    errors: [
      {
        validatorId: <string>,
        validationError: ZodError;
      },
    ],
  }
}
```

**State Output Example**:

```json
{
  assetNameXYZ: {
    status: "warning",
    warnings: [
      {
        validatorId: "key-lower-case",
        validationError: {
          issues: [
            {
              code: "custom",
              message: "Some keys do not adhere to Lower Case formatting.",
              path: [
                "media",
                "Website",
              ]
            },
             {
              code: "custom",
              message: "Some keys do not adhere to Lower Case formatting.",
              path: [
                "mediaType",
              ]
            },
            "..."
          ]
        }
      },
      {
        validatorId: "key-title-case",
        validationErorr: {...}
      }
    ],
    errors: [],
  }
}
```
