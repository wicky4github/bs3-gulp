;
(function(window, undefined) {
    // global object
    var BS3 = {
        annoymousEvents: {}
    };

    /**
     * string format prototype
     * @returns {String}
     * @example StringFormat.call('<div>{_ID_}</div>', {"_ID_": "1"}) => '<div>1</div>'
     * @example StringFormat.call('<div>{0} {1}</div>', ['hello', 'world']) => '<div>hello world</div>'
     */
    function StringFormat() {
        if (arguments.length > 0) {
            var result = this;
            var format = arguments[0];
            for (var key in format) {
                var regex = new RegExp('\\{' + key + '\\}', 'g');
                result = result.replace(regex, format[key]);
            }
            return result;
        } else {
            return this.toString();
        }
    }

    var SingleTags = ['br', 'hr', 'area', 'base', 'img', 'input', 'link', 'meta', 'basefont', 'param', 'col', 'frame', 'embed'];

    /**
     * get base html template
     * @param  {String} TAG     [html tag]
     * @param  {String} classes [html class]
     * @param  {String} TEXT    [html content]
     * @return {String}
     */
    function Template(TAG, TEXT) {
        if (SingleTags.indexOf(TAG) >= 0) {
            var Base = '<{TAG} {ID} class="{CLASS}" style="{STYLE}" {EXTRA} />';
        } else {
            var Base = '<{TAG} {ID} class="{CLASS}" style="{STYLE}" {EXTRA}>{TEXT}</{TAG}>';
        }
        return StringFormat.call(Base, {
            TAG: TAG,
            TEXT: TEXT || '',
        });
    }


    /**
     * createElement
     * @param  {[Object]} config
     * @return {[object Element]}
     */
    function createElement(config) {
        if (Array.isArray(config.children) && config.children.length > 0) {
            var template = Template(config.tag, getChildrenText(config.children, config.text));
        } else {
            var template = Template(config.tag, config.text || '');
        }
        var element = new Element(template);
        if (typeof config.formatter === 'function') {
            config.formatter(element);
        }
        return element;
    }

    /**
     * getChildrenText
     * @param  [Array] children array contains [object String] or [object Element]
     * @return [String]
     */
    function getChildrenText(children, text) {
        var childrenText = '';
        for (var i = 0; i < children.length; i++) {
            if (children[i].__proto__.constructor.name === 'Object' && children[i].tag) {
                childrenText += createElement(children[i]);
            } else {
                childrenText += children[i];
            }
        }
        return childrenText || text || '';
    }

    /**
     * Class Element
     * @describe html string formatter
     * @param [String] template [object String] created from Template function
     */
    var Element = function(template) {
        this.template = template;
    };

    Element.prototype = {
        name: 'Element',

        id: function(id) {
            return this.format('ID', 'id="' + id + '"');
        },

        class: function(className) {
            return this.format('CLASS', Array.isArray(className) ? className.join(' ') : className);
        },

        style: function(styles) {
            var style = '';
            if (typeof styles === 'object') {
                for (var attr in styles) {
                    style += attr + ':' + styles[attr] + ';';
                }
            } else {
                style = styles;
            }
            return this.format('STYLE', style);
        },

        data: function() {
            var data = {};
            var key = '';
            if (arguments.length == 2) {
                key = arguments[0];
                data['data-' + key] = arguments[1];
            } else {
                for (key in arguments[0]) {
                    data['data-' + key] = arguments[0][key];
                }
            }
            return this.attr(data);
        },

        on: function() {
            // concrete operation
            function on(eventType, fn) {
                if (typeof fn === 'function') {
                    var callback = fn;
                    var name = '_' + new Date().getTime();
                    BS3.annoymousEvents[name] = callback;
                    fn = 'BS3.annoymousEvents.' + name + '()';
                }
                // check " using correctly
                var marksMatch = fn.match(/"/g);
                var marks = marksMatch ? marksMatch.length : 0;
                var validMarksMatch = fn.match(/\\\"/g);
                var validMarks = validMarksMatch ? validMarksMatch.length : 0;
                if (marks > 0 && marks != validMarks) {
                    throw new Error('Invalid on' + eventType + ' function because of using ["] without adding slashes correctly. You should add slashes like [\\\\\\"] which is not as good as using [\']');
                }
                return this.attr('on' + eventType + '="' + fn + '"');
            }
            // check arugments
            if (arguments.length == 2) {
                var eventType = arguments[0];
                var fn = arguments[1];
                return on.apply(this, [eventType, fn]);
            } else {
                var events = arguments[0];
                for (var eventType in events) {
                    var fn = events[eventType];
                    on.apply(this, [eventType, fn]);
                }
                return this;
            }
        },

        attr: function(extras) {
            var extra = '';
            if (typeof extras === 'object') {
                var arrExtras = [];
                for (var attr in extras) {
                    arrExtras.push(attr + '="' + extras[attr] + '"');
                }
                extra = arrExtras.join(' ');
            } else {
                extra = extras;
            }
            return this.format('EXTRA', extra + ' {EXTRA}');
        },

        config: function(config) {
            for (var method in config) {
                if (typeof this[method] === 'function') {
                    var args = config[method];
                    this[method](args);
                }
            }
            return this;
        },

        format: function() {
            var format = {};
            if (arguments.length == 2) {
                var key = arguments[0];
                var value = arguments[1];
                format[key] = value;
            } else {
                format = arguments[0];
            }
            this.template = StringFormat.call(this.template, format);
            return this;
        },

        toString: function() {
            // format placeholder to empty
            this.id('').class('').style('').format('EXTRA', '');
            return this.template
                .replace(/\s*id=""\s*/, ' ')
                .replace(/\s*class=""\s*/, ' ')
                .replace(/\s*style=""\s*/, ' ')
                .replace(/\s{2,}/g, ' ')
                .replace(/\s+([">])/g, '$1');
        }
    };

    /**
     * Bootstrap Components
     * @describe every component function will return [object Element]
     */
    var Components = {
        Label: function(text) {
            var type = this.toString()
            return createElement({
                tag: 'span',
                text: text,
                formatter: function(Element) {
                    return Element.config({
                        class: 'label label-' + type + ' {CLASS}'
                    });
                }
            });
        },
        Button: function(text) {
            var type = this.toString();
            return createElement({
                tag: 'button',
                text: text,
                formatter: function(Element) {
                    return Element.config({
                        class: 'btn btn-' + type + ' {CLASS}'
                    });
                }
            });
        },
        AButton: function(text, href) {
            var type = this.toString();
            return createElement({
                tag: 'a',
                text: text,
                formatter: function(Element) {
                    return Element.config({
                        class: 'btn btn-' + type + ' {CLASS}',
                        attr: {
                            href: href || 'javascript:'
                        }
                    });
                }
            });
        }
    };

    // public methods
    var Methods = ['success', 'warning', 'danger', 'default', 'info', 'primary'];

    // batch registration
    for (var component in Components) {
        BS3[component] = {};
        for (var i in Methods) {
            var method = Methods[i];
            BS3[component][method] = (function(name, type) {
                return function() {
                    return Components[name].apply(type, arguments);
                }
            })(component, method);
        }
    }

    BS3.DOM = {
        /**
         * [render]
         * @param  {[String|Array]} element innerHTML for dom
         * @param  [Object]         dom     jquery or native DOM
         * @void
         */
        render: function(element, dom) {
            if (!dom) {
                throw 'render container is null';
            }
            var html = element;
            if (Array.isArray(element)) {
                html = element.join('\r\n');
            }
            if (dom.__proto__.jquery) {
                // jquery dom
                if (dom.length) {
                    dom.html(html);
                } else {
                    throw 'render container is null';
                }
            } else if (/HTML/.test(dom.__proto__.constructor.name)) {
                // native dom
                dom.innerHTML = html;
            }
        },

        /**
         * [createElement]
         * @param  [String] tag      tag of element
         * @param  [Object] config   config for [object Element]
         * @param  [Array]  children array contains [object String] or [object Element]
         * @return [Element]
         */
        createElement: function(tag, config, children) {
            if (arguments.length == 1 && Array.isArray(arguments[0])) {
                // batch create
                return arguments[0].map(createElement).join('\r\n');
            } else {
                if (!tag || tag.__proto__.constructor.name != 'String') {
                    throw 'createElement needs tag parameter';
                }
                config = config || {};
                children = children || [];
                var eleConfig = {
                    tag: tag,
                    text: getChildrenText(children, config.text),
                    formatter: function(Element) {
                        return Element.config(config);
                    }
                };
                return createElement(eleConfig).toString();
            }
        }
    };

    window.BS3 = BS3;
}(window))