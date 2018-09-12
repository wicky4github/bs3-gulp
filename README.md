# BS3.js

## BS3[Component]

### Using
> BS3[Component][Method](arg1[, arg2[, ...argN]])[EX]
```
    // button.__proto__.name == "Element"
    var button = BS3.AButton.default('Google', 'https://www.google.com/')
    document.body.innerHTML = button
```

### Component
* Label(String text):Element
* Button(String text):Element
* AButton(String text, String url):Element

### Method
* success
* warning
* danger
* default
* info
* primary

### EX
> API Reference of [object Element]
* id(String id)
```
    BS3.Label.primary('Primary').id('foo')
```

* class(String name)
```
    BS3.Label.warning('Warning').class('bar')
```

* class(Array names)

```
    BS3.Label.warning('Warning').class(['foo', 'bar'])
```

* style(String style)
```
    BS3.Label.danger('Danger').style('font-size: 16px;')
```

* style(Array styles)
```
    BS3.Label.danger('Danger').style({'color': '#fff', 'background-color': '#000'})
```

* data(String key, String value)
```
    BS3.Label.default('Data').data('foo', 'bar')
```

* data(Object data)
```
    BS3.Label.data('Data').data({'foo': 'bar', 'baz': 'qux'})
```

* attr(String attr)
```
    BS3.Label.default('Default').attr('foo="bar"')
```

* attr(Object attr)
```
    BS3.Label.default('Default').attr({'foo': 'bar', 'baz': 'qux'})
```

* config(Object config)
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
> BS3.DOM[Method](arg1[, arg2[, ...argN]])

### Method

* createElement(String tag, Object props, Array children):String

#### argument

| name     |  type  | required | described             |
| ----     |  ----  | -------- | ---------             |
| tag      | String |   yes    | tag of element        |
| props    | Object |          | attributes of element |
| children | Array  |          | children of element   |

> Props example
```
  {
    text: "",
    // value of below keys can refer to API of [object Element] 
    class: "form-control",
    style: "color: red",
    attr: {
      foo: 'bar'
    },
    data: {
      baz: 'qux'
    }
  }
```
If length of "chilren" value equals 0, "text" value will works. Otherwise "children" value will cover "text" value

> Js example
```
  var div = BS3.DOM.createElement('div', {text: 'DIV', 'class': 'bg-info text-center'})
  document.body.innerHTML = div
```

* render(String html, Object dom):void

> dom can be jQuery or HTML DOM, but you will get an error if you give an empty dom
```
  BS3.DOM.render(
    BS3.DOM.createElement('div', {class: 'bg-success'}, [
      BS3.DOM.createElement('p', {text: 'paragraph 1'}),
      BS3.DOM.createElement('p', {text: 'paragraph 2', class: 'bg-danger'})
    ]),
    document.body
  );
```