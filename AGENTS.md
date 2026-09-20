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

* The Projects page will display the list of projects, with project data managed by the Zustand `projectStore`, which is not created yet.
* The user must be able to create a new project from the Projects page.
* Every project must provide dynamic Issues, Kanban, Timeline, and Graph views determined by the `id` of the selected project.
* Each project will be displayed as a rectangular card that allows the user to select between the available project views through a pop-up modal.
* Each newly created project must follow the existing `Project` type and must be added to the Zustand `projectStore`.
* Every project card must provide an option to delete the project.
* A project must be able to receive newly created issues through its `projectId`, allowing those issues to appear in all relevant project views.

## GOAL

The Projects page displays all existing projects and serves as the place where project context is established for the other views.

It provides an organized place for users to create, view, access, and manage their projects while ensuring that issues and project views remain associated with the correct project.

## USER EXPERIENCE

The user on the Projects page should be able to:

1. View all existing projects as rectangular cards arranged vertically.

2. Create a new project from the Projects page by providing the required project information.

3. After creating a project, see the newly created project appear in the list of project cards without requiring a page refresh.

4. Click a project card that contains issues and view a `ChooseView.tsx` modal that allows the user to choose between:

   * Issues
   * Kanban
   * Timeline
   * Graph

5. Clicking any of the four options in the modal should open the corresponding view for the selected project.

6. See the text `"No issues here"` within the project card when the project does not contain any issues associated with its `id`.

7. When the user clicks a project card with no issues, see a `NoIssueFound.tsx` modal displaying `"No issues present"` with a Cancel button.

8. A project card with no issues must not open `ChooseView.tsx`.

9. Click the Cancel button in `NoIssueFound.tsx` to close the modal.

10. Create issues while working within the context of a selected project. Newly created issues must be associated with that project.

11. See newly created issues appear in the selected project's Issues, Kanban, Timeline, and Graph views where applicable.

12. Every project card must provide a delete option.

13. When the user selects the delete option, a confirmation modal must be displayed with Confirm and Cancel options.

14. View project cards without layout breaks, content overflow, or text misalignment across supported screen sizes.

## DATA

The Projects page will get project data from the Zustand `projectStore`, which is yet to be created.

The `Project` type will be used as the blueprint for project data.

Each project card will use:

1. `project.name` — displayed as the project name on the card.
2. `project.id` — uniquely identifies the project and establishes the project context for its views.
3. The relationship between `project.id` and `issue.projectId` will be used to determine which issues belong to the project.

Newly created projects must use the same `Project` type as the existing mock project data.

Project IDs must be automatically generated as unique IDs in the `GL-XXX` format, for example `GL-102`.

The existing `Issue` type will continue to be used for issues. A newly created issue must contain the `projectId` of the currently selected project so that it belongs to that project.

## STATE

The existing Zustand `issueStore` remains the single source of truth for all issue data.

The new Zustand `projectStore` will be the single source of truth for all project data.

The `projectStore` must provide:

* The project state required by the Projects page.
* An `addProject` action for adding newly created projects.
* A `deleteProject` action for deleting existing projects.

The `issueStore` must continue to provide the issue state and issue actions required by the existing Issues functionality.

The Projects page must not create a separate local copy of the projects or issues.

Project context must be determined by the selected project's `id`. The project ID must be used to scope the Issues, Kanban, Timeline, and Graph views to the selected project.

The project relationship must remain normalized:

```text
Project
  id: "project-1"
       ↓
Issue
  projectId: "project-1"
```

A newly created issue associated with a selected project must update the existing Zustand `issueStore`.

All project-scoped views must derive their issue data from the updated Zustand state.

Deleting a project must also remove all issues whose `issue.projectId` matches the deleted project's `id`.

No additional global state-management system should be introduced.

For the current V1 implementation, project data is persisted in Zustand. Supabase persistence will be added later and is outside the scope of this task.

## BEHAVIOR

### Project Creation

1. The Create Project button must open a project creation modal.

2. The modal must allow the user to enter the project name.

3. The project `id` must be automatically generated by the system as a unique ID in the `GL-XXX` format, for example `GL-102`. The user must not manually enter the ID.

4. The system must prevent creation when the project creation limit of 3 projects within 3 minutes has been reached.

5. Clicking Create must:

   * Validate the project name.
   * Generate a unique project ID.
   * Create a new project using the existing `Project` type.
   * Add the new project to the Zustand `projectStore`.
   * Display the newly created project card without requiring a page refresh.
   * Close the creation modal after successful creation.

