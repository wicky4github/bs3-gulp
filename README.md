## BS3.js

### Using
> BS3[Component][Method](arg1[, arg2[, ...argN]])[EX]
```
    // button.__proto__.name == "Result"
    var button = BS3.AButton.default('Google', 'https://www.google.com/')
    document.body.innerHTML = button
```

### Component
* Label(text)
* Button(text)
* AButton(text, url)

### Method
* success
* warning
* danger
* default
* info
* primary

### EX
> API Reference of [object Result]
* id(string id)
```
    BS3.Label.primary('Primary').id('foo')
```

* class(string name)
```
    BS3.Label.warning('Warning').class('bar')
```

* class(array names)

```
    BS3.Label.warning('Warning').class(['foo', 'bar'])
```

* style(string style)
```
    BS3.Label.danger('Danger').style('font-size: 16px;')
```

* style(array styles)
```
    BS3.Label.danger('Danger').style({'color': '#fff', 'background-color': '#000'})
```

* data(string key, string value)
```
    BS3.Label.default('Data').data('foo', 'bar')
```

* data(object data)
```
    BS3.Label.data('Data').data({'foo': 'bar', 'baz': 'qux'})
```

* attr(string attr)
```
    BS3.Label.default('Default').attr('foo="bar"')
```

* attr(object attr)
```
    BS3.Label.default('Default').attr({'foo': 'bar', 'baz': 'qux'})
```

* config(object config)
```
    BS3.Label.default('Default').config({
        'id': 'id', 
        'class': ['class1', 'class2'],
        'style': {'font-size': '12px'},
        'data': {'foo': 'bar'},
        'attr': {'title': 'Title'}
    })
```

> Support chaining invoke
```
    BS3.Label.success('Success')
      .id('label')
      .class(['class2', 'class3'])
      .style('font-size: 12px;')
      .data('foo', 'bar')
      .attr({'baz': 'qux'})
```

## BS3.DOM

### Using
> BS3.DOM(array config)
```
  var divs = BS3.DOM([{
    // base using
    tag: "div",
    text: "div 1"
  }, {
   // render attributes
    tag: "div",
    text: "div 2",
    formatter: function(Result) {
      return Result.id('div').class('div')
    }
  }, {
   // render attributes and children
    tag: "div",
    formatter: function(Result) {
      return Result.style({border: '1px solid red'})
    },
    children: [{
      tag: "p",
      text: "paragraph 1"  
    }, {
      tag: "p",
      text: "paragraph 2",
      children: []
    }]
  }])
  document.body.innerHTML = divs
```

### Config
> Config is an ***array*** includes with at least one render config of element as described below
```
{
  tag: "",                       // @required [string] tag of the element
  text: "",                      // @optional [string] text of the tag
  formatter: function(Result) {  // @optional [function] render attributes by [object Result]
    // must return [object String] or [object Result]
    return Result;
  },
  children: []                   // @optional [array] structure as same as the argument of "BS3.DOM(array config)".
}
```
>> If length of "chilren" value equals 0, "text" value will works. Otherwise "children" value will cover "text" value
