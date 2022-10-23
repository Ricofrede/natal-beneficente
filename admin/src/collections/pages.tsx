import {
    buildCollection,
    buildProperty,
} from "@camberi/firecms";

type Page = {
    name: string;
    status: string;
    image: string;
    intro: string;
    content: string[];
}

const pagesCollection = buildCollection<Page>({
    name: "Paginas",
    singularName: "Pagina",
    path: "pages",
    customId: true,
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        // we have created the roles object in the navigation builder
        delete: false
    }),
    properties: {
        name: {
            name: "Name",
            validation: { required: true },
            dataType: "string"
        },
        status: {
            name: "Status",
            validation: { required: true },
            dataType: "string",
            description: "Este conteúdo deve aparecer para o público?",
            enumValues: {
                private: "Privado",
                public: "Publico"
            }
        },
        image: buildProperty({ // The `buildProperty` method is a utility function used for type checking
            name: "Imagem Principal",
            dataType: "string",
            storage: {
                storagePath: "images",
                acceptedFiles: ["image/*"]
            }
        }),
        intro: {
            name: "Introdução",
            description: "Breve descrição/introdução da pagina",
            dataType: "string",
            columnWidth: 300,
            multiline: true
        },
        content: buildProperty({
            name: "Conteúdo",
            dataType: "array",
            oneOf: {
                typeField: "type",
                valueField: "value",
                properties: {
                    image: {
                        dataType: "string",
                        name: "Imagem",
                        storage: {
                            storagePath: "images",
                            acceptedFiles: ["image/*"]
                        }
                    },
                    text: {
                        dataType: "string",
                        name: "Texto",
                        markdown: true
                    }
                }
            }
        })
    }
});

export default pagesCollection