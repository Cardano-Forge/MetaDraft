# Output from errors and warnings

Currently there is 3 formats:

To get more examples take a look in the `__tests__/` directory.

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
}
```

**Message as an object for details**:
*The warnings object structure can change depending on the context of the rule*

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
}
```
