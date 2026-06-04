# Loopet — Style & Feature Reference
> Structured component layouts, crisp interactivity, and localized MVP pet filtering.

**Theme:** Light (Mantine-inspired structural clarity)

Studio Loop leverages a highly functional, component-driven visual framework inspired by Mantine UI. Built on a clean, off-white canvas, the system utilizes a high-contrast obsidian base punctuated by a vibrant flame brand color and structural jade accents. This system balances modular web architecture with an energetic, modern identity.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Studio Canvas | `#FBF9F8` | `--color-studio-canvas` | Primary page background, base light canvas |
| Solid White | `#FFFFFF` | `--color-white` | Card backgrounds, elevated components, button text |
| Obsidian Ink | `#090C02` | `--color-obsidian-ink` | Primary text, heavy headings, structural dark borders |
| Brand Flame | `#F6511D` | `--color-brand-flame` | Primary interactive elements, main CTA backgrounds, active focus states |
| Accent Jade | `#23967F` | `--color-accent-jade` | Secondary accents, indicators, categorical badges, alternate CTAs |
| Light Flame | `#FFF0EB` | `--color-light-flame` | Subtle brand backgrounds, soft hover states, light callout boxes |
| Light Jade | `#E9F5F2` | `--color-light-jade` | Subtle accent containers, tag backgrounds, positive action alerts |
| Muted Boundary | `#E2DDD9` | `--color-muted-boundary` | Standard component borders, disabled elements, subtle dividers |

## Tokens — Typography

### Lexend Deca — Primary UI & Display Typeface · `--font-lexend-deca`
- **Substitute:** Inter, Open Sans
- **Weights:** 300, 400, 500, 700
- **Sizes:** 14px, 16px, 18px, 22px, 30px, 48px, 64px
- **Letter spacing:** -0.01em (headings), normal (body)
- **Role:** Handles all typographic hierarchies from large display statements to dense UI tables and navigation menus.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| text-xs | 14px | 1.45 | normal | `--text-xs` |
| text-sm | 16px | 1.50 | normal | `--text-sm` |
| text-md | 18px | 1.50 | normal | `--text-md` |
| text-lg | 22px | 1.35 | -0.01em | `--text-lg` |
| heading-sm | 30px | 1.25 | -0.01em | `--text-heading-sm` |
| heading-lg | 48px | 1.15 | -0.02em | `--text-heading-lg` |
| display | 64px | 1.10 | -0.02em | `--text-display` |

## Tokens — Spacing & Shapes

**Base scale unit:** 4px (Following Mantine-style logical sizing increments)

### Spacing Scale

| Name | Value | Token | Mantine Match |
|------|-------|-------|---------------|
| xs | 8px | `--spacing-xs` | Extra Small |
| sm | 16px | `--spacing-sm` | Small |
| md | 24px | `--spacing-md` | Medium |
| lg | 32px | `--spacing-lg` | Large |
| xl | 48px | `--spacing-xl` | Extra Large |
| xxl | 80px | `--spacing-xxl` | Structural Break |

### Border Radius

| Element | Value | Token |
|---------|-------|-------|
| Inputs & Badges | 6px | `--radius-sm` |
| Buttons & Nav Links | 8px | `--radius-md` |
| Cards & Containers | 12px | `--radius-lg` |
| Section Enclosures | 20px | `--radius-xl` |

### Layout Framework
- **Container Max-Width:** 1280px
- **Grid Column Gap:** 24px (`--spacing-md`)
- **Vertical Section Gap:** 48px (`--spacing-xl`)

---

## MVP Filter System Structure
Derived from `adopteereendier.be`, mapped to a crisp, component-based layout.

### 1. Global View Toggles (Mantine SegmentedControl)
- **View Pets:** Filters tailored to finding animals.
- **View Shelters:** Changes view to shelter directory (filterable by location and current inventory).

### 2. Core MVP Pet Filters (Cats & Dogs Only)
- **Animal Type:** `[ All, Dogs, Cats ]` (Default behavior targets your core MVP scope).
- **Location / Province:** Dropdown `[ Antwerp, East Flanders, Flemish Brabant, Limburg, West Flanders, Outside Belgium ]`.
- **Gender:** `[ Male, Female ]`.
- **Age Category:** `[ Kitten/Puppy, Young, Adult, Senior ]`.
- **Sterilized:** `[ Yes, No, Doesn't Matter ]`.

