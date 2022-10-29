import { buildProperty } from "@camberi/firecms";

export const sponsorsList = buildProperty({
    dataType: "map",
    properties: {
        title: {
            name: "Título",
            description: "Texto mostrado acima da lista de padrinhos.",
            validation: { required: true },
            dataType: "string"
        }
    }
});