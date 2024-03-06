import createPropertyManagement from "../common_project_management/properties_management.js"

export function createPropertiesSelectionOptions(params) {
    var repo = createPropertyManagement()
        var properties = repo.getAll()

    var options = properties.map(e=>{
        return  {name:e.name, uuid:e.uuid, iconPath:e.attributes.iconPath, color:e.attributes.color}
    })

    return options
}