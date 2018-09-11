(function(window, undefined) {
    var StringFormat = function() {
        if (arguments.length > 0) {
            let result = this;
            let format = arguments[0];
            for (let key in format) {
                let regex = new RegExp(`\\{${key}\\}`, 'g');
                result = result.replace(regex, format[key]);
            }
            return result;
        } else {
            return this.toString();
        }
    };

    var Template = function(TAG, classes, TEXT) {
        let Base = '<{TAG} {ID} class="{CLASSES}" style="{STYLE}" {EXTRA}>{TEXT}</{TAG}>';
        return StringFormat.call(Base, {
            TAG: TAG,
            CLASSES: `${classes} {CLASS}`,
            TEXT: TEXT || '{TEXT}'
        });
    };

    var Result = function(template) {
        this.template = template;
    };

    Result.prototype = {
        id: function(id) {
            return this.format('ID', `id="${id}"`);
        },

        class: function(className) {
            return this.format('CLASS', Array.isArray(className) ? className.join(' ') : className);
        },

        style: function(styles) {
            let style = '';
            if (typeof styles === 'object') {
                for (let attr in styles) {
                    style += `${attr}:${styles[attr]};`;
                }
            } else {
                style = styles;
            }
            return this.format('STYLE', style);
        },

        data: function() {
            let data = {};
            let key = '';
            if (arguments.length == 2) {
                key = arguments[0];
                data[`data-${key}`] = arguments[1];
            } else {
                for (key in arguments[0]) {
                    data[`data-${key}`] = arguments[0][key];
                }
            }
            return this.attr(data);
        },

        attr: function(extras) {
            let extra = '';
            if (typeof extras === 'object') {
                const arrExtras = [];
                for (let attr in extras) {
                    arrExtras.push(`${attr}="${extras[attr]}"`);
                }
                extra = arrExtras.join(' ');
            } else {
                extra = extras;
            }
            return this.format('EXTRA', `${extra} {EXTRA}`);
        },

        config: function(config) {
            for (let method in config) {
                if (typeof this[method] === 'function') {
                    this[method](config[method]);
                }
            }
            return this;
        },

        format: function() {
            let format = {};
            if (arguments.length == 2) {
                let key = arguments[0];
                let value = arguments[1];
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
                .replace(/class="\s+([^\s]+?)\s*"/, 'class="$1"')
                .replace(/class="\s+"/, '')
                .replace(/\s*style=""\s*/, ' ')
                .replace(/\s{2,}/g, ' ')
                .replace(/\s+>/, '>');
        }
    };

    // bootstrap context
    function Context(htmlTag, contextTag, contextType, text, prefix) {
        let className = `${contextTag}-${contextType}`;
        if (prefix) {
            className = `${contextTag} ${className}`;
        }
        return Template(htmlTag, className, text);
    }

    // public components
    var Components = {
        Label: function(text) {
            let template = Context('span', 'label', this.toString(), text, true);
            return new Result(template);
        },
        Button: function(text) {
            let template = Context('button', 'btn', this.toString(), text, true);
            return new Result(template);
        },
        AButton: function(text, href = 'javascript:') {
            let template = Context('a', 'btn', this.toString(), text, true);
            return new Result(template).attr({
                href
            });
        }
    };

    // public methods
    var Methods = ['success', 'warning', 'danger', 'default', 'info', 'primary'];

    // global object
    var BS3 = {};

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

    window.BS3 = BS3;
})(window)