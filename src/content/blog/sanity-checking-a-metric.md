---
title: 'Sanity-checking a metric before you share it'
description: 'A short checklist I run before a number goes into a report or a slide.'
pubDate: '2026-11-01'
tags: ['data', 'analytics']
---

A number in a slide carries more authority than it deserves. Before I share one, I run
through a quick checklist.

## The checklist

| Check            | Question to ask                                          |
| ---------------- | -------------------------------------------------------- |
| **Definition**   | Does everyone mean the same thing by this metric?        |
| **Grain**        | Is it per user, per order, or per day?                   |
| **Filters**      | What's excluded: test accounts, refunds, cancelled rows? |
| **Time window**  | Which timezone, and is the last day complete?            |
| **Ties out**     | Does it roughly match a known source of truth?           |

## A quick SQL check

When a total looks off, I compare the row count against distinct keys first:

```sql
select
  count(*)                 as row_count,
  count(distinct order_id) as distinct_orders
from analytics.orders
where order_date >= date '2026-10-01';
```

If those two differ, there's a join fan-out somewhere and the total is probably inflated.

> Most "wrong numbers" aren't wrong maths. They're a different definition.
