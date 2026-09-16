# GraphLinear — AI Coding Instructions

## What is GraphLinear?

GraphLinear is a visual project-management platform designed
specifically for creative teams.

Core idea:

"Complex relationships underneath.
Extremely simple understanding on top."

GraphLinear helps a team understand:

- What is done?
- What is currently being worked on?
- What is waiting?
- What is blocked?
- What is causing the blockage?
- What should happen next?

Example creative workflow:

Brand Identity
      ↓
Script
      ↓
Shoot
      ↓
Video Edit
      ↓
Final Delivery

If Shoot is delayed, GraphLinear should make it obvious that
Video Edit and Final Delivery are affected.

GraphLinear is NOT just a basic to-do list.

---

## Target Users

Small creative teams such as:

- Video production teams
- Branding agencies
- Design studios
- Creative agencies

The initial team model is a small 3-person creative studio.

---

## Core Product

The central data model is an Issue.

An Issue represents a piece of work and contains:

- id
- title
- description
- status
- priority
- assignee
- projectId
- dependencies

---

## Core Workflow

CREATE PROJECT
    ↓
CREATE ISSUES
    ↓
CONNECT ISSUES
    ↓
MOVE ISSUES THROUGH WORKFLOW
    ↓
VISUALIZE DEPENDENCIES
    ↓
IDENTIFY BLOCKERS

---

## Architecture

GraphLinear should have ONE source of truth for issue data.

The same issue state powers:

- Issues view
- Kanban view
- Graph view
- Timeline view

Do NOT create separate issue state for each view.

Current client state:

Zustand

Persistent backend:

Supabase

Current development stage:

Mock data → Zustand

Later:

Supabase → Zustand → UI

---

## Current Project Structure

The project uses Next.js App Router.

IMPORTANT:
The project uses `app/` directly.

There is NO `src/app/`.

Main directories:

app/
components/
features/
lib/
store/
types/

---

## State Management

Zustand is used for shared client-side issue state.

`types/issue.ts`
defines the Issue data structure.

`lib/mockIssues.ts`
contains temporary development data.

`store/issueStore.ts`
contains the shared issue state and issue actions.

Pages/components should consume issue data from Zustand
rather than importing mockIssues directly.

---

## Current Issue Store

The store currently contains:

- issues
- addIssue()

The store should eventually contain actions for things such as:

- addIssue
- updateIssue
- deleteIssue
- updateIssueStatus
- addDependency
- removeDependency

Only introduce actions when they are actually needed.

---

## Product Principles

1. Simplicity over technical complexity.

2. Hide DAG/graph complexity from normal users.

3. A non-technical creative user should understand
   the state of a project within seconds.

4. Avoid unnecessary features.

5. Avoid duplicate sources of truth.

6. Prefer small, understandable components.

7. Don't introduce new libraries unless necessary.

8. Don't rewrite unrelated parts of the application.

---

## Development Rules

Before implementing a feature:

1. Inspect the existing code.
2. Understand the current architecture.
3. Identify which files actually need modification.
4. Explain the implementation plan.
5. Make the smallest reasonable change.
6. Do not modify unrelated files.

When implementing:

- Reuse existing types.
- Reuse existing Zustand state.
- Reuse existing components where appropriate.
- Keep TypeScript strict and readable.
- Don't duplicate issue state.
- Don't add Supabase unless specifically requested.
- Don't invent new architecture without explaining why.

---

## Important

GraphLinear is being built as a portfolio-quality project.

Prioritize:

- Correct architecture
- Understandable code
- Clean UI
- Real data flow
- Maintainability

Do not optimize for maximum feature count.

Optimize for a coherent vertical slice.



---


# Immediate Task

## FEATURE
Edit the Kanban/page.tsx which displays the Kanban view of the issues which are presented as cards in columns grouped based on issue.status :

1.Todo 
2.In Progress
3.Done


## GOAL

Provide users with a clear visual overview of the current state of all issues by organizing them into status-based columns, so they can quickly understand what work is pending, in progress, and completed.

The Kanban view must represent the same issue data used throughout GraphLinear, with Zustand remaining the single source of truth.

## USER EXPERIENCE

The user should be able to:

1. View all issues as clear, polished cards organized into three status columns:

   * Todo
   * In Progress
   * Done

2. Quickly understand the status and important issue information through visual UI elements such as status indicators and icons, rather than relying only on plain text.

3. Update an issue's status directly from its Kanban card. When the status changes, the issue should immediately move to the corresponding status column.

4. See the issue's existing information on the card, including its title, description, priority, and assignee.


## DATA

The Kanban page must use the same issue data available to the rest of GraphLinear.

Each Kanban issue card requires the following fields:

* `issue.id`
* `issue.title`
* `issue.description`
* `issue.status`
* `issue.priority`
* `issue.assignee`

The Kanban page does not need `projectId` or `dependencies` for V1.