### 3. Dynamic Sub-Filters (Conditionally visible based on Animal Type selection)

#### Dog Specific (`/honden`)
- **Size / Formaat:** `[ Extra Small (<5kg), Small (5-10kg), Medium (10-20kg), Large (20-35kg), Extra Large (>35kg) ]`.
- **Behavioral Flags (Checkboxes):** - Can cohabitate with other dogs
  - Can cohabitate with cats
  - Safe around small children (<6 years)
  - Safe around older children (6-14 years)
- **Living Constraints:** - Requires access to a garden `[ Yes, No, Doesn't Matter ]`
  - House-trained (Zindelijk) `[ Checkbox ]`
  - Can stay home alone `[ Checkbox ]`

#### Cat Specific (`/katten`)
- **Coat / Cat Type:** `[ Domestic Shorthair, Domestic Longhair, Purebred ]`.
- **Social Environment (Checkboxes):**
  - Requires a companion (Duo-adoptie)
  - Needs outdoor access (Can go outside)
  - Safe with children

### 4. Shelter-Specific Filter & Search System (`/dierenasielen`)
- **Shelter Name Search:** Free text input with active lookup auto-suggest.
- **Shelter Province:** Dropdown to query shelters located inside a single province.
- **Current Supply (Huidig Aanbod):** Checkbox options `[ Has Dogs Available, Has Cats Available ]`.

---

## Components

### Filter Accordion/Sidebar Container
Background `#FFFFFF`, border 1px solid `#E2DDD9`, border-radius 12px, padding 24px. Dropdowns use Mantine `Select` component rules with clear chevron actions.

### Filter Tag / Active Badge
**Role:** Displays applied query options that can be cleared with an "X".
Background `#FFF0EB` (Light Flame), text color `#F6511D`, font-weight 500, size 14px, border-radius 6px. 

### Filled Primary Button
**Role:** Apply Filters / Search Action
Background `#F6511D`, text color `#FFFFFF`, font-weight 600, border-radius 8px. Padding: 12px 24px.

### Outline Secondary Button
**Role:** Reset Filters
Background transparent, border 1.5px solid `#23967F`, text color `#23967F`, font-weight 600, border-radius 8px. Padding: 12px 24px.

---

## Do's and Don'ts

### Do
- Ensure dynamic sub-filters transition smoothly into view using Mantine's clean collapsible layout rules when a user switches between "Cats" and "Dogs".
- Use **Lexend Deca** for filter group labels (e.g., "Gedrag t.o.v. andere dieren") to maintain consistency.
- Always display the count of matching items inside a badge next to the filter results head.

### Don't
- Do not mix the pet properties; keep dog-specific filters hidden when browsing cats, maintaining a minimal user canvas.
- Do not make the filter section overly dense; utilize standard comfortable whitespace padding gaps (`--spacing-sm` and `--spacing-md`).

---

## Agent Prompt Guide

### Sample Filter Generation Prompt
1. *Build a responsive layout grid with an adaptive filtering sidebar on the left and a pet results display layout on the right*: The filter sidebar background is Solid White (`#FFFFFF`) with a clean `#E2DDD9` border layout. It includes an Animal Type selector widget utilizing a SegmentedControl interface, followed by standard dropdown menus for Province selection. If 'Dogs' is selected, slide open a secondary section containing checkbox controls for Size configurations and behavioral conditions (e.g., 'Can live with cats').

---

## System Implementations

