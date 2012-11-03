var Collection, Model, Todo, Todos, checkRequired;

checkRequired = function(config, input) {
  if (config['required'] && input === "" || !(input != null)) {
    return false;
  }
  return true;
};

Model = function(model) {
  var m;
  m = dermis.model(model);
  console.log(model);
  return m.extend({
    validate: function(input, next) {
      var config, prop, _results;
      _results = [];
      for (prop in model) {
        config = model[prop];
        if (typeof config === "object") {
          _results.push(next(null, checkRequired(config, input[prop])));
        } else if (typeof config === "function") {
          _results.push(console.log("type"));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  });
};

Collection = function(name, model) {
  return dermis.collection({
    all: function() {
      return this.get('items');
    },
    add: function(obj) {
      return this.push(model.create(obj));
    },
    formCreate: function(formSubmit) {
      var errors, m;
      m = {};
      errors = {};
      $("#" + name + "Form").children().each(function() {
        if ($(this).is("input") && !(this.type === "submit")) {
          return model.validate(this.id, this.value, function(err) {
            if (err != null) {
              return errors[this.id] = err;
            } else {
              m[this.id] = this.value;
              return this.value = '';
            }
          });
        }
      });
      if (!(errors != null)) {
        return this.add(m);
      } else {
        return console.log("required field bruh");
      }
    }
  });
};

Todo = Model({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    "default": false
  }
});

Todos = Collection("Todo", Todo);

define(["templates/index"], function(ui) {
  return {
    show: function() {
      $("#main").html(ui());
      return Todos.bind($("#main"));
    }
  };
});
