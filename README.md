# TutorsGo Static Database (`tutorsgo-db`)

Precision static data layer for **TutorsGo** — verified local tutor directory across Nagaland.

## Endpoints

- **Live Database**: `https://<username>.github.io/tutorsgo-db/tutors.json`
- **Schema Spec**: `https://<username>.github.io/tutorsgo-db/schema.json`

## Schema Structure

Each tutor profile object adheres to the following specification:

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Unique tutor identifier (e.g. `TG-2026-001`) |
| `name` | String | Public display name or initial |
| `district` | String | District in Nagaland (e.g. `Dimapur`, `Kohima`) |
| `area` | String | Colony / Ward / Neighborhood |
| `subjects` | Array[String] | Subjects taught (e.g. `["Mathematics", "Physics"]`) |
| `monthly_fee` | Integer | Monthly tuition fee in ₹ (INR) |
| `phone` | String | WhatsApp-enabled number without leading + |
| `maps_url` | String | Direct Google Maps location link |
| `bio` | String | Brief qualifications & pedagogy overview |
| `verified` | Boolean | True if profile passed verification |

## Validation

To validate locally before committing:
```bash
node validate.js
```
