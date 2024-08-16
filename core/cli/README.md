# CLI

```bash
deno task start validate -m __tests__/cetardio.json -t __tests__/template.txt
```

Using **built binary**:
```bash
./build/metadraft validate -m __tests__/cetardio.json -t __tests__/template.txt
```

**Metadata Format**:

```json
[
  {
    "asset_name": {
      "foo": "bar" // You can put your metadata as usual, checkt the __tests__ directory to get some examples
    }
  }
]
```

**Template Format**, See here: `./__tests__/template.txt`