6. The Discard button must:

   * Close the creation modal.
   * Discard the temporary project name.
   * Make no changes to `projectStore` or `issueStore`.

### Project Display and Selection

7. All existing and newly created projects must be displayed as project cards.

8. Each project card must display the project's name.

9. When a project contains one or more issues, clicking its card must open `ChooseView.tsx`.

10. `ChooseView.tsx` must provide four view options:

* Issues
* Kanban
* Timeline
* Graph

11. Selecting a view must open that view using the selected project's ID as its project context.

12. When a project contains no issues, its card must display `"No issues here"`.

13. Clicking a project card with no issues must open `NoIssueFound.tsx` instead of `ChooseView.tsx`.

14. `NoIssueFound.tsx` must display `"No issues present"` and provide a Cancel button.

15. Clicking Cancel must close the modal without modifying project or issue state.

### Issue Creation

16. When creating an issue within a selected project, the newly created issue must receive the selected project's `id` as its `projectId`.

17. The newly created issue must be added to the existing Zustand `issueStore`.

18. Once an issue is added to a project, that project must no longer be treated as an empty project.

19. The newly created issue must become available to the project's relevant views through the shared Zustand issue state.

### Project Deletion

20. Clicking the Delete option on a project card must open a confirmation modal.

21. The confirmation modal must provide Confirm and Cancel options.

22. Clicking Cancel must:

* Close the confirmation modal.
* Leave the selected project unchanged.
* Make no changes to `projectStore` or `issueStore`.

23. Clicking Confirm must:

* Delete the selected project from the Zustand `projectStore`.
* Delete all issues associated with that project's `projectId` from the Zustand `issueStore`.
* Update the Projects page immediately without requiring a page refresh.
* Ensure that deleted project issues no longer appear in any project view.

## EDGE CASES

* The project name must not be blank or consist only of whitespace.
* Clicking Discard after entering a project name must close the modal and must not modify `projectStore` or `issueStore`.
* Generated project IDs must be unique among existing projects.
* The system must not create a project when the 3-projects-within-3-minutes limit has been reached.
* When the creation limit is reached, the Create Project action must be unavailable or prevented and the user should receive an appropriate indication that the limit has been reached.
* If there are no projects currently, display `"No current projects"` with a Create Project button below it.
* Deleting a project must delete all issues associated with that project's `projectId`.
* Deleting one project must not delete or modify issues belonging to other projects.
* Cancelling project deletion must leave both project and issue data unchanged.
* When a project has no issues, clicking its card must not open `ChooseView.tsx`.
* When a project has no issues, the Issues, Kanban, Timeline, and Graph views must display `"No issues present"` when accessed for that project.
* Project cards must remain usable across supported screen sizes without layout breaks, content overflow, or text misalignment.
* Newly created issues must always contain a valid `projectId` corresponding to the selected project.
* A project ID must not be reused for another existing project.
* The Projects page must not silently lose projects or issues when project or issue state changes.
* If project data and issue data become inconsistent, issues referencing a nonexistent project must not be incorrectly displayed as belonging to another project.

## CONSTRAINTS

* Reuse the existing `Project` type.
* Reuse the existing `Issue` type.
* Reuse the existing Zustand `issueStore`.
* Create and use a dedicated Zustand `projectStore` for project state.
* Do not add an `issues` array to the `Project` type; maintain the normalized relationship through `issue.projectId`.
* Do not introduce another state-management library.
* Do not add Supabase or another persistence layer as part of this task.
* Do not modify unrelated routes or components.
* Preserve existing Issues functionality.
* Project deletion must cascade to issues belonging to the deleted project.
* Project creation must use the existing `Project` type and the same project data model as `mockProjects.ts`.
* Avoid unnecessary dependencies.

## DATA FLOW

```text
Projects Page
      ↓
projectStore.projects
      ↓
User selects Project
      ↓
project.id establishes project context
      ↓
Project-scoped view
      ↓
Filter issueStore.issues by issue.projectId
      ↓
Display only issues belonging to selected project
```

For project creation:

```text
User enters project name
      ↓
Create
      ↓
Generate unique GL-XXX project ID
      ↓
Create Project object
      ↓
projectStore.addProject()
      ↓
projectStore.projects updates
      ↓
Projects page rerenders
      ↓
New project card appears
```

For issue creation:

```text
Selected project
      ↓
selected project.id
      ↓
Create Issue
      ↓
issue.projectId = selected project.id
      ↓
issueStore.addIssue()
      ↓
project-scoped issue data updates
      ↓
Relevant project views rerender
```