### CSS Variables
```css
:root {
  /* Colors */
  --color-studio-canvas: #FBF9F8;
  --color-white: #FFFFFF;
  --color-obsidian-ink: #090C02;
  --color-brand-flame: #F6511D;
  --color-accent-jade: #23967F;
  --color-light-flame: #FFF0EB;
  --color-light-jade: #E9F5F2;
  --color-muted-boundary: #E2DDD9;

  /* Typography */
  --font-lexend-deca: 'Lexend Deca', system-ui, -apple-system, sans-serif;

  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;

  /* Shapes */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
}# Studio Loop — Style & Feature Reference
> Structured component layouts, crisp interactivity, and localized MVP pet filtering.

**Theme:** Light (Mantine-inspired structural clarity)

Studio Loop leverages a highly functional, component-driven visual framework inspired by Mantine UI. Built on a clean, off-white canvas, the system utilizes a high-contrast obsidian base punctuated by a vibrant flame brand color and structural jade accents. This system balances modular web architecture with an energetic, modern identity.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Studio Canvas | `#FBF9F8` | `--color-studio-canvas` | Primary page background, base light canvas |
| Solid White | `#FFFFFF` | `--color-white` | Card backgrounds, elevated components, button text |
| Obsidian Ink | `#090C02` | `--color-obsidian-ink` | Primary text, heavy headings, structural dark borders |
| Brand Flame | `#F6511D` | `--color-brand-flame` | Primary interactive elements, main CTA backgrounds, active focus states |
| Accent Jade | `#23967F` | `--color-accent-jade` | Secondary accents, indicators, categorical badges, alternate CTAs |
| Light Flame | `#FFF0EB` | `--color-light-flame` | Subtle brand backgrounds, soft hover states, light callout boxes |
| Light Jade | `#E9F5F2` | `--color-light-jade` | Subtle accent containers, tag backgrounds, positive action alerts |
| Muted Boundary | `#E2DDD9` | `--color-muted-boundary` | Standard component borders, disabled elements, subtle dividers |

## Tokens — Typography

### Lexend Deca — Primary UI & Display Typeface · `--font-lexend-deca`
- **Substitute:** Inter, Open Sans
- **Weights:** 300, 400, 500, 700
- **Sizes:** 14px, 16px, 18px, 22px, 30px, 48px, 64px
- **Letter spacing:** -0.01em (headings), normal (body)
- **Role:** Handles all typographic hierarchies from large display statements to dense UI tables and navigation menus.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| text-xs | 14px | 1.45 | normal | `--text-xs` |
| text-sm | 16px | 1.50 | normal | `--text-sm` |
| text-md | 18px | 1.50 | normal | `--text-md` |
| text-lg | 22px | 1.35 | -0.01em | `--text-lg` |
| heading-sm | 30px | 1.25 | -0.01em | `--text-heading-sm` |
| heading-lg | 48px | 1.15 | -0.02em | `--text-heading-lg` |
| display | 64px | 1.10 | -0.02em | `--text-display` |

## Tokens — Spacing & Shapes

**Base scale unit:** 4px (Following Mantine-style logical sizing increments)

### Spacing Scale

| Name | Value | Token | Mantine Match |
|------|-------|-------|---------------|
| xs | 8px | `--spacing-xs` | Extra Small |
| sm | 16px | `--spacing-sm` | Small |
| md | 24px | `--spacing-md` | Medium |
| lg | 32px | `--spacing-lg` | Large |
| xl | 48px | `--spacing-xl` | Extra Large |
| xxl | 80px | `--spacing-xxl` | Structural Break |

### Border Radius

| Element | Value | Token |
|---------|-------|-------|
| Inputs & Badges | 6px | `--radius-sm` |
| Buttons & Nav Links | 8px | `--radius-md` |
| Cards & Containers | 12px | `--radius-lg` |
| Section Enclosures | 20px | `--radius-xl` |

### Layout Framework
- **Container Max-Width:** 1280px
- **Grid Column Gap:** 24px (`--spacing-md`)
- **Vertical Section Gap:** 48px (`--spacing-xl`)

---

## MVP Filter System Structure
Derived from `adopteereendier.be`, mapped to a crisp, component-based layout.

### 1. Global View Toggles (Mantine SegmentedControl)
- **View Pets:** Filters tailored to finding animals.
- **View Shelters:** Changes view to shelter directory (filterable by location and current inventory).

### 2. Core MVP Pet Filters (Cats & Dogs Only)
- **Animal Type:** `[ All, Dogs, Cats ]` (Default behavior targets your core MVP scope).
- **Location / Province:** Dropdown `[ Antwerp, East Flanders, Flemish Brabant, Limburg, West Flanders, Outside Belgium ]`.
- **Gender:** `[ Male, Female ]`.
- **Age Category:** `[ Kitten/Puppy, Young, Adult, Senior ]`.
- **Sterilized:** `[ Yes, No, Doesn't Matter ]`.

