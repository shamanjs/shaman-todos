name: "todos"
goal: "keep track of todos"
models: 
  Todo:
    title: 
      type: String
      required: true
    done: Boolean
store: 'local'
views:
  index:
    route: '/'
    crud: 'Todo'