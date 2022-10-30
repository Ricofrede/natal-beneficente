import {
    buildCollection,
    buildProperty,
    EntityReference
} from "@camberi/firecms";

type Child = {
    name: string;
    genre: string;
    picture: EntityReference;
    intro: string;
    sponsor: EntityReference;
}

const childrenCollection = buildCollection<Child>({
    name: "Crianças",
    singularName: "Criança",
    path: "children",
    inlineEditing: false,
    group: 'Apadrinhamento',
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        delete: true
    }),
    properties: {
        name: {
            name: "Nome",
            validation: { required: true },
            dataType: "string"
        },
        gender: {
            name: "Gênero",
            dataType: "string",
            enumValues: {
                male: "Masculino",
                female: "Feminino"
            }
        },
        picture: buildProperty({
            dataType: "reference",
            path: "images",
            name: "Foto",
        }),
        intro: {
            name: "Introdução",
            description: "Breve descrição/introdução da criança",
            dataType: "string",
            columnWidth: 300,
            multiline: true
        },
        sponsor: buildProperty({
            dataType: "reference",
            path: "sponsors",
            name: "Padrinho",
        })
    }
});

export default childrenCollection