## STATE

The existing Zustand `issueStore` remains the single source of truth for all issue data, including each issue's current `status`.

The Kanban page must read its issues from the existing Zustand `issues` state and must not create a separate copy of the issue data.

Any status update made from the Kanban must update the corresponding issue in Zustand.

Any temporary UI state required for opening/closing the status-edit interaction or tracking the currently selected issue may remain local to the Kanban component and must not replace or duplicate the Zustand issue state.

Do not introduce another global state-management system



## BEHAVIOR

The Kanban page must allow users to edit the `status` field only.

1. An `EditStatusModal.tsx` modal must open when the user selects the status update option on a Kanban issue card.

2. The `EditStatusModal.tsx` must provide three status options:

   * Todo
   * In Progress
   * Done

3. The modal must provide two functional buttons:

   **Update Status**

   * Update the existing issue's `status` to the newly selected status.
   * Keep all other fields of the issue unchanged.
   * Update the issue's status in Zustand.
   * Immediately move the issue's card to the column corresponding to its new status.

   **Cancel**

   * Keep the existing issue's status unchanged in Zustand.
   * Discard any temporary status selection made in the modal.
   * Close the modal.
   * The UI must continue displaying the issue's existing status.

4. Zustand remains the single source of truth. Once a status update is confirmed, all other views using the shared issue data must receive the updated status.


## UI REQUIREMENTS

- Display three clearly separated status columns.
- Each column must have a clear status heading.
- Issue cards must display title, description, priority, and assignee.
- Status should have a visually distinct indicator.
- The layout must remain usable across desktop and smaller screen widths.
- Empty columns must retain their structure and display an appropriate empty state.


## EDGE CASES

* The Kanban layout must remain responsive and usable when a large number of issue cards are present in one or more columns.
* The status selector must allow only one status to be selected at a time.
* If the user selects the issue's existing status, no issue fields should change.
* If the user changes the status and then clicks Cancel, the original status must remain unchanged.
* Empty status columns must remain visible and display an appropriate empty state rather than disappearing.
* If there are no issues, the Kanban must display an appropriate empty state while retaining the three status columns.
* An issue with an unexpected or unsupported status must not silently disappear from the Kanban.


## DATA FLOW

* The existing Zustand `issueStore.issues` state remains the single source of truth for all issue data.
* The Kanban page reads the `issues[]` state from Zustand and derives the three columns — Todo, In Progress, and Done — by grouping issues according to their `issue.status`.
* The required issue data from Zustand is passed to the corresponding Kanban cards for display.
* When a user selects a new status in `EditStatusModal` and confirms the update, the existing issue's `status` is updated in Zustand.
* Once Zustand is updated, the Kanban derives its columns from the updated `issues[]` state, causing the issue card to appear in its new status column. Other views using the same Zustand state also receive the updated status.
* If the user clicks Cancel, the temporary status selection is discarded, the Zustand issue data remains unchanged, and the Kanban continues displaying the existing status.



## CONSTRAINTS

* Reuse the existing `Issue` type. Do not create a separate Kanban-specific issue type.
* Reuse the existing Zustand `issueStore` and its `issues` state.
* Do not create a separate copy of the issue data for the Kanban page.
* Do not add Supabase or any persistence layer as part of this task.
* Do not add another state-management library.
* Do not introduce unnecessary dependencies.
* Do not rewrite or modify unrelated routes or components.
* Preserve the existing Issues page and its Create, Edit, and Delete functionality.



## Acceptance Criteria

1. Every issue in the Kanban view has the option to edit only the status
2. See the issue's existing information on the card, including its title, description, priority, and assignee in every card
3. All Issues are grouped in respective columns based on `issue.status`
4. Updation of status in zustand happens when user clicks Confirm on the `EditStatusModal`
5. Cancel leaves the issue status unchanged and disacard any new selection in the modal.
6. Issue Cards are moving instantly to their respective columns on changing status
7. All stated edge cases are handled as suggested
8. All UX requirements and UI requirements are implemented
9. Zustand remains the single source of truth for all the views including Kanban
10. No unrelated architecture changes.


## AFTER IMPLEMENTATION

Explain:

1. Exactly which files were created, modified, or deleted.
2. What changed in each file and why.
3. How the implemented feature works from user interaction to final UI state.
4. How the relevant state is managed and updated.
5. How data flows between the affected components and Zustand.
6. How the UI rerenders after the relevant state changes.
7. How the implemented edge cases are handled.
8. Any assumptions made during implementation.
9. Any limitations, trade-offs, or technical debt introduced.
10. Any important architectural decisions made.
11. Manual testing checklist covering the acceptance criteria.

Show the important code sections responsible for:
- triggering the feature interaction
- selecting or identifying the relevant issue/data
- updating the relevant state
- passing data/functions between components
- rendering the resulting UI
- handling important edge cases

Do not include unrelated code or files.