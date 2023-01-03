var getSummaryEvaluator = function(entityId){
    var schema = 
    {
      "nodes": [
        {
          "templateName": "source_entity",
          "params": {
            "uuid": "nA9fz-Z41hIqrDXjN7P7y",
            "name": "Source",
            "position": {
              "x": -7.153773853232079,
              "y": -0.3116802859839537
            },
            "propsValue": {
              "outputReference": "43cb9HUGQQjabx8fUKbbw",
              "method": "test"
            },
            "propsValueFromInput": {
              "outputReference": "43cb9HUGQQjabx8fUKbbw",
              "method": "test"
            },
            "nodeLayout": "square",
            "userData": {}
          }
        },
        {
          "templateName": "output_table",
          "params": {
            "uuid": "RfDXolY1bSQIZEL6Hikap",
            "name": "output_table",
            "position": {
              "x": 7.442505463131675,
              "y": -0.7311886301870023
            },
            "propsValue": {},
            "propsValueFromInput": {},
            "nodeLayout": "square",
            "userData": {}
          }
        },
        {
          "templateName": "col_parameters",
          "params": {
            "uuid": "62IdODYM1vQ0c4O8euVGL",
            "name": "col_parameters",
            "position": {
              "x": 2.9913174637566753,
              "y": -3.55480318703412
            },
            "propsValue": {
              "name": "Name",
              "paramName": "name"
            },
            "propsValueFromInput": {
              "name": "Name",
              "paramName": "name"
            },
            "nodeLayout": "square",
            "userData": {}
          }
        },
        {
          "templateName": "action_preview_instance",
          "params": {
            "uuid": "eWv1YU3HFfhZp4RKIOmfl",
            "name": "action_preview_instance",
            "position": {
              "x": -1.872724712608662,
              "y": -3.5926012005328847
            },
            "propsValue": {},
            "propsValueFromInput": {},
            "nodeLayout": "square",
            "userData": {}
          }
        },
        {
          "templateName": "action_Input",
          "params": {
            "uuid": "Ier_HeRjwE8AUIba9pb5p",
            "name": "action_Input",
            "position": {
              "x": -7.132796570238617,
              "y": -3.545343062295607
            },
            "propsValue": {},
            "propsValueFromInput": {},
            "nodeLayout": "square",
            "userData": {}
          }
        },
        {
          "templateName": "action_add_instance",
          "params": {
            "uuid": "wD7yb2lwWLYp8NXKsc0cX",
            "name": "action_add_instance",
            "position": {
              "x": -1.8198730273262282,
              "y": 0.8240934185747644
            },
            "propsValue": {
              "instanceRef": "43cb9HUGQQjabx8fUKbbw"
            },
            "propsValueFromInput": {
              "instanceRef": "43cb9HUGQQjabx8fUKbbw"
            },
            "nodeLayout": "square",
            "userData": {}
          }
        }
      ],
      "links": [
        {
          "from": "62IdODYM1vQ0c4O8euVGL",
          "from_socket": "output",
          "to": "RfDXolY1bSQIZEL6Hikap",
          "to_socket": "cols",
          "uuid": "w_LUYlXBgee0fGTMJWhvM"
        },
        {
          "from": "nA9fz-Z41hIqrDXjN7P7y",
          "from_socket": "output",
          "to": "RfDXolY1bSQIZEL6Hikap",
          "to_socket": "rows",
          "uuid": "9H-RUBXUAfO0pUMvUEJbM"
        },
        {
          "from": "eWv1YU3HFfhZp4RKIOmfl",
          "from_socket": "output",
          "to": "62IdODYM1vQ0c4O8euVGL",
          "to_socket": "clickAction",
          "uuid": "EIbJkEfsOoHzsS9Ssy0ZX"
        },
        {
          "from": "Ier_HeRjwE8AUIba9pb5p",
          "from_socket": "clickedItem",
          "to": "eWv1YU3HFfhZp4RKIOmfl",
          "to_socket": "targetItem",
          "uuid": "in7Q7GCNllH9SKZ56YbKZ"
        },
        {
          "from": "wD7yb2lwWLYp8NXKsc0cX",
          "from_socket": "output",
          "to": "RfDXolY1bSQIZEL6Hikap",
          "to_socket": "actions",
          "uuid": "zmB2UOq_OxFtKU2WQE3w0"
        },
        {
          "from": "nA9fz-Z41hIqrDXjN7P7y",
          "from_socket": "outputReference",
          "to": "wD7yb2lwWLYp8NXKsc0cX",
          "to_socket": "instanceRef",
          "uuid": "EXp0m0cyoDYBzB1c0q21Y"
        }
      ]
    }
    
    return schema
}

export {getSummaryEvaluator}