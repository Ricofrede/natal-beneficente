import {
    buildCollection,
    buildProperty,
    EntityReference
} from "@camberi/firecms";

import { childrenList, sponsorsList } from './components'

type Page = {
    name: string;
    shortName: string;
    importance: number;
    status: string;
    image: EntityReference;
    intro: string;
    content: string[];
}

const pagesCollection = buildCollection<Page>({
    name: "Paginas",
    singularName: "Pagina",
    path: "pages",
    customId: true,
    inlineEditing: false,
    group: 'Principal',
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        // we have created the roles object in the navigation builder
        delete: false
    }),
    properties: {
        name: {
            name: "Nome",
            dataType: "string"
        },
        shortName: {
            name: "Nome Curto",
            validation: { required: true },
            dataType: "string"
        },
        importance: {
            name: "Nível de Importância",
            dataType: "number"
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
        image: buildProperty({
            dataType: "reference",
            path: "images",
            name: "Imagem Principal",
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
                    image: buildProperty({
                        dataType: "reference",
                        path: "images",
                        name: "Imagem",
                    }),
                    text: {
                        dataType: "string",
                        name: "Texto",
                        markdown: true
                    },
                    childrenList: childrenList,
                    sponsorsList: sponsorsList
                }
            }
        })
    }
});

export default pagesCollection