### 3. Dynamic Sub-Filters (Conditionally visible based on Animal Type selection)

#### Dog Specific (`/honden`)
- **Size / Formaat:** `[ Extra Small (<5kg), Small (5-10kg), Medium (10-20kg), Large (20-35kg), Extra Large (>35kg) ]`.
- **Behavioral Flags (Checkboxes):** - Can cohabitate with other dogs
  - Can cohabitate with cats
  - Safe around small children (<6 years)
  - Safe around older children (6-14 years)
- **Living Constraints:** - Requires access to a garden `[ Yes, No, Doesn't Matter ]`
  - House-trained (Zindelijk) `[ Checkbox ]`
  - Can stay home alone `[ Checkbox ]`

#### Cat Specific (`/katten`)
- **Coat / Cat Type:** `[ Domestic Shorthair, Domestic Longhair, Purebred ]`.
- **Social Environment (Checkboxes):**
  - Requires a companion (Duo-adoptie)
  - Needs outdoor access (Can go outside)
  - Safe with children

### 4. Shelter-Specific Filter & Search System (`/dierenasielen`)
- **Shelter Name Search:** Free text input with active lookup auto-suggest.
- **Shelter Province:** Dropdown to query shelters located inside a single province.
- **Current Supply (Huidig Aanbod):** Checkbox options `[ Has Dogs Available, Has Cats Available ]`.

---

## Components

### Filter Accordion/Sidebar Container
Background `#FFFFFF`, border 1px solid `#E2DDD9`, border-radius 12px, padding 24px. Dropdowns use Mantine `Select` component rules with clear chevron actions.

### Filter Tag / Active Badge
**Role:** Displays applied query options that can be cleared with an "X".
Background `#FFF0EB` (Light Flame), text color `#F6511D`, font-weight 500, size 14px, border-radius 6px. 

### Filled Primary Button
**Role:** Apply Filters / Search Action
Background `#F6511D`, text color `#FFFFFF`, font-weight 600, border-radius 8px. Padding: 12px 24px.

### Outline Secondary Button
**Role:** Reset Filters
Background transparent, border 1.5px solid `#23967F`, text color `#23967F`, font-weight 600, border-radius 8px. Padding: 12px 24px.

---

## Do's and Don'ts

### Do
- Ensure dynamic sub-filters transition smoothly into view using Mantine's clean collapsible layout rules when a user switches between "Cats" and "Dogs".
- Use **Lexend Deca** for filter group labels (e.g., "Gedrag t.o.v. andere dieren") to maintain consistency.
- Always display the count of matching items inside a badge next to the filter results head.

### Don't
- Do not mix the pet properties; keep dog-specific filters hidden when browsing cats, maintaining a minimal user canvas.
- Do not make the filter section overly dense; utilize standard comfortable whitespace padding gaps (`--spacing-sm` and `--spacing-md`).

---

## Agent Prompt Guide

### Sample Filter Generation Prompt
1. *Build a responsive layout grid with an adaptive filtering sidebar on the left and a pet results display layout on the right*: The filter sidebar background is Solid White (`#FFFFFF`) with a clean `#E2DDD9` border layout. It includes an Animal Type selector widget utilizing a SegmentedControl interface, followed by standard dropdown menus for Province selection. If 'Dogs' is selected, slide open a secondary section containing checkbox controls for Size configurations and behavioral conditions (e.g., 'Can live with cats').

---

## System Implementations

### CSS Variables
```css
:root {
  /* Colors */
  --color-studio-canvas: #FBF9F8;
  --color-white: #FFFFFF;
  --color-obsidian-ink: #090C02;
  --color-brand-flame: #F6511D;
  --color-accent-jade: #23967F;
  --color-light-flame: #FFF0EB;
  --color-light-jade: #E9F5F2;
  --color-muted-boundary: #E2DDD9;

  /* Typography */
  --font-lexend-deca: 'Lexend Deca', system-ui, -apple-system, sans-serif;

  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;

  /* Shapes */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
}