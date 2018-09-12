var html = BS3.DOM.createElement([{
    tag: 'p',
    text: 'Create paragraph'
}, {
    tag: 'button',
    text: 'Success',
    formatter: function(result) {
        return result.style({
            'color': '#fff',
            'background-color': '#000'
        }).attr({
            'onclick': "alert('Success')"
        })
    }
}, {
    tag: 'form',
    formatter: function(result) {
        return result.config({
            id: 'form',
            attr: {
                action: '',
                method: 'post'
            }
        });
    },
    children: [{
        tag: 'select',
        formatter: function(result) {
            return result.config({
                class: 'form-control',
                style: {
                    display: 'inline-block',
                    width: '200px'
                },
                attr: {
                    'name': 'status'
                }
            });
        },
        children: [{
            tag: 'option',
            text: 'Open',
            formatter: function(result) {
                return result.attr({
                    value: 1
                });
            }
        }, {
            tag: 'option',
            text: 'Close',
            formatter: function(result) {
                return result.attr({
                    value: 0
                });
            }
        }],
    }, {
        tag: 'input',
        formatter: function(result) {
            return result.config({
                class: 'form-control',
                style: {
                    display: 'inline-block',
                    width: '200px'
                },
                name: 'number',
                attr: {
                    type: 'number',
                    placeholder: 'Input a number',
                    min: 0,
                    max: 99,
                    value: 1
                }
            });
        }
    }]
}]);
document.getElementById('dom').innerHTML = html;