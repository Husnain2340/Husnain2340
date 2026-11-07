---
title: 'Five small Python habits that pay off'
description: 'Tiny patterns I reach for every day: f-strings, pathlib, dataclasses and more.'
pubDate: '2026-11-05'
tags: ['tech', 'python']
---

None of these are new, but together they make everyday Python noticeably cleaner.

## 1. Use `pathlib` instead of string paths

```python
from pathlib import Path

reports = Path("data") / "reports"
for csv in reports.glob("*.csv"):
    print(csv.stem, csv.stat().st_size)
```

## 2. Reach for `dataclasses` for plain records

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Order:
    id: int
    amount: float
    currency: str = "GBP"
```

## 3. f-strings with `=` for quick debugging

```python
total = 42
print(f"{total=}")  # total=42
```

## 4. `enumerate` and `zip` over index juggling

```python
for i, (name, score) in enumerate(zip(names, scores), start=1):
    print(f"{i}. {name}: {score}")
```

## 5. Let `collections.Counter` do the counting

```python
from collections import Counter

Counter("mississippi").most_common(2)  # [('i', 4), ('s', 4)]
```

Hover any code block and hit **Copy** to grab the snippet.
