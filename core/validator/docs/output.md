# Output from errors and warnings

Currently there is 3 formats:

The validation process produces output in one of the following formats.
You can find more examples in the `__tests__/` directory.

Each validator's output is sorted into either the `warnings` or `errors` array within the asset object.

The top-level status is an `error` if any test returns an error.
Otherwise, it can be a `warning` or `success` using the same logic as the `error`.

**Message only**:

```json
assetNameXYZ: {
  status: "warning",
  warnings: [
    {
      validatorId: "...",
      message: "...",
    },
  ],
  errors: [
    {
      validatorId: "...",
      message: "...",
    },
  ],
}
```

**Message as an object for details**:
*(the structure may vary depending on the context of the rule)*

```json
assetNameXYZ: {
  status: "warning",
  warnings: [
    {
      validatorId: "...",
      message: {
        message:
          "...",
        warnings: [
          {
            field: "...",
            paths: [
              "...",
              "...",

            ],
            occurences: 5,
          },
        ],
      },
    },
  ],
  errors: []
}
```

**Zod Error**:

```json
assetNameXYZ: {
  status: "warning",
  warnings: [
    {
      validatorId: "...",
      message: {
        formErrors: [],
        fieldErrors: {
          attributes: [
            {
              message: "...",
              errorCode: "custom",
              status: "warning",
              path: "...",
            },
          ],
        },
      },
    },
    {
      validatorId: "...",
      message: {
        formErrors: [],
        fieldErrors: {
          traits: [
            {
              message:
                "...",
              errorCode: "custom",
              status: "warning",
              path: "...",
            },
            {
              message: "...",
              errorCode: "custom",
              status: "warning",
              path: "...",
            },
          ],
        },
      },
    },
  ],
  errors: []
}
```
