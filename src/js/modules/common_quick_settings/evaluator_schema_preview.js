var getPreviewEvaluatorSchema = function(){
    var schema = {"nodes":[{"templateName":"source_instance","params":{"uuid":"1wXWB5lvmq4mqmdRciqa7","name":"Source Instance","position":{"x":-3.3138941366631207,"y":-1.0934411964897572},"propsValue":{},"propsValueFromInput":{},"nodeLayout":"square","userData":{}}},{"templateName":"output_instance_card","params":{"uuid":"JwVOko9Ye6-ofw-UiygZH","name":"output_instance_card","position":{"x":3.6208250224906395,"y":-1.0742580178804928},"propsValue":{"instance":false,"actions":false,"onConnectAction":false},"propsValueFromInput":{"instance":false,"actions":false,"onConnectAction":false},"nodeLayout":"square","userData":{}}}],"links":[{"from":"1wXWB5lvmq4mqmdRciqa7","from_socket":"output","to":"JwVOko9Ye6-ofw-UiygZH","to_socket":"instance","uuid":"MRhEaqDpoZxTpuvJHBmOZ"}]}


    return schema
}

export {getPreviewEvaluatorSchema}