For project deletion:

```text
Delete Project
      ↓
Confirmation
      ↓
Confirm
      ↓
projectStore.deleteProject(project.id)
      +
issueStore removes issues where
issue.projectId === project.id
      ↓
Projects page and project data update
```

For project selection:

```text
Click Project Card
       ↓
Does project have issues?
      /        \
    YES         NO
     ↓           ↓
ChooseView   NoIssueFound
     ↓           ↓
Select view    Cancel
     ↓
project-specific route
```

## ACCEPTANCE CRITERIA

1. All existing projects are displayed on the Projects page.
2. A user can create a new project by entering a valid project name.
3. Newly created projects receive a unique autogenerated `GL-XXX` ID.
4. Newly created projects appear immediately without a page refresh.
5. Newly created projects are stored in `projectStore`.
6. The project creation modal can be cancelled without modifying Zustand state.
7. Project cards display the project name.
8. Projects containing issues open `ChooseView.tsx` when selected.
9. `ChooseView.tsx` provides Issues, Kanban, Timeline, and Graph options.
10. Selecting a view opens that view for the selected project.
11. Projects without issues display `"No issues here"` on their cards.
12. Selecting a project without issues opens `NoIssueFound.tsx` instead of `ChooseView.tsx`.
13. `NoIssueFound.tsx` displays `"No issues present"` and can be closed using Cancel.
14. A newly created issue receives the selected project's `id` as `projectId`.
15. A newly created issue appears in the selected project's relevant views.
16. Every project card provides a delete option.
17. Selecting Delete opens a confirmation modal.
18. Cancelling deletion leaves project and issue state unchanged.
19. Confirming deletion removes the project from `projectStore`.
20. Confirming deletion removes all issues belonging to that project.
21. Deleting one project does not affect another project's issues.
22. When no projects exist, `"No current projects"` and a Create Project button are displayed.
23. The user cannot create more than 3 projects within a 3-minute window.
24. When a project has no issues, its Issues, Kanban, Timeline, and Graph views display `"No issues present"` when accessed.
25. Project cards remain responsive without layout breaks, text overflow, or misalignment.
26. Existing Issues functionality remains intact.
27. Project and issue state remain normalized through `project.id` and `issue.projectId`.


## UI REQUIREMENTS

- All project cards should be stacked vertically, one after another.
- Project cards should have a polished, glossy visual appearance consistent with GraphLinear's existing visual style.
- Project cards should have clear spacing between them and remain visually distinct from one another.
- Each project card should clearly display the project name.
- Empty projects should display `"No issues here"` within the project card.
- Each project card should provide a clearly accessible delete action.
- The Create Project action should be clearly visible on the Projects page.
- When no projects exist, display `"No current projects"` with the Create Project button below it.

### Create Project Modal

- The modal should follow the existing GraphLinear modal design language.
- Provide a clear project name input.
- Provide Create and Cancel/Discard actions.
- Validation feedback should be clearly visible when the project name is invalid.
- When the project creation limit is reached, the UI should clearly communicate that another project cannot currently be created.

### ChooseView.tsx

- The modal UI should remain visually consistent with the existing GraphLinear modals.
- Display the four available project views clearly:
  - Issues
  - Kanban
  - Timeline
  - Graph
- Each option should be clearly identifiable as an interactive selection.
- The modal should provide an appropriate way to close/cancel without selecting a view.

### NoIssueFound.tsx

- The modal should follow the existing GraphLinear modal design language.
- Display `"No issues present"`.
- Provide a Cancel button.
- The modal should clearly communicate that the selected project currently has no issues.

### Delete Confirmation Modal

- The confirmation modal should follow the existing GraphLinear modal design language.
- Clearly communicate that deleting the project will also remove its associated issues.
- Provide Confirm and Cancel actions.
- The destructive action should be visually distinguishable from the Cancel action.

### Responsive UI

- Project cards should remain properly aligned and readable on smaller screen sizes.
- Text should not overflow or become visually misaligned.
- Modal content and actions should remain accessible on smaller screens.


## CONSTRAINTS

* Reuse the existing `Issue` and `Project` type. Do not create a separate Kanban-specific issue type.
* Reuse the existing Zustand `issueStore` and its `issues` state.
* Do not create a separate copy of the issue data for the Kanban page.
* Do not add Supabase or any persistence layer as part of this task.
* Do not add another state-management library.
* Do not introduce unnecessary dependencies.
* Do not rewrite or modify unrelated routes or components.
* Preserve the existing Issues page and its Create, Edit, and Delete functionality.


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