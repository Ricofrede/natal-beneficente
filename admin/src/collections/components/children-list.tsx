import { buildProperty } from "@camberi/firecms";

export const childrenList = buildProperty({
    dataType: "map",
    properties: {
        title: {
            name: "Título",
            description: "Texto mostrado acima da lista de crianças.",
            validation: { required: true },
            dataType: "string"
        }
    }
});