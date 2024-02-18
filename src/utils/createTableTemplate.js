function createTableTemplate(tableName) {
    const tableTemplate = {
        name: tableName,
        description: "to-do list",
        fields: [
            {
                name: "title",
                type: "singleLineText",
            },
            {
                name: "edited",
                type: "dateTime",
                options: {
                    timeZone: "client",
                    dateFormat: {
                        format: "YYYY-MM-DD",
                        name: "iso",
                    },
                    timeFormat: {
                        name: "24hour",
                        format: "HH:mm",
                    },
                },
            },
            {
                name: "completed",
                options: {
                    color: "greenBright",
                    icon: "check",
                },
                type: "checkbox",
            },
        ],
    };
    return tableTemplate;
}
export default createTableTemplate;
