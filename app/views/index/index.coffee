checkRequired = (config, input) ->
  if config['required'] and input is "" or !input? then return false
  return true

Model = (model) -> 
  m = dermis.model model
  console.log model
  m.extend 
    validate: (input, next) ->
      for prop, config of model
        if typeof(config) is "object"
          next null, checkRequired config, input[prop]
        else if typeof(config) is "function"
          console.log "type"

Collection = (name, model) ->
  dermis.collection
    all: -> @get 'items'
    add: (obj) -> @push model.create obj
    formCreate: (formSubmit) -> 
      m = {}
      errors = {}
      $("##{name}Form").children().each ->
        if $(@).is("input") and !(@type is "submit")            
          #m[@id] = @value
          model.validate @id, @value, (err) ->
            if err?
              errors[@id] = err
            else
              m[@id] = @value
              @value = ''    
      if !errors? then @add m   
      else 
        console.log "required field bruh"

Todo = Model
  title:
    type: String
    required: true
  completed:
    type: Boolean
    default: false

Todos = Collection "Todo", Todo

define ["templates/index"], (ui) ->

#index:
#  uses:
#    ui:    'index.jade'
#    Todos: 'Todo.collection'
  show: ->
#     @render( ui    ).to("#main")
#     @bind(Todos ).to("#main")
#    @render ui,    "#main", ui
#    @bind   Todos, "#main", Todos

    $("#main").html ui()
    Todos.bind $("#main")

