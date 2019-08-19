Re-Order Demo
=============

Showing off how I expecting reordering to work.

## Things of interest here

1. OrderBy Updating
    - (`services/list ->  handleOrderChange()`)
    - (`services/list ->  service.addItemToList()`)
    - (`services/list ->  service.editItemInList()`)
2. Sending Order Updates
    - (`src/jsx/App/Index -> onDragEnd` -> `PUT:/api/lists/:id/items/:itemId { orderNo: # }`)
3. react-beautiful-dnd - Atlassians Drag and Drop
4. Styled Components
